import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logout } from "../redux/auth/authSlice";

export type TProtectedRoute = {
  children: ReactNode;
  role?: string; // Optional role
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.auth.token); // Get token from the state
  const dispatch = useAppDispatch();

  // Verify token and extract user information
  const user = token ? verifyToken(token) : null;

  // If there's no valid token, log out and redirect to login
  if (!token || !user) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If the route has a required role and the user's role doesn't match, log out and redirect
  if (role && user.role !== role) {
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  // If authenticated and authorized, render the child components
  return <>{children}</>;
};

export default ProtectedRoute;
