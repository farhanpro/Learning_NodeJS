// import React from 'react'
import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import axios from "axios"
import NavBar from "./NavBar"
import Footer from "./Footer"
import { BASE_URL } from "../utils/constants"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    try {
      const user = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(user.data));
    } catch (err) {
      if(err.status === 401)
      {
        navigate("/login");

      }
      console.log("Error in fetching user", err);
    }
  };

  useEffect(()=>{
    fetchUser()
  },[])
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-1 pb-24">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Body