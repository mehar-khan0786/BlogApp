import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const { profile, isAuthenticated, setIsAuthenticated, setProfile } =
    useAuth();

  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("https://blogapp-3z2p.onrender.com/api/user/logout", {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      setProfile(null);

      toast.success("Logged out successfully");
      navigateTo("/log-in");
    } catch (err) {
      toast.error("Failed to logout");
    }
  };

  return (
    <nav className="shadow-lg px-4 py-3 bg-white">

      {/* ================= DESKTOP ================= */}
      <div className="flex items-center justify-between container mx-auto">

        <div className="font-semibold text-xl">
          Cilli <span className="text-blue-500">Blog</span>
        </div>

        <ul className="space-x-6 hidden md:flex">
          <Link to="/">HOME</Link>
          <Link to="/blogs">BLOGS</Link>
          <Link to="/creators">CREATORS</Link>
          <Link to="/contact">CONTACT</Link>
        </ul>

        <div className="space-x-3 hidden md:flex">

          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
            >
              DASHBOARD
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/log-in"
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
            >
              LOGOUT
            </button>
          )}
        </div>

        <div className="md:hidden cursor-pointer" onClick={() => setShow(!show)}>
          {show ? <IoMdClose size={26} /> : <MdOutlineMenu size={26} />}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {show && (
        <div className="md:hidden mt-4 flex flex-col items-center gap-5 pb-6">

          <Link to="/" onClick={() => setShow(false)}>HOME</Link>
          <Link to="/blogs" onClick={() => setShow(false)}>BLOGS</Link>
          <Link to="/creators" onClick={() => setShow(false)}>CREATORS</Link>
          <Link to="/contact" onClick={() => setShow(false)}>CONTACT</Link>

          {isAuthenticated && profile?.user?.role === "admin" && (
            <Link
              to="/dashboard"
              onClick={() => setShow(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              DASHBOARD
            </Link>
          )}

          {!isAuthenticated ? (
            <Link
              to="/log-in"
              onClick={() => setShow(false)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              LOGIN
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              LOGOUT
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
