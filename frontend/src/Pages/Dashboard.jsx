import React from "react";
import { useAuth } from "../context/AuthProvider";
import SideBar from "../Dashboard/SideBar";
import UpdateBlog from "../Dashboard/UpdateBlog";
import MyProfile from "../Dashboard/MyProfile";
import CreateBlog from "../Dashboard/CreateBlog";
import MyBlogs from "../Dashboard/MyBlogs";
import { useState } from 'react';
import { Navigate } from "react-router";


export default function Dashboard() {
  
  const { profile, isAuthenticated } = useAuth();
  const [component, setComponent] = useState("My Blogs");
  console.log(profile);
  console.log(isAuthenticated);

  if(!isAuthenticated){
    return <Navigate to={"/"}/>
  }
  return (
    <div>
      <div>
        <SideBar component={component} setComponent={setComponent} />
        {component === "My Profile" ? (
          <MyProfile />
        ) : component === "Create Blog" ? (
          <CreateBlog />
        ) : component === "Update Blog" ? (
          <UpdateBlog />
        ) : (
          <MyBlogs />
        )}
      </div>
    </div>
  );
}
