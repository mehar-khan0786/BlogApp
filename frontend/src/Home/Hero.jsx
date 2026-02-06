import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

export default function Hero() {
  const { blogs } = useAuth();

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {blogs && blogs.length > 0 ? (
        blogs.slice(0, 12).map((element) => (
          <Link
            key={element._id}
            to={`/blog/${element._id}`}
            className="group relative bg-white rounded-lg shadow hover:shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <div className="relative">
              <img
                src={element.blogImage?.url || "/avatar.png"}
                alt="blog"
                className="w-full h-48 object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70" />

              <div className="absolute right-0 px-3 py-1 flex items-center gap-1">
                <FaHeart className="text-yellow-500 text-3xl" />
                <span className="text-xl font-semibold text-black">
                  {element.likes?.length || 0}
                </span>
              </div>

              <h2 className="absolute bottom-3 left-3 text-white font-semibold text-lg group-hover:text-yellow-400">
                {element.title}
              </h2>
            </div>

            <div className="p-6 flex items-center gap-3">
              <img
                src={element.adminPhoto || "/avatar.png"}
                className="w-12 h-12 rounded-full border border-yellow-300 object-cover"
                alt=""
              />

              <div>
                <p className="text-lg text-gray-600 font-semibold">
                  By {element.adminName || "Admin"}
                </p>
                <p className="text-xs text-gray-400">New</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[9999]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-blue-600 font-semibold text-lg">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
}
