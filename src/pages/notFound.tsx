
import { Link } from "react-router-dom"; 

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-7xl font-bold text-green-600">404</h1>
      <h2 className="text-4xl font-semibold text-gray-800 mt-4">
        Page Not Found
      </h2>
      <p className="text-xl text-gray-600 mt-4">
        The page you are looking for might have been removed, had its name
        changed,
      </p>
      <p className="text-xl text-gray-600 ">
        or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 ease-in-out"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
