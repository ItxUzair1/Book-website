import { useEffect, useState } from "react";
import { useFirebase } from "../context/firebase";
import { Link } from "react-router-dom";

export default function Home() {
    const firebase = useFirebase();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        if (firebase.isLogged) {
            const fetchBooks = async () => {
                const result = await firebase.fetchBooks();
                setBooks(result.docs.map(doc => ({ id: doc.id, ...doc.data() })));
            };
            fetchBooks();
        }
    }, [firebase]);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {firebase.isLogged ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-3xl font-bold text-gray-800">Book Collection</h1>
                        <button
                            onClick={firebase.SignOut}
                            className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
                        >
                            Sign Out
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map(book => (
                            <div
                                key={book.id}
                                className="bg-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform duration-300"
                            >
                                <img
                                    src={book.cover}
                                    alt={book.name}
                                    className="w-full h-40 object-cover rounded-md mb-4"
                                />
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                    {book.name}
                                </h3>
                                <p className="text-sm text-gray-500 mb-2">ISBN: {book.isbn}</p>
                                <p className="text-lg font-bold text-gray-800">Price: ${book.price}</p>
                                <Link to={`book/${book.id}`}>View More</Link>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        Welcome to Book Collection
                    </h1>
                    <p className="text-lg text-gray-600 mb-6">
                        Please log in to view our book collection.
                    </p>
                    <button
                        className="bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        <Link to="/login">Login</Link>
                    </button>
                </div>
            )}
        </div>
    );
}
