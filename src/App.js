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
import ViewBlog from "./components/ViewBlog/ViewBlog";
import ProfilePage from "./components/Profile/ProfilePage";
import Banner from "./components/Banner/Banner";
export const URL = process.env.REACT_APP_BASE_URL;
function App() {
  return (
    <UserState>
      <Navbar />
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
        <Route path="/myblogs" element={<MyBlogs />} />
        <Route path="/createdblogs/:id" element={<CreatedBlogs />} />
        <Route path="/viewblog/:id" element={<ViewBlog />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/allusers" element={<ShowUsers />} />
        <Route path="/friendrequests" element={<FriendRequests />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </UserState>
  );
}

export default App;
