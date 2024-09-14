import React from "react";
import Sidebar from "../../../components/ui/Sidebar"; // Import Sidebar component
import SlotTable from "./SlotTable";


const SlotList: React.FC = () => {
  return (
    <div className="flex bg-gray-100">
      <Sidebar /> {/* Sidebar fixed on the left */}
      <div className="flex-1 p-4 roomtable">
        {" "}
        {/* This div takes the remaining space */}
       <SlotTable/>
      </div>
    </div>
  );
};

export default SlotList;
