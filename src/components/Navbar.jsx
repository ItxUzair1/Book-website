import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            BookStore
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:text-gray-200 transition duration-200"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/addbook"
              className="hover:text-gray-200 transition duration-200"
            >
              Add Listing
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
