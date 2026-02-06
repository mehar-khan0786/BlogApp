import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [education, setEducation] = useState("");
  const [role, setRole] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoReview, setPhotoReview] = useState("");
  const navigateTo = useNavigate();
  const { setIsAuthenticated, setProfile,setLoading } = useAuth();

  const changePhotoHandler = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPhotoReview(reader.result);
      setPhoto(file);
    };
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !role || !phone || !education) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    formData.append("education", education);
    if (photo) formData.append("photo", photo);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://blogapp-3z2p.onrender.com/api/user/register",
        formData,
        {
          withCredentials: true,
        },
      );
      console.log(data);
      toast.success(data.message || "User Register Successfully");
      setIsAuthenticated(true);
      setName("");
      setPhone("");
      setPassword("");
      setEmail("");
      setPhoto(null);
      setRole("");
      setProfile({user:data.user});
      setPhotoReview("");
      navigateTo("/");
    } catch (error) {
      console.log(error.response?.data);

      toast.error(error.response?.data?.message || "Registration failed");
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
            <h1 className="text-xl font-semibold mb-6">Register</h1>
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
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Your Name"
                value={name}
                className="w-full p-2 border rounded-md"
              />
            </div>

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
                type="number"
                placeholder="Your phone No"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
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

            <select
              value={education}
              onChange={(e) => {
                setEducation(e.target.value);
              }}
              className="w-full p-2 mb-4 border rounded-md"
            >
              <option value="">Select Your Education</option>
              <option value="BCA">BCA</option>
              <option value="MCA">MCA</option>
              <option value="MBA">MBA</option>
              <option value="BBA">BBA</option>
            </select>

            <div className="flex items-center mb-4">
              <div className="photo w-20 mr-4">
                <img src={photoReview ? photoReview : "photo"} alt="photo" />
              </div>
              <input
                type="file"
                onChange={changePhotoHandler}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <p className="mb-4 text-center">
              Already Registered?{" "}
              <Link className="text-blue-400" to="/log-in">
                Login Now
              </Link>
            </p>
            <button 
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 duration-100 rounded-md text-white"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
