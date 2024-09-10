import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-4xl w-full">
        {/* Left Image Section */}
        <div className="w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725909611/Computer_login-bro_bbwaim.png"
            alt="Login"
            className="object-contain w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-green-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-between mt-4 text-xs sm:text-sm text-gray-600">
            <a href="#" className="hover:text-green-600">
              Forgot Password?
            </a>
          </div>
          <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-green-600 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
