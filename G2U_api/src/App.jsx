import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoutes from "./routes/PrivateRoutes";
import { ToastContainer } from "react-toastify";  


const App = () => {
  return (
    <div>
      <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
       
        <Route
          path="/home"
          element={
            <PrivateRoutes>
              <Home />
            </PrivateRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
