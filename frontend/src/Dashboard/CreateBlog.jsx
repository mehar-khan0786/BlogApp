import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const navigateTo = useNavigate();
  const { setBlogs } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleImageBlog = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBlogImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setBlogImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const changeCreateHandler = async (e) => {
    e.preventDefault();

    if (!title || !category || !about || !blogImage) {
      toast.error("All fields + image required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    formData.append("blogImage", blogImage);

    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://blogapp-3z2p.onrender.com/api/blogs/create",
        formData,
        {
          withCredentials: true,
        },
      );
      toast.success(data.message || "Blog Created Successfully");

      setTitle("");
      setCategory("");
      setAbout("");
      setBlogImage(null);
      setBlogImagePreview("");
      setBlogs((prev) => [data.blog, ...prev]);
      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Please fill all required fields",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white shadow rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Blog</h1>

        <form onSubmit={changeCreateHandler} className="space-y-4">
          <label htmlFor="">Tittle</label>
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <label htmlFor="">category</label>

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            className="w-full p-2 mb-4 border rounded-md"
          >
            <option value="">Select Your Category</option>
            <option value="sports">Sports</option>
            <option value="coding">Coding</option>
            <option value="food">Food</option>
            <option value="entertainment">Entertainment</option>
            <option value="technology">Technology</option>
            <option value="ai">Ai</option>
            <option value="bussiness">Bussiness</option>
            <option value="others">others</option>
          </select>

          <label htmlFor="">About</label>

          <textarea
            placeholder="About your blog..."
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className="w-full p-2 border rounded-md h-60"
          />
          <label htmlFor="">Choose Image</label>

          <div className="flex flex-col items-center gap-4">
            {blogImagePreview && (
              <img
                src={blogImagePreview}
                alt="preview"
                className="w-50 h-60 oject-cover rounded"
              />
            )}

            <input type="file" onChange={handleImageBlog} className="w-full" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </form>
      </div>
    </div>
  );
}
