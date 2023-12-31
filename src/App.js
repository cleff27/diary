import "./App.css";
import React from "react";
import LogIn from "./components/Login/Login";
import UserState from "./context/userState";
import SignUp from "./components/SignUp/SignUp";
import Create from "./components/Create/Create";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import CreatedBlogs from "./components/CreatedBlogs/CreatedBlogs";
import MyBlogs from "./components/CreatedBlogs/MyBlogs";
import Friends from "./components/Friends/Friends";
import ShowUsers from "./components/ShowUsers/ShowUsers";
import FriendRequests from "./components/FriendRequests/FriendRequests";
export const URL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <UserState>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/createdblogs/:id" element={<CreatedBlogs />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/allusers" element={<ShowUsers />} />
        <Route path="/friendrequests" element={<FriendRequests />} />
      </Routes>
    </UserState>
  );
}

export default App;
