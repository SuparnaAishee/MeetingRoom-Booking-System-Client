
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useLoginUserMutation } from "../redux/auth/authApi";
// import { useDispatch, useSelector } from "react-redux";
// import { setCredentials, logout } from "../redux/auth/authSlice"; // Import the logout action
// import { verifyToken } from "../utils/verifyToken"; // Import verifyToken
// import { TUser } from "../redux/auth/authType"; // Import TUser type
// import { toast } from "sonner"; // Import toast from sonner

// const LoginForm: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state
//   const [loginUser, { isLoading, error }] = useLoginUserMutation();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const data = await loginUser({ email, password }).unwrap();
//       const { token, data: userData } = data;

//       // Decode the token and get user info
//       const decodedToken = verifyToken(token);
//       console.log("Decoded Token:", decodedToken);

//       // Create user object from response
//       const user: TUser = {
//         email: userData.email,
//         role: userData.role,
//         name: userData.name || "", // Optional fields
//         address: userData.address || "",
//         phone: userData.phone || "",
//         id: "",
//       };

//       // Store the user and token in Redux store
//       dispatch(setCredentials({ user, token }));

//       toast.success("Login successful!"); // Show success toast
//       navigate("/");
//     } catch (err) {
//       toast.error(error?.data?.message || "Login failed"); // Show error toast
//     }
//   };

//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch the logout action
//     toast.success("Logout successful!"); // Show success toast on logout
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
//       <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-4xl w-full">
//         <div className="w-full md:w-1/2">
//           <img
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1725909611/Computer_login-bro_bbwaim.png"
//             alt="Login"
//             className="object-contain w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
//           />
//         </div>
//         <div className="w-full md:w-1/2 p-6 sm:p-8">
//           <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
//             {isAuthenticated ? "Welcome Back" : "Login"}
//           </h2>
//           {isAuthenticated ? (
//             <div className="mt-6">
//               <button
//                 type="button"
//                 className="w-full px-4 py-2 bg-red-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
//                 onClick={handleLogout}
//               >
//                 Logout
//               </button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="mt-6">
//               <div>
//                 <label className="block text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mt-4">
//                 <label className="block text-gray-700">Password</label>
//                 <input
//                   type="password"
//                   className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="mt-6">
//                 <button
//                   type="submit"
//                   className={`w-full px-4 py-2 bg-green-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 ${
//                     isLoading ? "opacity-50 cursor-not-allowed" : ""
//                   }`}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Logging in..." : "Login"}
//                 </button>
//               </div>
//             </form>
//           )}
//           {!isAuthenticated && (
//             <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
//               Don’t have an account?{" "}
//               <Link to="/signup" className="text-green-600 hover:underline">
//                 Sign Up
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/auth/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, logout } from "../redux/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { TUser } from "../redux/auth/authType";
import { toast } from "sonner";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { isAuthenticated } = useSelector((state: any) => state.auth);
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const {
        token,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        refreshToken,
        data: userData,
      } = await loginUser({ email, password }).unwrap();

      // Decode the token and get user info
      const decodedToken = verifyToken(token);
      console.log("Decoded Token:", decodedToken);

      const user: TUser = {
        email: userData.email,
        role: userData.role,
        name: userData.name || "",
        address: userData.address || "",
        phone: userData.phone || "",
        _id: userData._id,
        bookings: undefined,
        data: undefined,
        refreshToken: ""
      };

      // Save user and tokens in Redux store
      dispatch(setCredentials({ user, token, refreshToken }));

      // Save tokens to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("refreshToken", refreshToken);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      toast.error(error?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token"); // Clear token on logout
    localStorage.removeItem("refreshToken"); // Clear refresh token on logout
    toast.success("Logout successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-6">
      <div className="flex flex-wrap bg-white shadow-lg rounded-lg max-w-4xl w-full">
        <div className="w-full md:w-1/2">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725909611/Computer_login-bro_bbwaim.png"
            alt="Login"
            className="object-contain w-full h-48 md:h-full rounded-t-lg md:rounded-l-lg md:rounded-t-none"
          />
        </div>
        <div className="w-full md:w-1/2 p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800">
            {isAuthenticated ? "Welcome Back" : "Login"}
          </h2>
          {isAuthenticated ? (
            <div className="mt-6">
              <button
                type="button"
                className="w-full px-4 py-2 bg-red-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-red-700 focus:outline-none focus:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6">
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mt-4 relative">
                <label className="block text-gray-700">Password</label>
                <input
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password" input types
                  className="w-full px-3 sm:px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pt-8 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOutlined className="text-xl text-gray-500" /> // Show "Eye" icon when password is visible
                  ) : (
                    <EyeInvisibleOutlined className="text-xl text-gray-500" /> // Show "Eye with slash" icon when password is hidden
                  )}
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className={`w-full px-4 py-2 bg-green-600 text-white text-xl sm:text-2xl rounded-lg hover:bg-green-700 focus:outline-none focus:bg-green-700 ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
          )}
          {!isAuthenticated && (
            <div className="mt-4 text-center text-xs sm:text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-green-600 hover:underline">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
