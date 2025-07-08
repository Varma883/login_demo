import React from 'react';
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext';
import { Link, useLocation, useNavigate } from "react-router-dom";


const Home = () => {

  const {logout}=useAuth()
  const navigate = useNavigate()

    const handleGetStarted = () => {
    toast.success("Let's get started! 🚀");
  };

  const handleLogout = () => {
    logout();
    
    toast.info("Logged out successfully");

  };

  return (
    <div className="relative min-h-screen bg-black text-yellow-400 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* 🔵 White Animated Circles - Decorative Background */}
      <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white rounded-full animate-ping-slow opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-white rounded-full animate-pulse opacity-20"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white rounded-full animate-spin-slow opacity-10"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 border border-white rounded-full animate-pulse opacity-25"></div>
      <div className="absolute bottom-10 left-1/4 w-20 h-20 border-2 border-white rounded-full animate-ping-slow opacity-15"></div>
      <div className="absolute top-16 right-1/4 w-10 h-10 border border-white rounded-full animate-pulse opacity-20"></div>
      <div className="absolute bottom-1/3 left-10 w-16 h-16 border border-white rounded-full animate-spin-slow opacity-10"></div>

      {/* ✨ Main Content */}
      <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center z-10">
        Welcome to <span className="text-yellow-300">Our Website</span>
      </h1>
      <p className="text-lg md:text-xl text-yellow-200 max-w-xl text-center mb-6 z-10">
        Welcome back user 
      </p>
      
      <div className="flex justify-between items-center gap-5 z-10">
        <button
          onClick={handleGetStarted}
          className="px-6 py-3 border border-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
        >
          Get Started
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 border border-yellow-400 hover:bg-yellow-400 hover:text-black transition duration-300 rounded-md"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
