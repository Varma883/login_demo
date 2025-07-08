import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setshowPassword] = useState();
  const [shoconfirmPassword, setshoconfirmPassword] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  //to store the values dynamically inside the component
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    age: "",
    gender: "",
    college_university: "",
    highest_qualification: "",
    phone: "",
    stream: "",
    current_location: "",
    preferred_job_types: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.password_confirmation) {
      toast.error("passwords do not match");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "https://g2u.mavenerp.in/g2uapi/public/api/register",
        formData
      );

      //storing the token
      if (response.data.status) {
        toast.success("Regestration is Succesfull!");

        //storing the token
        localStorage.setItem("authtoken", response.data.token);
        console.log("Login response:", response.data);
        navigate("/home");
      } else {
        toast.error(response.data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full  flex  justify-center items-center mt-5 mb-5 ">
      <div className="w-[700px] h-[650px] border p-5 rounded-3xl bg-gray-50 ">
        <div className="flex justify-between items-center">
          <div className="text-xl lg:text-2xl font-bold  flex flex-col gap-0  text-center   ">
            <span>WESHOP.</span>
            <small className="lg:text-xs text-[10px]">
              The Store That Gets You
            </small>
          </div>

          <div>
            <h1 className="text-xl lg:text-2xl  flex flex-col gap-0  text-center">
              Join Us!!
            </h1>
            <p className="lg:text-xs text-[10px] text-center">
              Creat your account
            </p>
          </div>
        </div>

        <span className=" ">
          <p className="text-center mt-1 text-xs">
            Please fill the requred fileds to get your acccount created
          </p>
        </span>
        {/* the form starts here */}
        <form
          className="mx-auto border p-3 w-full mt-2 "
          onSubmit={handleSubmit}
        >
          <div className="relative z-0 w-full mb-3 group">
            <input
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={formData.name}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Full name
            </label>
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <input
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={formData.email}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <input
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={formData.password}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>

          <div className="relative z-0 w-full mb-3 group">
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
              placeholder=" "
              required
              value={formData.password_confirmation}
              onChange={handleChange}
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="number"
                name="age"
                id="age"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.age}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Age
              </label>
            </div>

            <div className="relative z-0 w-full mb-3 group">
              <select
                name="gender"
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm text-gray-900
                bg-transparent border-0 border-b-2 border-gray-300
                appearance-none focus:outline-none focus:ring-0
                focus:border-black peer"
              >
                <option value="" disabled hidden>
                  Select gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label
                htmlFor="gender"
                className="peer-focus:font-medium absolute text -sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Gender
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="college_university"
                id="college_university"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.college_university}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Collage & University
              </label>
            </div>

            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="highest_qualification"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.highest_qualification}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Hieghest Qualification
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="tel"
                name="phone"
                id="phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.phone}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone number (+91 9484739203)
              </label>
            </div>

            <div className="relative z-0 w-full mb-3 group">
              <select
                name="stream"
                id="stream"
                value={formData.stream}
                onChange={handleChange}
                required
                className="block py-2.5 px-0 w-full text-sm
                text-gray-900 bg-transparent border-0 border-b-2 border-gray-300
                appearance-none focus:outline-none focus:ring-0
                focus:border-black peer"
              >
                <option value="" disabled hidden>
                  Select stream
                </option>
                <option value="Engineering">Engineering</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
                <option value="Medical">Medical</option>
                <option value="Other">Other</option>
              </select>

              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Stream 
              </label>
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="current_location"
                id="location"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.location}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_phone"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Current Location
              </label>
            </div>

            <div className="relative z-0 w-full mb-3 group">
              <input
                type="text"
                name="preferred_job_types"
                id="job"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                placeholder=" "
                required
                value={formData.job}
                onChange={handleChange}
              />
              <label
                htmlFor="floating_company"
                className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-black peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Preffered Job (Ex. UPSC, SCC etc.)
              </label>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center">
              <p className="mb-0">
                Already have an account? <br />
                <Link
                  to="/"
                  className="fw-medium font-medium text-blue-500 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
