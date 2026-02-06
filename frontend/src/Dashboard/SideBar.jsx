import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { LuSquareMenu } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function SideBar({ component, setComponent }) {
  const NavigateTo = useNavigate();
  const { profile, setIsAuthenticated } = useAuth();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
    setShow(false);
  };

console.log(profile)

  const gotoHome = () => {
    NavigateTo("/");
    setShow(false);
  };

  const logout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("https://blogapp-3z2p.onrender.com/api/user/logout", {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      toast.success("Logged out successfully");
      NavigateTo("/");
    } catch (err) {
      console.log(err);
      toast.error("Failed to logout");
    }
  };

  
  return (
    <>
    {/* Sidebar */}
        <div
          className="md:hidden text-3xl fixed top-4 mb-10 left-4 z-[1000] cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <LuSquareMenu />
        </div>
      {/* Hamburger */}
      {/* Sidebar */}
      <div
        className={`w-64 h-screen fixed top-0 left-0 bg-gray-50 shadow-lg z-[9999] transition-transform duration-300 sm:translate-x-0 ${
          show ? "translate-x-0" : "-translate-x-full"
        }`}
      >

         <div
          className="md:hidden text-3xl fixed top-4 left-4 z-[9999] cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <LuSquareMenu />
        </div>

        <div className="p-4">
          <img
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            src={profile?.user?.photo?.url || "/avatar.png"}
            alt="profile"
          />

          <div
            className="sm:hidden absolute top-4 right-4 text-2xl font-bold cursor-pointer"
            onClick={() => setShow(false)}
          >
            ✕
          </div>

          <p className="text-lg text-center font-semibold mb-6">
            {profile?.user?.name}
          </p>

          <div className="space-y-4">
            <button
              onClick={() => handleComponents("My Blogs")}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
            >
              MY BLOGS
            </button>

            <button
              onClick={() => handleComponents("Create Blog")}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
            >
              CREATE BLOG
            </button>

            <button
              onClick={() => handleComponents("My Profile")}
              className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition"
            >
              MY PROFILE
            </button>

            <button
              onClick={gotoHome}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
            >
              HOME
            </button>

            <button
              onClick={logout}
              className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition"
            >
              LOGOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
