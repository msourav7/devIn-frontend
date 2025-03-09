import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {

  const feed = useSelector((store)=>store.feed)
  const dispatch = useDispatch()
  // const [feed,setFeed]=useState("") using redux for state manag. instead of useState variables & after storing it to srdux store we'll use useSelector to get the data from the store and loop here to show it on display

  const getFeed= async()=>{
    if(feed) return;
    try{
      const res = await axios.get(BASE_URL + "/feed",{withCredentials:true,})
        dispatch(addFeed(res?.data))
        console.log(res.data[0])
    }catch(err){
      console.error(err.message)
    }


  };
  // as soon as the page loads/first page onload call the getFeedapi
  useEffect(()=>{
    getFeed();
  },[])

  return (
    feed && (
    <div className='flex justify-center my-10'>
      {<UserCard user={feed[0]}/>}
      </div>
      )
  )
}

export default Feed