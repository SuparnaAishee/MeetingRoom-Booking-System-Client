import React from "react";
import { Button } from "antd";
import { Link } from "react-router-dom";
import Rooms from "./Rooms";


const FeaturedRooms: React.FC = () => {
  return (
    <div>
      {/* Featured Rooms Section */}
      <div className="featured-rooms-section p-8 bg-gray-200">
        {/* <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
          Featured Rooms
        </h2> */}

        {/* Render the Rooms component with a limit of 6 */}
        <Rooms limit={6} />

        <div className="text-center mt-8">
          <Link to="/rooms">
            <Button className="bg-green-500 text-white py-6 px-6 text-lg">
              See More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedRooms;
