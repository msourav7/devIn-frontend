import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userID = user?._id; //loggedInUser ID

  //To show chat msg data on the chat box
  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        senderId: senderId?._id,
      };
      // return {
      //   firstName: msg?.senderId?.firstName,
      //   lastName: msg?.senderId?.lastName,
      //   text: msg?.text,
      // };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  //for chat scroll
  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);
  

  useEffect(() => {
    if (!userID) {
      return;
    }

    //we'll use this the socket connec. is made to emit events(events like, joinchat,sendmessage,disconnect) as soon as the page loads
    const socket = createSocketConnection();
    ('assume below asa api calling [emit:get api,"join":URL,targetUserId:data which i am passing]');
    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userID,
      targetUserId,
    });

    //message received with [firstName, lastName, text,senderId] from server
    socket.on("messageReceived", ({ firstName, lastName, text,senderId }) => {
      console.log(firstName + " : " + text);
      setMessages((messages) => [...messages, { firstName, lastName, text,senderId }]);
    });

    //cleaning up sockets
    return () => {
      socket.disconnect();
    };
  }, [userID, targetUserId]);

  //sending to server
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userID,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="chat-container flex-1 overflow-y-auto p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              className={
                "chat " + (msg.senderId === userID ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2 ">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button onClick={sendMessage} className="btn btn-secondary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
