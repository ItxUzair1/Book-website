import React, { useState } from "react";
import { useFirebase } from "../context/firebase";
import { toast } from "react-toastify";
export default function AddBook() {
  const firebase=useFirebase();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isbn, setIsbn] = useState("");
  const [coverPhoto, setCoverPhoto] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await firebase.AddBook(name, price, isbn, coverPhoto);
      setName("");
      setPrice("");
      setIsbn("");
      setCoverPhoto("");
      toast.success("Book added successfully!");
    } catch (error) {
      toast.error(`Failed to add book: ${error.message}`);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Add New Book</h2>
        <form onSubmit={handleSubmit}>
          {/* Book Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
              Book Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter book name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter price"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* ISBN */}
          <div className="mb-4">
            <label htmlFor="isbn" className="block text-gray-700 font-semibold mb-2">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              name="isbn"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Enter ISBN"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
          </div>

          {/* Cover Photo */}
          <div className="mb-4">
            <label htmlFor="coverPhoto" className="block text-gray-700 font-semibold mb-2">
              Cover Photo
            </label>
            <input
              type="text"
              id="coverPhoto"
              name="coverPhoto"
              placeholder="Enter Image URL"
              value={coverPhoto}
              onChange={(e) => setCoverPhoto(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Add Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
