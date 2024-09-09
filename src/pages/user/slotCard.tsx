import React from "react";

interface SlotCardProps {
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

const SlotCard: React.FC<SlotCardProps> = ({
  startTime,
  endTime,
  isBooked,
}) => {
  return (
    <div
      className={`p-4 border rounded ${
        isBooked ? "bg-gray-300" : "bg-green-200"
      }`}
    >
      <h3 className="text-lg font-semibold">
        {startTime} - {endTime}
      </h3>
      <p>{isBooked ? "Booked" : "Available"}</p>
    </div>
  );
};

export default SlotCard;
