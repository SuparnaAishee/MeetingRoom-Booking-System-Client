import React from "react";
import Sidebar from "../../../components/ui/Sidebar"; 
import BookingTable from "./BookingTable";


const BookingList: React.FC = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar /> 
      <div className="flex-1 p-4 roomtable">
        {" "}
       
        <BookingTable/>
      </div>
    </div>
  );
};
export default BookingList;
