// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "./redux/auth/authSlice"; // Adjust the import path as needed
// import MainLayout from "./components/layout/MainLayout";


// function App() {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     // Function to retrieve tokens from localStorage
//     const getTokensFromLocalStorage = () => {
//       const token = localStorage.getItem("token");
//       const refreshToken = localStorage.getItem("refreshToken");
//       return { token, refreshToken };
//     };

//     const { token, refreshToken } = getTokensFromLocalStorage();

//     // Set tokens in the Redux store if they exist
//     if (token && refreshToken) {
//       dispatch(setCredentials({ user: null, token, refreshToken }));
//     }
//   }, [dispatch]);

//   return (
//     <>
//       <MainLayout />
//     </>
//   );
// }

// export default App;
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/auth/authSlice"; // Adjust the import path as needed
import MainLayout from "./components/layout/MainLayout";
import { TUser } from "./redux/auth/authType";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Function to retrieve tokens from localStorage
    const getTokensFromLocalStorage = () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      return { token, refreshToken };
    };

    const { token, refreshToken } = getTokensFromLocalStorage();

    // Fetch user data from an API or local storage, if available
    const getUserFromLocalStorage = (): TUser | null => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    };

    const user = getUserFromLocalStorage();

    // Set tokens and user in the Redux store if they exist
    if (token && refreshToken && user) {
      dispatch(setCredentials({ user, token, refreshToken }));
    }
  }, [dispatch]);

  return (
    <>
      <MainLayout />
    </>
  );
};

export default App;
