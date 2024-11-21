import { useState, useEffect } from "react";
import { useFirebase } from "../context/firebase"; // Assuming you have a custom Firebase hook
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function SpecifcBook() {
  const firebase = useFirebase(); // Access the Firebase context
  const [spBook, setSpBook] = useState(null); // Store specific book data
  const { id } = useParams(); // Get the book ID from URL params
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchBook = async () => {
        console.log(id);
      try {
        const book = await firebase.fetchSpecificBook(id); // Call custom Firebase method
        setSpBook(book); // Update state with book data
        setLoading(false); // Stop loading
      } catch (error) {
        toast.success("There is error");
        setLoading(false);
      }
    };

    fetchBook();
  }, [firebase, id]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!spBook) {
    return <div className="text-center mt-10 text-red-500">Book not found.</div>;
  }

  return (
    <div className="flex flex-col items-center p-6">
      <img
        src={spBook.cover}
        alt={spBook.name}
        className="w-48 h-64 object-cover rounded-lg shadow-md"
      />
      <h1 className="text-2xl font-bold mt-4">{spBook.name}</h1>
      <p className="text-gray-700 mt-2">ISBN: {spBook.isbn}</p>
      <p className="text-gray-900 font-semibold mt-2">${spBook.price}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
        onClick={() => toast.success("Added to Cart Successfully")}
      >
        Add to Cart
      </button>
    </div>
  );
}
