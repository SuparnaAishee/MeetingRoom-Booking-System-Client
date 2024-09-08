import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import { useGetRoomByIdQuery } from "../redux/features/roomsApi";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: response, isLoading, error } = useGetRoomByIdQuery(roomId);

  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const room = response?.data;

  useEffect(() => {
    if (room && room.image && room.image.length > 0) {
      setMainImage(room.image[0]);
    }
  }, [room]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !room) return <div>Error loading room details.</div>;

  return (
    <div className="p-8 layout-padding flex space-x-12">
      {/* Left Side - Images */}
      <div className="w-1/2">
        <div className="mb-6">
          <img
            src={mainImage || "https://via.placeholder.com/400"}
            alt={room?.name}
            className="w-full h-96 object-cover mb-4 rounded-lg border-2 border-green-500"
          />
        </div>

        <div className="flex space-x-4 mb-6">
          {room.image && room.image.length > 0 ? (
            room.image.map((img: string, index: number) => (
              <img
                key={index}
                src={img}
                alt={`Room Image ${index + 1}`}
                className={`w-24 h-24 object-cover cursor-pointer rounded-md transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "border-4 border-green-500"
                    : "border-2 border-gray-300"
                }`}
                onClick={() => {
                  setMainImage(img);
                  setSelectedImageIndex(index);
                }}
              />
            ))
          ) : (
            <p>No images available for this room.</p>
          )}
        </div>
      </div>

      {/* Right Side - Room Details */}
      <div className="w-1/2">
        <h1 className="text-4xl font-bold mb-6 text-green-500">
          {room?.name || "No Room Name"}
        </h1>

        <div className="mb-6 space-y-4">
          <p className="text-base">
            <strong>Room No:</strong> {room?.roomNo || "N/A"}
          </p>
          <p className="text-base">
            <strong>Floor No:</strong> {room?.floorNo || "N/A"}
          </p>
          <p>
            <strong className="text-base">Capacity:</strong>{" "}
            {room?.capacity || "N/A"}
          </p>
          <p>
            <strong className="text-xl text-green-500">Price per Slot:</strong>{" "}
            <span className="bg-yellow-100 px-4 py-2 rounded-lg">
              ${room?.pricePerSlot || "N/A"}
            </span>
          </p>
          <p>
            <strong className="text-base">Description:</strong>{" "}
            {room?.description || "No description available."}
          </p>
          <p>
            <strong className="text-base">Amenities:</strong>{" "}
            {room?.amenities && room?.amenities.length > 0 ? (
              <ul className="list-none flex flex-wrap space-x-2 pt-4">
                {room.amenities.map((amenity: string, index: number) => (
                  <li
                    key={index}
                    className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
                  >
                    {amenity}
                  </li>
                ))}
              </ul>
            ) : (
              "No amenities available."
            )}
          </p>
        </div>

        {/* Special Offer */}
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded-md">
          <p className="text-lg font-semibold">
            Special Offer: Book now and get{" "}
            <span className="text-green-500">10% off</span> your first booking!
          </p>
          <p className="text-md">
            Use code <strong>FIRST10</strong> at checkout.
          </p>
        </div>

        {/* Book Now Button */}
        <Button className="bg-green-500 text-white text-lg py-6 px-10">
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default RoomDetails;
