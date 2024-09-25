/* eslint-disable @typescript-eslint/no-unused-vars */
// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const RegisterForm: React.FC = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
   
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
//       <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-5xl w-full">
//         {/* Left Image Section */}
//         <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
//           <img
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1725909789/Sign_up-bro_wvuurk.png"
//             alt="Register"
//             className="object-contain w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//           />
//         </div>

//         {/* Right Form Section */}
//         <div className="w-full md:w-1/2 p-6 sm:p-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
//             Create an Account
//           </h2>
//           <form onSubmit={handleSubmit} className="mt-6">
//             <div>
//               <label className="block text-gray-700">Name</label>
//               <input
//                 type="text"
//                 className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Email</label>
//               <input
//                 type="email"
//                 className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Phone Number</label>
//               <input
//                 type="tel"
//                 className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Address</label>
//               <input
//                 type="text"
//                 className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                 placeholder="Enter your address"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//               />
//             </div>
//             <div className="mt-4">
//               <label className="block text-gray-700">Password</label>
//               <input
//                 type="password"
//                 className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="mt-6">
//               <button
//                 type="submit"
//                 className="w-full px-4 py-2 bg-green-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700"
//               >
//                 Sign Up
//               </button>
//             </div>
//           </form>
//           <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-green-600 hover:underline">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;


// src/components/RegisterForm.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../redux/auth/authApi"; // Adjust the import path
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons"; // Import Ant Design icons

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [eyeVisible, setEyeVisible] = useState(false); // Controls the visibility of the password
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [signupUser, { isLoading, error }] = useSignupUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const userData = await signupUser({
        name,
        email,
        phone,
        address,
        password,
      }).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-5xl w-full">
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725909789/Sign_up-bro_wvuurk.png"
            alt="Register"
            className="object-contain w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Create an Account
          </h2>
          <form onSubmit={handleSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Address</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="mt-4 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={eyeVisible ? "text" : "password"} // Toggle between "text" and "password" input types
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute inset-y-0 right-0 pt-8 pr-3 flex items-center cursor-pointer"
                onClick={() => setEyeVisible(!eyeVisible)} // Toggle visibility on icon click
              >
                {eyeVisible ? (
                  <EyeOutlined className="text-xl text-gray-500" /> // Show "Eye" when password is visible (not crossed)
                ) : (
                  <EyeInvisibleOutlined className="text-xl text-gray-500" /> // Show "EyeInvisible" when password is hidden (crossed)
                )}
              </span>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className={`w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="mt-4 text-center text-xs text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

