import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

export default function Detail() {
  const { id } = useParams();
  const { profile } = useAuth();

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true }
        );
        setBlog(data);
      } catch (error) {
        toast.error("Failed to load blog");
      }
    };

    fetchBlog();
  }, [id]);

  // ✅ check if current user liked
  const isLiked = blog?.likes?.includes(profile?.user?._id);

  const handleLike = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/like/${id}`,
        {},
        { withCredentials: true }
      );

      setBlog(data);
    } catch (err) {
      toast.error("Failed to like");
    }
  };

  if (!blog) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-center mb-6">{blog?.title}</h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* IMAGE */}
          <img
            src={blog?.blogImage?.url || "/avatar.png"}
            alt="blog"
            className="w-full h-[400px] object-cover rounded-xl"
          />

          {/* RIGHT CONTENT */}
          <div>
            <span className="text-blue-600 font-semibold uppercase text-sm">
              {blog?.category}
            </span>

            <div className="flex items-center gap-3 my-3">
              <img
                src={blog?.adminPhoto || "/avatar.png"}
                className="w-10 h-10 rounded-full object-cover"
                alt=""
              />
              <p className="font-semibold">{blog?.adminName}</p>
            </div>

            {/* SCROLL TEXT */}
            <div className="h-[300px] overflow-y-auto border-t pt-3 mb-4">
              <p className="text-gray-600 whitespace-pre-line">
                {blog?.about}
              </p>
            </div>

            {/* ❤️ LIKE BUTTON */}
            <button
              onClick={handleLike}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:shadow transition"
            >
              <span
                className={`text-2xl transition ${
                  isLiked ? "text-yellow-400 scale-110" : "text-gray-400"
                }`}
              >
                ❤️
              </span>

              <span className="font-semibold">
                {blog.likes?.length || 0}
              </span>
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
