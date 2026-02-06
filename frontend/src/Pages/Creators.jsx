import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const { data } = await axios.get(
        "http://localhost:4001/api/user/admins",
        { withCredentials: true },
      );

      setAdmin(data.allAdmin);
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Popular Creators</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {admin && admin.length > 0 ? (
          admin.map((element) => (
            <Link key={element._id} className="group">
              <div
                className="bg-white shadow rounded-2xl p-6 text-center 
                              hover:shadow-2xl hover:-translate-y-2 
                              transition duration-300"
              >
                <img
                  src={element.photo?.url || "https://via.placeholder.com/100"}
                  alt="creator"
                  className="w-24 h-24 mx-auto rounded-full object-cover 
                             border-4 border-blue-400 group-hover:border-blue-600"
                />

                <h2 className="mt-4 font-semibold text-lg">{element.name}</h2>

                <p className="text-sm text-gray-500">{element.role}</p>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No creators found
          </div>
        )}
      </div>
    </div>
  );
}
