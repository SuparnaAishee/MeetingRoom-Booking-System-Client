import React from "react";
import "./../styles/custom.css"

const About: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-8 bg-white layout-padding ">
      {/* Text Content */}
      <div className="flex-1 space-y-4">
        <p className="text-green-600 font-semibold">WHO WE ARE</p>
        <h2 className="text-5xl font-bold">
          Influence each other for the better.
        </h2>
        <p className="text-gray-600">
          Nam elit posuere etiam blandit habitasse felis. Letius conubia
          praesent dolor faucibus ad sociosqu facilisis. Volutpat porttitor
          viverra nostra phasellus conubia.
        </p>
        <p className="text-gray-600">
          Ultricies lacinia porttitor etiam consectetur parturient dictumst.
          Quis mus eros bibendum velit eleifend tortor euismod nec consectetur.
          Pulvinar et nec facilisi neque dignissim eu.
        </p>
        <button className="text-white bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg">
          Discover more →
        </button>
      </div>

      {/* Image and Stats */}

      <div className="flex-1 relative">
        <img
          src="https://res.cloudinary.com/dwelabpll/image/upload/v1725375841/meetingRoom_mc6iii.webp"
          alt="Meeting"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
        <div className="absolute  section-stats">
          <h3 className="text-green-600 text-6xl font-bold">150+</h3>
          <p className="text-gray-700">Company Joined</p>
        </div>
      </div>
    </div>
  );
};

export default About;
