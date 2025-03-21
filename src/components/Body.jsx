import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const Body = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate()
  const userData = useSelector((store)=>store.user)
  
  //fetching all the user details with profile/api to show on feed page 
  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data))
    } catch (err) {
      if(err.status===401){ //this error code will come from backend res.send message from auth middleware
        navigate("/login")
      }
      console.error(err);
    }
  };
  useEffect(()=>{
      fetchUser()
  },[])

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
