import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/user/myprofile",
          { withCredentials: true }
        );

        setProfile({ user: data.user });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setProfile(null);
      }finally{
      setLoading(false)
    }
 
    }
    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4001/api/blogs/all-blogs"
        );
        setBlogs(data.AllBlogs || []);
      } catch (error) {
        console.log(error);
      }finally{
        setLoading(false);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        setBlogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
        loading, 
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
