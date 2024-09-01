import React from "react";
import { Link } from "react-router-dom";

const UserDashboard: React.FC = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        <li>
          <Link to="/user/my-bookings">My Bookings</Link>
        </li>
        <li>
          <Link to="/user/room-details/1">Room Details</Link>
        </li>{" "}
        {/* Example room ID */}
        {/* Add more links as needed */}
      </ul>
    </div>
  );
};

export default UserDashboard;
