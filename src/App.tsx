import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/auth/authSlice"; // Adjust the import path as needed
import MainLayout from "./components/layout/MainLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to retrieve tokens from localStorage
    const getTokensFromLocalStorage = () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      return { token, refreshToken };
    };

    const { token, refreshToken } = getTokensFromLocalStorage();

    // Set tokens in the Redux store if they exist
    if (token && refreshToken) {
      dispatch(setCredentials({ user: null, token, refreshToken })); // Replace user: null with actual user if available
    }
  }, [dispatch]);

  return (
    <>
      <MainLayout />
    </>
  );
}

export default App;
