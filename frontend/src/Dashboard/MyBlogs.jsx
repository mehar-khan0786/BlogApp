import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

export default function MyBlogs() {
  const [myBlogs, setMyBlogs] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        
        const { data } = await axios.get(
          "https://blogapp-3z2p.onrender.com/api/blogs/my-blog",
          { withCredentials: true },
        );

        setMyBlogs(data.myBlogs || []);
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong")
      }
      finally{
        setLoading(false);
      }
    };

    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      
      const { data } = await axios.delete(`http://localhost:4001/api/blogs/delete/${id}`,
        { withCredentials: true },
      );

      toast.success(data.message || "Blog deleted successfully");

      setMyBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to Delete Blog")
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="sm:ml-64 ml-0 my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-wrap p-2 ">
      {myBlogs.length > 0 ? (
        myBlogs.map((element) => (
          <div
            key={element._id}
            className="group bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <Link to={`/blog/${element._id}`}>
              <div className="relative">
                <img
                  src={element.blogImage?.url || "/avatar.png"}
                  alt="blog"
                  className="w-full h-48 object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

                <h2 className="absolute bottom-3 left-3 text-white font-semibold text-lg group-hover:text-yellow-400">
                  {element.title}
                </h2>
              </div>
            </Link>

            <div className="p-4 flex flex-col items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={element?.adminPhoto || "/avatar.png"}
                  className="w-10 h-10 rounded-full object-cover"
                  alt=""
                />

                <p className="text-sm text-gray-600 font-semibold">
                  {element.adminName || "Admin"}
                </p>
              </div>
            </div>

            <div className="flex gap-2 justify-between px-3 pb-5 ">
              <Link
                to={`/blog/update/${element._id}`}
                className="text-blue-500 border px-3 py-1 rounded hover:bg-blue-300"
              >
                UPDATE
              </Link>

              <button
                onClick={() => {
                  handleDelete(element._id);
                }}
                className="text-red-500 border px-3 py-1 rounded hover:bg-red-300"
              >
                DELETE
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No Blogs Found
        </div>
      )}
    </div>
  );
}
