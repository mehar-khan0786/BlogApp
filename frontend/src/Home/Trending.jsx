import React from "react";
import { useAuth } from "../context/AuthProvider";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Trending() {
  const { blogs } = useAuth();

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="my-10 container mx-auto px-4">
      <h1 className="text-4xl font-semibold mb-6">Trending</h1>

      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={2000}
        itemClass="px-3"
      >
        {blogs &&
          blogs.length > 0 &&
          blogs.slice(0, 4).map((element) => (
            <Link key={element._id} to={`/blog/${element._id}`}>
              <div className="relative group rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition duration-300">

                <img
                  src={element.blogImage?.url || "/avatar.png"}
                  alt="blog"
                  className="h-72 w-full object-cover group-hover:scale-105 transition duration-300"
                />

                <div
                  className="
                    absolute top-3 right-3
                    bg-white/95 px-3 py-1 rounded-full
                    flex items-center gap-1 shadow-md
                    transition-all duration-300
                    group-hover:scale-110 group-hover:shadow-xl
                  "
                >
                  <FaHeart className="text-yellow-500 group-hover:text-red-500 transition-colors duration-300" />

                  <span className="text-sm font-semibold text-black">
                    {element.likes?.length || 0}
                  </span>
                </div>

                <div className="p-4">
                  <h2 className="font-semibold text-lg">{element.title}</h2>
                  <p className="text-sm text-gray-500">
                    By {element.adminName || "Admin"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </Carousel>
    </div>
  );
}
