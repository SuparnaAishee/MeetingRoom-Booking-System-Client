// import React, { Key, useState } from "react";
// import { Modal, Button, Input } from "antd";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
// import { useGetRoomsQuery } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure

// interface Room {
//   id: Key | null | undefined;
//   floorNo: number;
//   roomNo: number;
//   _id: string;
//   name: string;
//   capacity: number;
//   pricePerSlot: number;
//   image: string[];
// }

// const RoomTable: React.FC = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false); // State for Add Room Modal
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null); // State for the selected room
//   const [newRoom, setNewRoom] = useState<Room | null>(null); // State for new room data
//   const [editedRoom, setEditedRoom] = useState<Room | null>(null); // State for editing room
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch rooms from the backend with pagination
//   const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
//   const rooms = data?.data?.rooms || []; // Use optional chaining
//   const totalPages = data?.data?.totalPages || 1;

//   const showModal = (room: Room) => {
//     setSelectedRoom(room);
//     setEditedRoom(room); // Initialize edit form with selected room details
//     setIsModalVisible(true);
//   };

//   const handleOk = () => {
//     // Update the room details (you can implement the API call here)
//     console.log("Updated room:", editedRoom);
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   const showAddModal = () => {
//     setIsAddModalVisible(true);
//   };

//   const handleAddOk = () => {
//     // Add room to the database (you can implement the API call here)
//     console.log(newRoom); // This will log the new room details
//     setIsAddModalVisible(false);
//   };

//   const handleAddCancel = () => {
//     setIsAddModalVisible(false);
//   };

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setNewRoom({
//       ...newRoom,
//       [field]: e.target.value,
//     } as Room);
//   };

//   const handleEditInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setEditedRoom({
//       ...editedRoom,
//       [field]: e.target.value,
//     } as Room);
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading rooms.</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl text-green-600 font-bold">Rooms List</h2>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           onClick={showAddModal} // Show Add Room Modal
//         >
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
//             <th className="py-2 px-4 border-b text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room: Room) => (
//             <tr key={room.id}>
//               <td className="py-2 px-4 border-b">{room.name}</td>
//               <td className="py-2 px-4 border-b">
//                 <img
//                   src={
//                     room.image && room.image.length > 0
//                       ? room.image[0]
//                       : "default-image-url.jpg"
//                   }
//                   alt={room.name}
//                   className="w-16 h-16 rounded-lg object-cover"
//                 />
//               </td>
//               <td className="py-2 px-4 border-b">{room.floorNo}</td>
//               <td className="py-2 px-4 border-b">{room.roomNo}</td>
//               <td className="py-2 px-4 border-b">{room.capacity}</td>

//               <td className="py-2 px-4 border-b">${room.pricePerSlot}</td>
//               <td className="py-2 px-4 border-b space-x-4 items-center">
//                 <button
//                   className="text-green-500 "
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

//       {/* Pagination Controls */}
//       <div className="flex justify-center mt-4">
//         <button
//           className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400  ${
//             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="ml-4 mr-4 mt-2">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 ${
//             currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Edit Room Modal */}
//       {editedRoom && (
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
//             <div className="flex justify-center mt-4 space-x-4">
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
//                 Submit
//               </Button>
//             </div>,
//           ]}
//         >
//           <div className="space-y-8 pl-6 pr-6">
//             <div>
//               <label className="text-gray-400">Room Name</label>
//               <Input
//                 placeholder="Room Name"
//                 value={editedRoom.name}
//                 onChange={(e) => handleEditInputChange(e, "name")}
//                 className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-400">Room No</label>
//                 <Input
//                   placeholder="Room No"
//                   value={editedRoom.roomNo}
//                   onChange={(e) => handleEditInputChange(e, "roomNo")}
//                   className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//                 />
//               </div>
//               <div>
//                 <label className="text-gray-400">Floor No</label>
//                 <Input
//                   placeholder="Floor No"
//                   value={editedRoom.floorNo}
//                   onChange={(e) => handleEditInputChange(e, "floorNo")}
//                   className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-gray-400">Capacity</label>
//               <Input
//                 placeholder="Capacity"
//                 value={editedRoom.capacity}
//                 onChange={(e) => handleEditInputChange(e, "capacity")}
//                 className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="text-gray-400">Price per Slot</label>
//               <Input
//                 placeholder="Price"
//                 value={editedRoom.pricePerSlot}
//                 onChange={(e) => handleEditInputChange(e, "pricePerSlot")}
//                 className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//               />
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Add Room Modal */}
//       <Modal
//         title={
//           <h2 className="text-green-600 text-xl font-semibold">Add New Room</h2>
//         }
//         visible={isAddModalVisible}
//         onOk={handleAddOk}
//         onCancel={handleAddCancel}
//         footer={[
//           <div className="flex justify-center mt-4 space-x-4">
//             <Button
//               key="cancel"
//               onClick={handleAddCancel}
//               className="bg-gray-300 hover:bg-gray-400 text-black"
//             >
//               Cancel
//             </Button>
//             <Button
//               key="submit"
//               onClick={handleAddOk}
//               className="bg-green-500 hover:bg-green-600 text-white"
//             >
//               Submit
//             </Button>
//           </div>,
//         ]}
//       >
//         <div className="space-y-8 pl-6 pr-6">
//           <div>
//             <label className="text-gray-400">Room Name</label>
//             <Input
//               placeholder="Room Name"
//               value={newRoom?.name}
//               onChange={(e) => handleInputChange(e, "name")}
//               className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-gray-400">Room No</label>
//               <Input
//                 placeholder="Room No"
//                 value={newRoom?.roomNo}
//                 onChange={(e) => handleInputChange(e, "roomNo")}
//                 className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//               />
//             </div>
//             <div>
//               <label className="text-gray-400">Floor No</label>
//               <Input
//                 placeholder="Floor No"
//                 value={newRoom?.floorNo}
//                 onChange={(e) => handleInputChange(e, "floorNo")}
//                 className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-gray-400">Capacity</label>
//             <Input
//               placeholder="Capacity"
//               value={newRoom?.capacity}
//               onChange={(e) => handleInputChange(e, "capacity")}
//               className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//             />
//           </div>

//           <div>
//             <label className="text-gray-400">Price per Slot</label>
//             <Input
//               placeholder="Price"
//               value={newRoom?.pricePerSlot}
//               onChange={(e) => handleInputChange(e, "pricePerSlot")}
//               className="border-2 text-gray-400 border-gray-100 text-focus:ring-green-500"
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default RoomTable;
import React, { Key, useState } from "react";
import { Modal, Button, Input } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useGetRoomsQuery } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure

export interface Room {
  id: Key | null | undefined;
  floorNo: number;
  roomNo: number;
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
  amenities: string[]; // Added amenities field
}

const RoomTable: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [editedRoom, setEditedRoom] = useState<Room | null>(null);
  const [newRoom, setNewRoom] = useState<Room>({
    id: null,
    floorNo: 0,
    roomNo: 0,
    _id: "",
    name: "",
    capacity: 0,
    pricePerSlot: 0,
    image: [""],
    amenities: [""], // Initialize new room with amenities
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
  const rooms = data?.data?.rooms || [];
  const totalPages = data?.data?.totalPages || 1;

  const showEditModal = (room: Room) => {
    setSelectedRoom(room);
    setEditedRoom(room);
    setIsEditModalVisible(true);
  };

  const showAddModal = () => {
    setNewRoom({
      id: null,
      floorNo: 0,
      roomNo: 0,
      _id: "",
      name: "",
      capacity: 0,
      pricePerSlot: 0,
      image: [""],
      amenities: [""], // Reset amenities field
    });
    setIsAddModalVisible(true);
  };

  const handleEditOk = () => {
    console.log("Updated room:", editedRoom);
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleAddOk = () => {
    console.log("Added new room:", newRoom);
    setIsAddModalVisible(false);
  };

  const handleAddCancel = () => {
    setIsAddModalVisible(false);
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

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedRoom({
      ...editedRoom,
      [field]: e.target.value,
    } as Room);
  };

  const handleAddInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewRoom({
      ...newRoom,
      [field]: e.target.value,
    } as Room);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading rooms.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-green-600 font-bold">Rooms List</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={showAddModal}
        >
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
                  className="text-green-500"
                  onClick={() => showEditModal(room)}
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
          className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 ${
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
      {editedRoom && (
        <Modal
          title={
            <h2 className="text-green-600 text-center text-xl font-semibold">
              Update Meeting Room
            </h2>
          }
          visible={isEditModalVisible}
          onOk={handleEditOk}
          onCancel={handleEditCancel}
          footer={[
            <div className="flex justify-center mt-4 space-x-4" key="footer">
              <Button
                key="cancel"
                onClick={handleEditCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black"
              >
                Cancel
              </Button>
              <Button
                key="submit"
                onClick={handleEditOk}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                Update Room
              </Button>
            </div>,
          ]}
        >
          <div className="space-y-8 pl-6 pr-6">
            <div>
              <label className="text-gray-400">Room Name</label>
              <Input
                placeholder="Room Name"
                value={editedRoom.name}
                onChange={(e) => handleEditInputChange(e, "name")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-400">Image URL</label>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Image URL"
                  value={editedRoom.image?.[0]}
                  onChange={(e) => handleEditInputChange(e, "image")}
                  className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400">Room Number</label>
                <Input
                  placeholder="Room Number"
                  value={editedRoom.roomNo}
                  onChange={(e) => handleEditInputChange(e, "roomNo")}
                  className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-gray-400">Floor Number</label>
                <Input
                  placeholder="Floor Number"
                  value={editedRoom.floorNo}
                  onChange={(e) => handleEditInputChange(e, "floorNo")}
                  className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400">Capacity</label>
                <Input
                  placeholder="Capacity"
                  value={editedRoom.capacity}
                  onChange={(e) => handleEditInputChange(e, "capacity")}
                  className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-gray-400">Price Per Slot</label>
                <Input
                  placeholder="Price Per Slot"
                  value={editedRoom.pricePerSlot}
                  onChange={(e) => handleEditInputChange(e, "pricePerSlot")}
                  className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="text-gray-400">Amenities</label>
              <Input
                placeholder="Enter amenities, separated by commas"
                value={editedRoom.amenities.join(", ")}
                onChange={(e) => handleEditInputChange(e, "amenities")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>
          </div>
        </Modal>
      )}

      {/* Add Room Modal */}
      <Modal
        title={
          <h2 className="text-green-600 text-center text-xl font-semibold">
            Add New Meeting Room
          </h2>
        }
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        footer={[
          <div className="flex justify-center mt-4 space-x-4" key="footer">
            <Button
              key="cancel"
              onClick={handleAddCancel}
              className="bg-gray-300 hover:bg-gray-400 text-black"
            >
              Cancel
            </Button>
            <Button
              key="submit"
              onClick={handleAddOk}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Add Room
            </Button>
          </div>,
        ]}
      >
        <div className="space-y-8 pl-6 pr-6">
          <div>
            <label className="text-gray-400">Room Name</label>
            <Input
              placeholder="Room Name"
              value={newRoom.name}
              onChange={(e) => handleAddInputChange(e, "name")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-1 text-gray-400">Image URL</label>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Image URL"
                value={newRoom.image?.[0]}
                onChange={(e) => handleAddInputChange(e, "image")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400">Room Number</label>
              <Input
                placeholder="Room Number"
                value={newRoom.roomNo}
                onChange={(e) => handleAddInputChange(e, "roomNo")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-gray-400">Floor Number</label>
              <Input
                placeholder="Floor Number"
                value={newRoom.floorNo}
                onChange={(e) => handleAddInputChange(e, "floorNo")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-gray-400">Capacity</label>
              <Input
                placeholder="Capacity"
                value={newRoom.capacity}
                onChange={(e) => handleAddInputChange(e, "capacity")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="text-gray-400">Price Per Slot</label>
              <Input
                placeholder="Price Per Slot"
                value={newRoom.pricePerSlot}
                onChange={(e) => handleAddInputChange(e, "pricePerSlot")}
                className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <label className="text-gray-400">Amenities</label>
            <Input
              placeholder="Enter amenities, separated by commas"
              value={newRoom.amenities.join(", ")}
              onChange={(e) => handleAddInputChange(e, "amenities")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RoomTable;
