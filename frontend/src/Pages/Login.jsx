import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";


export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const { setIsAuthenticated ,setProfile,setLoading,loading} = useAuth();
  const navigateTo = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role || !email || !password) {
      toast.error("Please Enter All Fields");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://blogapp-3z2p.onrender.com/api/user/login",
        { email, password, role },
        {
          withCredentials: true,
        },
      );
      toast.success(data.message || "User Login Successfully");
      setIsAuthenticated(true);
      setPassword("");
      setEmail("");
      setRole("");
      setProfile({user:data.user});
      navigateTo("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message||"please fill required field");
    }finally{
      setLoading(false)
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-300">
        <div className="w-full max-w-md bg-white shadow rounded-2xl p-8">
          <form onSubmit={handleRegister}>
            <div className="font-semibold text-xl text-center items-center">
              Cilli <span className="text-blue-500">Blog</span>
            </div>
            <h1 className="text-xl font-semibold mb-6">Login</h1>
            <select
              value={role}
              onChange={(e) => {
                setRole(e.target.value);
              }}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full p-2 border rounded-md"
              />
            </div>

            <p className="mb-4 text-center">
              New User?
              <Link className="text-blue-400" to="/register">
                Register Now
              </Link>
            </p>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 duration-100 rounded-md text-white"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
