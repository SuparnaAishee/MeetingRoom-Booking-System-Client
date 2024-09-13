import React from "react";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const RoomTable: React.FC = () => {
  // Example data structure for rooms. Replace with Redux Toolkit/RTK Query later
  const rooms = [
    {
      id: 1,
      name: "Meet Room",
      image: "image-url-1",
      floor: 2,
      roomNo: 207,
      capacity: 100,
      price: 400,
      delete: "No",
    },
    {
      id: 2,
      name: "Meeting Room",
      image: "image-url-2",
      floor: 2,
      roomNo: 204,
      capacity: 50,
      price: 200,
      delete: "No",
    },
    // Add more room data here...
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">Rooms List</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add Room
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Image</th>
            <th className="py-2 px-4 border-b text-left">Floor</th>
            <th className="py-2 px-4 border-b text-left">Room No</th>
            <th className="py-2 px-4 border-b text-left">Capacity</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Delete</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room) => (
            <tr key={room.id}>
              <td className="py-2 px-4 border-b">{room.name}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{room.floor}</td>
              <td className="py-2 px-4 border-b">{room.roomNo}</td>
              <td className="py-2 px-4 border-b">{room.capacity}</td>
              <td className="py-2 px-4 border-b">{room.price}</td>
              <td className="py-2 px-4 border-b">{room.delete}</td>
              <td className="py-2 px-4 border-b flex space-x-4">
                <Link
                  to={`/dashboard/edit-room/${room.id}`}
                  className="text-green-500"
                >
                  <EditOutlined className="text-xl" />
                </Link>
                <button className="text-red-500">
                  <DeleteOutlined className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
