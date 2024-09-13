// import React, { useState } from "react";
// import { Modal, Input, Button } from "antd";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
// import "../../../styles/sidebar.css"
// const RoomTable: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<any>(null);

//   const rooms = [
//     {
//       id: 1,
//       name: "Meet Room",
//       image:
//         "https://res.cloudinary.com/dwelabpll/image/upload/v1725722975/reception-desk-design-creative-office-interiors-Brigada-Neos-Archi-living-E_qjugrk.webp",
//       floor: 2,
//       roomNo: 207,
//       capacity: 100,
//       price: 400,
//       delete: "No",
//     },
//     {
//       id: 2,
//       name: "Meeting Room",
//       image: "image-url-2",
//       floor: 2,
//       roomNo: 204,
//       capacity: 50,
//       price: 200,
//       delete: "No",
//     },
//   ];

//   const showModal = (room: any) => {
//     setSelectedRoom(room);
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl font-bold">Rooms List</h2>
//         <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
//           Add Room
//         </button>
//       </div>

//       <table className="min-w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Name</th>
//             <th className="py-2 px-4 border-b text-left">Image</th>
//             <th className="py-2 px-4 border-b text-left">Floor</th>
//             <th className="py-2 px-4 border-b text-left">Room No</th>
//             <th className="py-2 px-4 border-b text-left">Capacity</th>
//             <th className="py-2 px-4 border-b text-left">Price</th>
//             <th className="py-2 px-4 border-b text-left">Delete</th>
//             <th className="py-2 px-4 border-b text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room) => (
//             <tr key={room.id}>
//               <td className="py-2 px-4 border-b">{room.name}</td>
//               <td className="py-2 px-4 border-b">
//                 <img
//                   src={room.image}
//                   alt={room.name}
//                   className="w-16 h-16 rounded-lg object-cover"
//                 />
//               </td>
//               <td className="py-2 px-4 border-b">{room.floor}</td>
//               <td className="py-2 px-4 border-b">{room.roomNo}</td>
//               <td className="py-2 px-4 border-b">{room.capacity}</td>
//               <td className="py-2 px-4 border-b">{room.price}</td>
//               <td className="py-2 px-4 border-b">{room.delete}</td>
//               <td className="py-2 px-4 border-b  space-x-4 items-center">
//                 <button
//                   className="text-green-500"
//                   onClick={() => showModal(room)}
//                 >
//                   <EditFilled className="text-xl" />
//                 </button>
//                 <button className="text-red-500">
//                   <DeleteFilled className="text-xl" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Edit Room Modal */}
//       {selectedRoom && (
//         <Modal
//           title={
//             <h2 className="text-green-600 text-xl font-semibold">
//               Update Meeting Room
//             </h2>
//           }
//           visible={isModalVisible}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           footer={[
//             <div className="flex justify-center mt-4 space-x-4 ">
//               <Button
//                 key="cancel"
//                 onClick={handleCancel}
//                 className="bg-gray-300 hover:bg-gray-400 text-black"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 key="submit"
//                 onClick={handleOk}
//                 className="bg-green-500 hover:bg-green-600 text-white"
//               >
//                 Update Room
//               </Button>
//             </div>,
//           ]}
//         >
//           <div className="space-y-8 pl-6 pr-6">
//             <div className="flex flex-col">
//               <label className="mb-1 text-gray-400">Image URL</label>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   placeholder="Image URL"
//                   value={selectedRoom.image}
//                   onChange={(e) =>
//                     setSelectedRoom({ ...selectedRoom, image: e.target.value })
//                   }
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500 flex-grow"
//                 />
//                 <Button className="bg-green-500 text-white">Add</Button>
//               </div>
//             </div>
//             <div>
//               {" "}
//               <label className="text-gray-400">Room Name</label>
//               <Input
//                 placeholder="Room Name"
//                 value={selectedRoom.name}
//                 onChange={(e) =>
//                   setSelectedRoom({ ...selectedRoom, name: e.target.value })
//                 }
//                 className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-400">Room No</label>
//                 <Input
//                   placeholder="Room No"
//                   value={selectedRoom.roomNo}
//                   onChange={(e) =>
//                     setSelectedRoom({ ...selectedRoom, roomNo: e.target.value })
//                   }
//                   className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 {" "}
//                 <label className="text-gray-400">Floor No</label>
//                 <Input
//                   placeholder="Floor Number"
//                   value={selectedRoom.floor}
//                   onChange={(e) =>
//                     setSelectedRoom({ ...selectedRoom, floor: e.target.value })
//                   }
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-400">Capacity</label>
//                 <Input
//                   placeholder="Capacity"
//                   value={selectedRoom.capacity}
//                   onChange={(e) =>
//                     setSelectedRoom({
//                       ...selectedRoom,
//                       capacity: e.target.value,
//                     })
//                   }
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-400">Price</label>
//                 <Input
//                   placeholder="Price Per Slot"
//                   value={selectedRoom.price}
//                   onChange={(e) =>
//                     setSelectedRoom({ ...selectedRoom, price: e.target.value })
//                   }
//                   className="border-2 border-gray-100 text-gray-400 focus:ring-green-500"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <label className="text-gray-400">Amenities</label>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   placeholder="Amenities"
//                   className="border-2 border-gray-100 text-gray-400 focus:ring-green-500"
//                 />
//                 <Button className="bg-gray-300 text-black">Add</Button>
//               </div>
//             </div>
//           </div>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default RoomTable;

import React, { Key, useState } from "react";
import { Modal, Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useGetRoomsQuery } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure
interface Room {
  id: Key | null | undefined;
 
  floorNo:number;
  roomNo: number;
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
}
const RoomTable: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch rooms from the backend with pagination
  const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
  const rooms = data?.data?.rooms || []; // Use optional chaining
  const totalPages = data?.data?.totalPages || 1;

  console.log(data); // Log the API response

  const showModal = (room: Room) => {
    setSelectedRoom(room);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading rooms.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-green-600 font-bold">Rooms List</h2>
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
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room: Room) => (
            <tr key={room.id}>
              <td className="py-2 px-4 border-b">{room.name}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={
                    room.image && room.image.length > 0
                      ? room.image[0]
                      : "default-image-url.jpg"
                  }
                  alt={room.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
              </td>
              <td className="py-2 px-4 border-b">{room.floorNo}</td>
              <td className="py-2 px-4 border-b">{room.roomNo}</td>
              <td className="py-2 px-4 border-b">{room.capacity}</td>

              <td className="py-2 px-4 border-b">${room.pricePerSlot}</td>
              <td className="py-2 px-4 border-b space-x-4 items-center">
                <button
                  className="text-green-500 "
                  onClick={() => showModal(room)}
                >
                  <EditFilled className="text-xl" />
                </button>
                <button className="text-red-500">
                  <DeleteFilled className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400  ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="ml-4 mr-4 mt-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Edit Room Modal */}
      {selectedRoom && (
        <Modal
          title={
            <h2 className="text-green-600 text-xl font-semibold">
              Update Meeting Room
            </h2>
          }
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={[
            <div className="flex justify-center mt-4 space-x-4">
              <Button
                key="cancel"
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </Button>
              <Button
                key="submit"
                onClick={handleOk}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Submit
              </Button>
            </div>,
          ]}
        >
          <p>Edit form goes here for {selectedRoom.name}</p>
          {/* Add your form fields to edit the room details */}
        </Modal>
      )}
    </div>
  );
};

export default RoomTable;
