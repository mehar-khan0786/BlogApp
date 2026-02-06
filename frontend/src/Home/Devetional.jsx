import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export default function Trending() {
  const { blogs } = useAuth();
  const devotinalBlogs=blogs?.filter((blog)=>blog.category==="devotion");

  return (
    <div className="my-10 container mx-auto">
      <h1 className="text-4xl font-semibold mb-4">Devotional</h1>

      <p className="text-center mb-8">The Concept of gods varies widley across different culters, religions and belief systems</p>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
         {devotinalBlogs && devotinalBlogs.length > 0 &&
          devotinalBlogs.slice(0, 4).map((element) => (
            <Link key={element._id} to={`/blogs/${element._id}`}>
              <div className="rounded-lg overflow-hidden shadow-lg">

                <img
                  src={element.blogImage?.url}
                  alt="blog"
                  className="h-72 w-full object-cover"
                />

                <div className="p-4 bg-white">
                  <h2 className="font-semibold">{element.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {element.adminName || "Admin"}
                  </p>
                </div>

              </div>
              
            </Link>
            
          ))}
    </div>
    </div>
  );
}
