import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">


        <div>
          <h1 className="text-2xl font-bold text-white mb-4">
            Cilli <span className="text-blue-500">Blog</span>
          </h1>
          <p className="text-sm leading-6">
            Discover blogs about technology, business, devotion, and modern life.
            Learn and grow every day with us.
          </p>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
            <li><Link to="/blogs" className="hover:text-blue-400">Blogs</Link></li>
            <li><Link to="/about" className="hover:text-blue-400">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Categories</h2>
          <ul className="space-y-2">
            <li><Link to="/category/tech" className="hover:text-blue-400">Tech</Link></li>
            <li><Link to="/category/business" className="hover:text-blue-400">Business</Link></li>
            <li><Link to="/category/devotion" className="hover:text-blue-400">Devotion</Link></li>
            <li><Link to="/category/lifestyle" className="hover:text-blue-400">Lifestyle</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-white font-semibold mb-4">Account</h2>
          <ul className="space-y-2">
            <li><Link to="/log-in" className="hover:text-blue-400">Login</Link></li>
            <li><Link to="/register" className="hover:text-blue-400">Register</Link></li>
            <li><Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Cilli Blog. All rights reserved.
      </div>

    </footer>
  );
}
