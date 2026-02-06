import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Creator() {
  const [admin, setAdmin] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      
      const { data } = await axios.get(
        "http://localhost:4001/api/user/admins",
        { withCredentials: true }
      );

      setAdmin(data.allAdmin);
      console.log(data)
    };

    fetchAdmins();
  }, []);

  return (
    <div className="container mx-auto p-6">

      <h1 className="text-2xl font-semibold mb-8 text-center">
        Popular Creators
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <Link key={element._id}>

              <div className="p-6 text-center">
                <img
                  src={element.photo?.url }
                  alt="creator"
                  className="w-40 h-40 mx-auto rounded-full object-cover border-4 border-gray-400"
                />

                <h2 className="font-semibold text-lg">
                  {element.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {element.role}
                </p>

              </div>

            </Link>
          ))
        ) : (
          <div className="col-span-full text-center">
            No creators found
          </div>
        )}

      </div>
    </div>
  );
}
