import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Blog() {
  const { blogs } = useAuth();

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Sports",
    "Coding",
    "Food",
    "Technology",
    "AI",
    "Bussiness",
    "Entertainment",
    "Others",
  ];

  const filteredBlogs =
    selectedCategory === "All"
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

  return (
    <div className="my-10 container mx-auto px-4">
      <h1 className="text-4xl font-semibold mb-6 text-center">All Blogs</h1>

      <div className="flex justify-center mb-8 flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full font-medium transition
              ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-blue-500 hover:text-white"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBlogs && filteredBlogs.length > 0 ? (
          filteredBlogs.map((element) => (
            <Link key={element._id} to={`/blog/${element._id}`}>
              <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl relative group transition">
                <img
                  src={element.blogImage?.url || "/avatar.png"}
                  alt="blog"
                  className="h-64 w-full object-cover"
                />

                <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full flex items-center gap-1 shadow">
                  <FaHeart className="text-yellow-500 text-sm" />
                  <span className="text-xs font-semibold text-black">
                    {element.likes?.length || 0}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 p-4 text-white">
                  <h2 className="font-bold text-lg">{element.title}</h2>

                  <p className="text-sm text-gray-200">
                    By {element.adminName || "Admin"}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No blogs found
          </p>
        )}
      </div>
    </div>
  );
}
