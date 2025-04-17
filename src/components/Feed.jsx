import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  // const [feed,setFeed]=useState("") using redux for state manag. instead of useState variables & after storing it to srdux store we'll use useSelector to get the data from the store and loop here to show it on display

  const getFeed = async () => {
    //if feed present dont fetch it again ,only re-fetch when needed:
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
      console.log(res.data[0]);
      console.log(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  // as soon as the page loads/first page onload call the getFeedapi
  useEffect(() => {
    getFeed();
  }, []);

  // if(!feed) return;
  // if(feed.length<=0) return <h1>No new users found</h1>

  return (
    feed && (
      // <div className='flex justify-center my-5  overflow-y-auto'>
      <div className="flex  flex-col items-center my-5 h-[calc(100vh-100px)] overflow-y-auto w-full px-4"> {/**added to scroll the feed page on mobile */} 
        {feed?.length > 0 ? (
          <UserCard user={feed[0]} />
        ) : (
          <h1>No Feed Found</h1>
        )}
        {/* <UserCard user={feed[0]}/> */}
      </div>
    )
  );
};

export default Feed;
