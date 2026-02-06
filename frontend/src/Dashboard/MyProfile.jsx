import React from "react";
import { useAuth } from "../context/AuthProvider";

export default function Creator() {
  const { profile } = useAuth();

  return (
    /* ✅ important change here */
    <div className="lg:ml-64 justify-center ml-0 py-12 px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center mb-10">My Profile</h1>

      <div className="flex justify-center">
        <div className="max-w-80 w-full ">
          <div
            className="bg-white shadow rounded-2xl p-10 text-center
                     hover:shadow-2xl hover:-translate-y-2
                     transition duration-300"
          >
            <img
              src={profile?.user?.photo?.url || "/avatar.png"}
              alt="creator"
              className="w-24 h-24 mx-auto rounded-full object-cover
                       border-4 border-blue-400"
            />

            <h2 className="mt-4 font-semibold text-lg">
              {profile?.user?.name}
            </h2>

            <p className="text-sm text-gray-500">{profile?.user?.email}</p>

            <p className="text-sm text-gray-500">{profile?.user?.phone}</p>

            <p className="text-sm text-gray-500 capitalize">
              {profile?.user?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
