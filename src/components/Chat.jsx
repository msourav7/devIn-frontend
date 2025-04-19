// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { createSocketConnection } from "../utils/socket";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const { targetUserId } = useParams();
//   const user = useSelector((store) => store.user);
//   const userID = user?._id; //loggedInUser ID

//   //To show chat msg data on the chat box
//   const fetchChatMessages = async () => {
//     const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
//       withCredentials: true,
//     });
//     console.log(chat.data.messages);
//     const chatMessages = chat?.data?.messages.map((msg) => {
//       const { senderId, text } = msg;
//       return {
//         firstName: senderId?.firstName,
//         lastName: senderId?.lastName,
//         text,
//         senderId: senderId?._id,
//       };
//       // return {
//       //   firstName: msg?.senderId?.firstName,
//       //   lastName: msg?.senderId?.lastName,
//       //   text: msg?.text,
//       // };
//     });
//     setMessages(chatMessages);
//   };
//   useEffect(() => {
//     fetchChatMessages();
//   }, []);

//   //for chat scroll
//   useEffect(() => {
//     const chatContainer = document.querySelector(".chat-container");
//     if (chatContainer) {
//       chatContainer.scrollTop = chatContainer.scrollHeight;
//     }
//   }, [messages]);
  

//   useEffect(() => {
//     if (!userID) {
//       return;
//     }

//     //we'll use this the socket connec. is made to emit events(events like, joinchat,sendmessage,disconnect) as soon as the page loads
//     const socket = createSocketConnection();
//     ('assume below asa api calling [emit:get api,"join":URL,targetUserId:data which i am passing]');
//     socket.emit("joinChat", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userID,
//       targetUserId,
//     });

//     //message received with [firstName, lastName, text,senderId] from server
//     socket.on("messageReceived", ({ firstName, lastName, text,senderId }) => {
//       console.log(firstName + " : " + text);
//       setMessages((messages) => [...messages, { firstName, lastName, text,senderId }]);
//     });

//     //cleaning up sockets
//     return () => {
//       socket.disconnect();
//     };
//   }, [userID, targetUserId]);

//   //sending to server
//   const sendMessage = () => {
//     const socket = createSocketConnection();
//     socket.emit("sendMessage", {
//       firstName: user.firstName,
//       lastName: user.lastName,
//       userID,
//       targetUserId,
//       text: newMessage,
//     });
//     setNewMessage("");
//   };

//   return (
//     <div className="w-max mx-auto border rounded-2xl border-gray-600 m-5 h-[70vh] flex flex-col">
//       <h1 className="p-5 border-b border-gray-600">Chat</h1>
//       <div className="chat-container flex-1 overflow-y-auto p-5">
//         {messages.map((msg, index) => {
//           return (
//             <div
//               key={index}
//               className={
//                 "chat " + (msg.senderId === userID ? "chat-end" : "chat-start")
//               }
//             >
//               <div className="chat-header">
//                 {`${msg.firstName} ${msg.lastName}`}
//                 {/* <time className="text-xs opacity-50">2 hours ago</time> */}
//               </div>
//               <div className="chat-bubble">{msg.text}</div>
//               {/* <div className="chat-footer opacity-50">Seen</div> */}
//             </div>
//           );
//         })}
//       </div>
//       <div className="p-5 border-t border-gray-600 flex items-center gap-2 ">
//         <input
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           className="flex-1 border border-gray-500 text-white rounded p-2"
//         ></input>
//         <button onClick={sendMessage} className="btn btn-secondary">
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;


/*with new chat css */


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { targetUserId } = useParams();
  const [timestampRefresh,setTimestampRefresh]=useState(0)
  const user = useSelector((store) => store.user);
  const userID = user?._id;

  //useEffect for - after every one minute update the time stamp
  useEffect(()=>{
    const interval = setInterval(()=>{
      setTimestampRefresh(prev=>prev+1)
    },60000) 
    return()=>clearInterval(interval)
  },[])

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text, createdAt  } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        senderId: senderId?._id,
        createdAt ,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!userID) return;

    const socket = createSocketConnection();

    socket.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      userID,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId, createdAt  }) => {
      setMessages((prev) => [...prev, { firstName, lastName, text, senderId, createdAt  }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userID, targetUserId]);

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

  // return (
  //   <div className="w-full md:w-3/4 mx-auto bg-base-200 rounded-xl shadow-xl my-5 h-[70vh] flex flex-col border border-base-300">
  //     <div className="p-4 border-b border-base-300 text-xl font-bold bg-base-100 rounded-t-xl">
  //       Chat
  //     </div>

  //     <div className="chat-container flex-1 overflow-y-auto px-5 py-4 space-y-4">
  //       {messages.map((msg, index) => {
  //         const isSelf = msg.senderId === userID;
  //         return (
  //           <div key={index} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
  //             <div className={`max-w-xs sm:max-w-sm md:max-w-md p-3 rounded-lg shadow-md ${isSelf ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"} animate-fade-in`}>
  //               <div className="text-sm font-semibold mb-1">
  //                 {msg.firstName} {msg.lastName}
  //                 <time className="text-xs opacity-50 ml-2">
  //                 {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true }) : ""}
  //                 </time>
  //               </div>
  //               <div className="animate-fade-in text-base break-words">{msg.text}</div>
  //             </div>
  //           </div>
  //         );
  //       })}
  //     </div>

  //     <div className="p-4 border-t border-base-300 bg-base-100 flex items-center gap-2">
  //       <input
  //         value={newMessage}
  //         onChange={(e) => setNewMessage(e.target.value)}
  //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
  //         placeholder="Type your message..."
  //         className="flex-1 bg-base-200 p-3 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  //       />
  //       <button onClick={sendMessage} className="btn btn-primary">
  //         Send
  //       </button>
  //     </div>
  //   </div>
  // );
   

  //same gunctionalty with more responsiveness
  return (
    <div className="w-full sm:w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto bg-base-200 rounded-xl shadow-xl my-5 min-h-[80vh] flex flex-col border border-base-300">
      
      {/* Header */}
      <div className="p-3 sm:p-4 border-b border-base-300 text-lg sm:text-xl font-bold bg-base-100 rounded-t-xl text-center">
        Chat
      </div>
  
      {/* Messages */}
      <div className="chat-container flex-1 overflow-y-auto px-3 sm:px-5 py-3 sm:py-4 space-y-4">
        {messages.map((msg, index) => {
          const isSelf = msg.senderId === userID;
          return (
            <div key={index} className={`flex ${isSelf ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] sm:max-w-sm md:max-w-md lg:max-w-lg p-3 rounded-lg shadow-md ${isSelf ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-900"} animate-fade-in`}>
                
                <div className="text-xs sm:text-sm font-semibold mb-1">
                  {msg.firstName} {msg.lastName}
                  <time className="text-[10px] sm:text-xs opacity-50 ml-2 block sm:inline">
                    {msg.createdAt ? formatDistanceToNow(new Date(msg.createdAt), { addSuffix: true }) : ""}
                  </time>
                </div>
  
                <div className="animate-fade-in text-sm sm:text-base break-words">{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
  
      {/* Input Field */}
      <div className="sticky bottom-0 left-0 right-0 p-3 sm:p-4 border-t border-base-300 bg-base-100 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-base-200 p-2 sm:p-3 rounded-lg border border-base-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm sm:text-base"
        />
        <button onClick={sendMessage} className="btn btn-primary text-sm sm:text-base">
          Send
        </button>
      </div>
  
    </div>
  );
  
  
};

export default Chat;

