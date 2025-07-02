import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path='/home' element={<Home/>}/>
      </Routes>
      
    
      

    </div>
  )
}

export default App
