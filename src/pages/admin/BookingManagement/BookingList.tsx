import React from "react";
import Sidebar from "../../../components/ui/Sidebar"; // Import Sidebar component
import BookingTable from "./BookingTable";


const BookingList: React.FC = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar /> {/* Sidebar fixed on the left */}
      <div className="flex-1 p-4 roomtable">
        {" "}
        {/* This div takes the remaining space */}
        <BookingTable/>
      </div>
    </div>
  );
};
export default BookingList;
