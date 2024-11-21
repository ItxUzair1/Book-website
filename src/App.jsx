import { Routes, Route } from "react-router-dom";  // Make sure you import from 'react-router-dom'
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AddBook from "./pages/AddBook";
import Home from "./pages/Home";
import SpecifcBook from "./pages/SpecificBook";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Make sure to include the Toastify CSS

// src/App.js
function App() {
  return (
    <div>
      {/* ToastContainer should be placed here to ensure it's available globally */}
      <ToastContainer />
      
      {/* Navbar should be placed above routes */}
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/book/:id" element={<SpecifcBook />} />
      </Routes>
    </div>
  );
}

export default App;
