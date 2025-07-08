import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useAuth } from "../context/AuthContext";


const Login = () => {
  const {login} =useAuth()
  const navigate = useNavigate();
  const location =useLocation();

  // this for to change the text on the loging button to loggin in....
  const [isSubmitting, setIsSubmitting] = useState(false);

  //to store the values dynamically inside the component
  const [formdata, setFormData]=useState({
    email: localStorage.getItem('remeberEmail') || "",
    password:"",
    remember: false
  });

  // this is to avoid writing onchange for cleaner code--- need to check
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  


  const [error, setError] = useState(""); 
  
  const handlelogin = async(e)=>{
    e.preventDefault();
    setIsSubmitting(true)
   setError('')

   try{ 
        const response = await axios.post(
          "https://g2u.mavenerp.in/g2uapi/public/api/login",
          {
            email:formdata.email,
            password:formdata.password,
          }
        );

        //to store the token 
        if(response.data.status){
          console.log("API login success block reached");
          toast.success("login succesfull")
          localStorage.setItem("authToken",response.data.token)
        

        // Store email if 'Remember me' is checked
        if(formdata.remember){
          localStorage.setItem("remeberEmail",formdata.email);
        }else{
          localStorage.removeItem("remeberEmail")
        }

        //call login from context {useAuth}
        login(response.data.token)
        console.log("Login response:", response.data);

        //navigate to home page if login succesfull
        console.log("Navigating to Home...");
         navigate("/home", { replace: true });
      } else{
        toast.error(response.data.message || "login Failed")
      }
   }
   catch(error){
      toast.error(
        error.response?.data?.message ||
        "An error occurred during login. Please try again."
      );

   }
    finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full h-full  flex  justify-center items-center mt-5 mb-5 ">
      <div className="w-[90%]  md:w-[500px] h-[500px] border p-5 rounded-3xl bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-xl lg:text-2xl font-bold  flex flex-col gap-0  text-center   ">
            <span>WESHOP.</span>
            <small className="lg:text-xs text-[10px]">
              The Store That Gets You
            </small>
          </div>
        </div>
        <span className=" ">
          <p className="lg:text-xs text-[10px] text-center mt-3  ">
            Please enter your credentials
          </p>
        </span>
        
        {/* the form starts from here  */}
        <form
          action=""
          onSubmit={handlelogin}
          className="mx-auto border p-4 w-full mt-2"
        >
          <div>
            <h1 className="text-xl lg:text-2xl  flex flex-col gap-0 ms-2 text-center">
              Welcom Back!!
            </h1>
            <p className="lg:text-xs text-[10px] text-center">
              {" "}
              Lests get you started
            </p>
          </div>
          <div className=" ">
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your email
              </label>
              <input
                type="email" 
                id="email"
                name='email'
                value={formdata.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="youremailid@domain.com"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formdata.password}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex  items-center justify-between mb-5">
              <div className="flex items-start ">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                </div>
                <label
                  htmlFor="remember"
                  id="remember"
                  name="remember"
                  checked={formdata.remember}
                  onChange={handleChange}
                  className="ms-2 text-sm font-medium text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <Link
                to={"/register"}
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Forgot Password
              </Link>
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  lg:w-auto px-5 py-2.5 text-center"
              >
                {isSubmitting ? "Logging in...":"Login"}
              </button>

              <Link
                to={"/signup"}
                href="#"
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Create Account
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
