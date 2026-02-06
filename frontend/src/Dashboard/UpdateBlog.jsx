import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

export default function UpdateBlock() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [about, setAbout] = useState("");
  const [blogImage, setBlogImage] = useState(null);
  const [blogImagePreview, setBlogImagePreview] = useState("");
  const navigateTo=useNavigate();
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

  useEffect(() => {
    const fetchBlog = async (e) => {
      try {
        const { data } = await axios.get(
          `http://localhost:4001/api/blogs/single-blog/${id}`,
          { withCredentials: true },
        );

        setTitle(data?.title);
        setCategory(data?.category);
        setAbout(data?.about);
        setBlogImagePreview(data?.blogImage?.url);
      } catch (error) {
        toast.error("Failed to load blog");
      }
    };
    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("about", about);
    if(blogImage){
      formData.append("blogImage", blogImage);
    }

    try {
      const { data } = await axios.put(
        `http://localhost:4001/api/blogs/update/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      toast.success(data.message || "Blog Updated Successfully");
      navigateTo("/");
    } catch (error) {
      toast.error(error.message || "failed to load blog");
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white shadow rounded-2xl p-8">
          <h1 className="text-2xl font-semibold text-center mb-6">
            Update Your Blog
          </h1>

          <form onSubmit={handleUpdate} className="space-y-4">
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
              <option value="devotion">Devotion</option>
              <option value="sports">Sports</option>
              <option value="coding">Coding</option>
              <option value="entertainment">Entertainment</option>
              <option value="bussiness">Bussiness</option>
              <option value="others">others</option>
            </select>

            <label htmlFor="">About</label>

            <textarea
              placeholder="About your blog..."
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="w-full p-2 border rounded-md h-70"
            />
           

            <div className="flex flex-col items-center gap-4">
              {blogImagePreview && (
                <img
                  src={blogImagePreview}
                  alt="preview"
                  className="w-50 h-60 oject-cover rounded"
                />
              )}

              <input
                type="file"
                placeholder="choose"
                onChange={handleImageBlog}
                className="w-full border p-3 rounded-2xl"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
            >
              Update Blog
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
