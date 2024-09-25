
// import React, { Key, useState } from "react";
// import { Modal, Button, Input } from "antd";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
// import { useGetRoomsQuery } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure

// export interface Room {
//   id: Key | null | undefined;
//   floorNo: number;
//   roomNo: number;
//   _id: string;
//   name: string;
//   capacity: number;
//   pricePerSlot: number;
//   image: string[];
//   amenities: string[]; // Added amenities field
// }

// const RoomTable: React.FC = () => {
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
//   const [editedRoom, setEditedRoom] = useState<Room | null>(null);
//   const [newRoom, setNewRoom] = useState<Room>({
//     id: null,
//     floorNo: 0,
//     roomNo: 0,
//     _id: "",
//     name: "",
//     capacity: 0,
//     pricePerSlot: 0,
//     image: [""],
//     amenities: [""], // Initialize new room with amenities
//   });
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetching room data using RTK Query
//   const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
//   const rooms = data?.data?.rooms || [];
//   const totalPages = data?.data?.totalPages || 1;

//   const showEditModal = (room: Room) => {
//     setSelectedRoom(room);
//     setEditedRoom(room);
//     setIsEditModalVisible(true);
//   };

//   const showAddModal = () => {
//     setNewRoom({
//       id: null,
//       floorNo: 0,
//       roomNo: 0,
//       _id: "",
//       name: "",
//       capacity: 0,
//       pricePerSlot: 0,
//       image: [""],
//       amenities: [""], // Reset amenities field
//     });
//     setIsAddModalVisible(true);
//   };

//   const handleEditOk = () => {
//     console.log("Updated room:", editedRoom);
//     setIsEditModalVisible(false);
//     // Add your update API logic here
//   };

//   const handleEditCancel = () => {
//     setIsEditModalVisible(false);
//   };

//   const handleAddOk = () => {
//     console.log("Added new room:", newRoom);
//     setIsAddModalVisible(false);
//     // Add your add API logic here
//   };

//   const handleAddCancel = () => {
//     setIsAddModalVisible(false);
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

//   const handleEditInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setEditedRoom({
//       ...editedRoom,
//       [field]: e.target.value,
//     } as Room);
//   };

//   const handleAddInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: string
//   ) => {
//     setNewRoom({
//       ...newRoom,
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
//           onClick={showAddModal}
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
//                   className="text-green-500"
//                   onClick={() => showEditModal(room)}
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
//           className={`px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400 ${
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
//             <h2 className="text-green-600 text-center text-xl font-semibold">
//               Update Meeting Room
//             </h2>
//           }
//           visible={isEditModalVisible}
//           onOk={handleEditOk}
//           onCancel={handleEditCancel}
//           footer={[
//             <div className="flex justify-center mt-4 space-x-4" key="footer">
//               <Button
//                 key="cancel"
//                 onClick={handleEditCancel}
//                 className="bg-gray-300 hover:bg-gray-400 text-black"
//               >
//                 Cancel
//               </Button>
//               <Button
//                 key="submit"
//                 onClick={handleEditOk}
//                 className="bg-green-500 hover:bg-green-600 text-white"
//               >
//                 Update Room
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

//             <div className="flex flex-col">
//               <label className="mb-1 text-gray-400">Image URL</label>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   placeholder="Image URL"
//                   value={editedRoom.image?.[0]}
//                   onChange={(e) => handleEditInputChange(e, "image")}
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="text-gray-400">Room Number</label>
//                 <Input
//                   placeholder="Room Number"
//                   value={editedRoom.roomNo}
//                   onChange={(e) => handleEditInputChange(e, "roomNo")}
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//                 />
//               </div>

//               <div>
//                 <label className="text-gray-400">Floor Number</label>
//                 <Input
//                   placeholder="Floor Number"
//                   value={editedRoom.floorNo}
//                   onChange={(e) => handleEditInputChange(e, "floorNo")}
//                   className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-gray-400">Capacity</label>
//               <Input
//                 placeholder="Capacity"
//                 value={editedRoom.capacity}
//                 onChange={(e) => handleEditInputChange(e, "capacity")}
//                 className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//               />
//             </div>

//             <div>
//               <label className="text-gray-400">Price per Slot</label>
//               <Input
//                 placeholder="Price per Slot"
//                 value={editedRoom.pricePerSlot}
//                 onChange={(e) => handleEditInputChange(e, "pricePerSlot")}
//                 className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
//               />
//             </div>
//           </div>
//         </Modal>
//       )}

//       {/* Add Room Modal */}
//       <Modal
//         title="Add New Room"
//         visible={isAddModalVisible}
//         onOk={handleAddOk}
//         onCancel={handleAddCancel}
//         footer={[
//           <Button key="cancel" onClick={handleAddCancel}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleAddOk}>
//             Add Room
//           </Button>,
//         ]}
//       >
//         <div className="space-y-4">
//           <div>
//             <label>Room Name</label>
//             <Input
//               value={newRoom.name}
//               onChange={(e) => handleAddInputChange(e, "name")}
//             />
//           </div>
//           <div>
//             <label>Room Number</label>
//             <Input
//               value={newRoom.roomNo}
//               onChange={(e) => handleAddInputChange(e, "roomNo")}
//             />
//           </div>
//           <div>
//             <label>Floor Number</label>
//             <Input
//               value={newRoom.floorNo}
//               onChange={(e) => handleAddInputChange(e, "floorNo")}
//             />
//           </div>
//           <div>
//             <label>Capacity</label>
//             <Input
//               value={newRoom.capacity}
//               onChange={(e) => handleAddInputChange(e, "capacity")}
//             />
//           </div>
//           <div>
//             <label>Price per Slot</label>
//             <Input
//               value={newRoom.pricePerSlot}
//               onChange={(e) => handleAddInputChange(e, "pricePerSlot")}
//             />
//           </div>
//           <div>
//             <label>Image URL</label>
//             <Input
//               value={newRoom.image?.[0]}
//               onChange={(e) => handleAddInputChange(e, "image")}
//             />
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default RoomTable;
// import React, { useState } from "react";
// import { Modal, Button, Input } from "antd";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
// import Swal from "sweetalert2";
// import {
//   useGetRoomsQuery,
//   useDeleteRoomMutation,
//   useUpdateRoomMutation,
//   useAddRoomMutation,
// } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure

// export interface Room {
//   isDeleted: boolean;
//   id: string | null | undefined;
//   floorNo: number;
//   roomNo: number;
//   _id: string;
//   name: string;
//   capacity: number;
//   pricePerSlot: number;
//   image: string[];
//   amenities: string[];
// }

// const RoomTable: React.FC = () => {
//   const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//   const [isAddModalVisible, setIsAddModalVisible] = useState(false);
//   const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
//   const [editedRoom, setEditedRoom] = useState<Partial<Room> | null>(null);
//   const [newRoom, setNewRoom] = useState<Partial<Room>>({
//     floorNo: 0,
//     roomNo: 0,
//     name: "",
//     capacity: 0,
//     pricePerSlot: 0,
//     image: [""],
//     amenities: [""],
//   });
//   const [currentPage, setCurrentPage] = useState(1);

//   const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
//   const [deleteRoom] = useDeleteRoomMutation(); // Mutation for deleting a room
//   const [updateRoom] = useUpdateRoomMutation(); // Mutation for updating a room
//   const [addRoom] = useAddRoomMutation(); // Mutation for adding a room

//   const rooms = data?.data?.rooms || [];
//   const totalPages = data?.data?.totalPages || 1;

//   const showEditModal = (room: Room) => {
//     setSelectedRoom(room);
//     setEditedRoom({ ...room });
//     setIsEditModalVisible(true);
//   };

//   const showAddModal = () => {
//     setNewRoom({
//       floorNo: 0,
//       roomNo: 0,
//       name: "",
//       capacity: 0,
//       pricePerSlot: 0,
//       image: [""],
//       amenities: [""],
//     });
//     setIsAddModalVisible(true);
//   };

//   const handleEditOk = async () => {
//     if (editedRoom && editedRoom._id) {
//       try {
//         await updateRoom(editedRoom).unwrap();
//         setIsEditModalVisible(false);
//         Swal.fire("Updated!", "The room has been updated.", "success");
//       } catch (error) {
//         Swal.fire("Error!", "There was a problem updating the room.", "error");
//         console.error("Update operation failed:", error);
//       }
//     }
//   };

//   const handleEditCancel = () => {
//     setIsEditModalVisible(false);
//   };

//   const handleAddOk = async () => {
//     try {
//       await addRoom(newRoom).unwrap();
//       setIsAddModalVisible(false);
//       Swal.fire("Added!", "The room has been added.", "success");
//     } catch (error) {
//       Swal.fire("Error!", "There was a problem adding the room.", "error");
//       console.error("Add operation failed:", error);
//     }
//   };

//   const handleAddCancel = () => {
//     setIsAddModalVisible(false);
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

//   const handleEditInputChange = (
    
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof Room
//   ) => {
//     if (editedRoom) {
//       setEditedRoom({
//         ...editedRoom,
//         [field]:
//           field === "image" || field === "amenities"
//             ? e.target.value.split(",").map((item) => item.trim())
//             : e.target.value,
//       });
//     }
//   };

//   const handleAddInputChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     field: keyof Room
//   ) => {
//     setNewRoom({
//       ...newRoom,
//       [field]:
//         field === "image" || field === "amenities"
//           ? e.target.value.split(",").map((item) => item.trim())
//           : e.target.value,
//     });
//   };

//   const handleDelete = async (roomId: string) => {
//     if (!/^[0-9a-fA-F]{24}$/.test(roomId)) {
//       console.error("Invalid ID format:", roomId);
//       Swal.fire("Error!", "Invalid Room ID format.", "error");
//       return;
//     }

//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteRoom(roomId).unwrap();
//         Swal.fire("Deleted!", "The room has been deleted.", "success");
//       } catch (error) {
//         console.error("Delete operation failed:", error);
//         Swal.fire("Error!", "There was a problem deleting the room.", "error");
//       }
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading rooms.</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl text-green-600 font-bold">Rooms List</h2>
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//           onClick={showAddModal}
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
//             <th className="py-2 px-4 border-b text-left">isDeleted</th>
//             <th className="py-2 px-4 border-b text-left">Price</th>
//             <th className="py-2 px-4 border-b text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rooms.map((room: Room) => (
//             <tr key={room._id}>
//               <td className="py-2 px-4 border-b">{room.name}</td>
//               <td className="py-2 px-4 border-b">
//                 <img
//                   src={
//                     room.image.length > 0
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
//               <td className="py-2 px-4 border-b">
//                 {room.isDeleted ? "true" : "false"}
//               </td>
//               <td className="py-2 px-4 border-b">${room.pricePerSlot}</td>
//               <td className="py-2 px-4 border-b space-x-4">
//                 <button
//                   className="text-green-500"
//                   onClick={() => showEditModal(room)}
//                 >
//                   <EditFilled className="text-xl" />
//                 </button>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDelete(room._id)}
//                 >
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
//           className={`px-4 py-2 bg-gray-200 border rounded-l-lg ${
//             currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <button
//           className={`px-4 py-2 bg-gray-200 border rounded-r-lg ${
//             currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Edit Room Modal */}
//       <Modal
//         title="Edit Room"
//         visible={isEditModalVisible}
//         onOk={handleEditOk}
//         onCancel={handleEditCancel}
//       >
//         <Input
//           placeholder="Name"
//           value={editedRoom?.name || ""}
//           onChange={(e) => handleEditInputChange(e, "name")}
//         />
//         <Input
//           placeholder="Floor No"
//           value={editedRoom?.floorNo || 0}
//           type="number"
//           onChange={(e) => handleEditInputChange(e, "floorNo")}
//         />
//         <Input
//           placeholder="Room No"
//           value={editedRoom?.roomNo || 0}
//           type="number"
//           onChange={(e) => handleEditInputChange(e, "roomNo")}
//         />
//         <Input
//           placeholder="Capacity"
//           value={editedRoom?.capacity || 0}
//           type="number"
//           onChange={(e) => handleEditInputChange(e, "capacity")}
//         />
//         <Input
//           placeholder="Price per Slot"
//           value={editedRoom?.pricePerSlot || 0}
//           type="number"
//           onChange={(e) => handleEditInputChange(e, "pricePerSlot")}
//         />
//         <Input
//           placeholder="Images (comma separated URLs)"
//           value={editedRoom?.image?.join(", ") || ""}
//           onChange={(e) => handleEditInputChange(e, "image")}
//         />
//         <Input
//           placeholder="Amenities (comma separated)"
//           value={editedRoom?.amenities?.join(", ") || ""}
//           onChange={(e) => handleEditInputChange(e, "amenities")}
//         />
//       </Modal>

//       {/* Add Room Modal */}
//       <Modal
//         title="Add Room"
//         visible={isAddModalVisible}
//         onOk={handleAddOk}
//         onCancel={handleAddCancel}
//       >
//         <Input
//           placeholder="Name"
//           value={newRoom?.name || ""}
//           onChange={(e) => handleAddInputChange(e, "name")}
//         />
//         <Input
//           placeholder="Floor No"
//           value={newRoom?.floorNo || 0}
//           type="number"
//           onChange={(e) => handleAddInputChange(e, "floorNo")}
//         />
//         <Input
//           placeholder="Room No"
//           value={newRoom?.roomNo || 0}
//           type="number"
//           onChange={(e) => handleAddInputChange(e, "roomNo")}
//         />
//         <Input
//           placeholder="Capacity"
//           value={newRoom?.capacity || 0}
//           type="number"
//           onChange={(e) => handleAddInputChange(e, "capacity")}
//         />
//         <Input
//           placeholder="Price per Slot"
//           value={newRoom?.pricePerSlot || 0}
//           type="number"
//           onChange={(e) => handleAddInputChange(e, "pricePerSlot")}
//         />
//         <Input
//           placeholder="Images (comma separated URLs)"
//           value={newRoom?.image?.join(", ") || ""}
//           onChange={(e) => handleAddInputChange(e, "image")}
//         />
//         <Input
//           placeholder="Amenities (comma separated)"
//           value={newRoom?.amenities?.join(", ") || ""}
//           onChange={(e) => handleAddInputChange(e, "amenities")}
//         />
//       </Modal>
//     </div>
//   );
// };

// export default RoomTable;
import React, { useState } from "react";
import { Modal, Input, Form, Spin } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useGetRoomsQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
  useAddRoomMutation,
} from "../../../redux/features/roomsApi";

export interface Room {
  isDeleted: boolean;
  id: string | null | undefined;
  floorNo: number;
  roomNo: number;
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
  amenities: string[];
}

const RoomTable: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [editedRoom, setEditedRoom] = useState<Partial<Room> | null>(null);
  const [newRoom, setNewRoom] = useState<Partial<Room>>({
    floorNo: 0,
    roomNo: 0,
    name: "",
    capacity: 0,
    pricePerSlot: 0,
    image: [""],
    amenities: [""],
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetRoomsQuery({ page: currentPage });
  const [deleteRoom] = useDeleteRoomMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [addRoom] = useAddRoomMutation();

  const rooms = data?.data?.rooms || [];
  const totalPages = data?.data?.totalPages || 1;

  const showEditModal = (room: Room) => {
    setSelectedRoom(room);
    setEditedRoom({ ...room });
    setIsEditModalVisible(true);
  };

  const showAddModal = () => {
    setNewRoom({
      floorNo: 0,
      roomNo: 0,
      name: "",
      capacity: 0,
      pricePerSlot: 0,
      image: [""],
      amenities: [""],
    });
    setIsAddModalVisible(true);
  };

  const handleEditOk = async () => {
    if (editedRoom && editedRoom._id) {
      try {
        await updateRoom({ roomId: editedRoom._id, ...editedRoom }).unwrap();
        setIsEditModalVisible(false);
        Swal.fire({
          title: "Updated!",
          text: "The room has been updated.",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was a problem updating the room.",
          icon: "error",
          confirmButtonColor: "#d33",
        });
        console.error("Update operation failed:", error);
      }
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleAddOk = async () => {
    try {
      await addRoom(newRoom).unwrap();
      setIsAddModalVisible(false);
      Swal.fire({
        title: "Added!",
        text: "The room has been added.",
        icon: "success",
        confirmButtonColor: "#28a745",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "There was a problem adding the room.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
      console.error("Add operation failed:", error);
    }
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
    field: keyof Room
  ) => {
    const value =
      field === "image" || field === "amenities"
        ? e.target.value.split(",").map((item) => item.trim())
        : e.target.value;

    setEditedRoom({
      ...editedRoom,
      [field]:
        field === "floorNo" ||
        field === "roomNo" ||
        field === "capacity" ||
        field === "pricePerSlot"
          ? Number(value)
          : value,
    });
  };

  const handleAddInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Room
  ) => {
    const value =
      field === "image" || field === "amenities"
        ? e.target.value.split(",").map((item) => item.trim())
        : e.target.value;

    setNewRoom({
      ...newRoom,
      [field]:
        field === "floorNo" ||
        field === "roomNo" ||
        field === "capacity" ||
        field === "pricePerSlot"
          ? Number(value)
          : value,
    });
  };

  const handleDelete = async (roomId: string) => {
    if (!/^[0-9a-fA-F]{24}$/.test(roomId)) {
      console.error("Invalid ID format:", roomId);
      Swal.fire("Error!", "Invalid Room ID format.", "error");
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteRoom(roomId);
        Swal.fire({
          title: "Deleted!",
          text: "The room has been deleted.",
          icon: "success",
          confirmButtonColor: "#28a745",
        });
      } catch (error) {
        Swal.fire("Error!", "There was a problem deleting the room.", "error");
        console.error("Delete operation failed:", error);
      }
    }
  };

   if (isLoading)
     return (
       <div className="flex justify-center items-center h-screen ">
         <Spin className="dot-spinner" size="large" />
       </div>
     );
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
            <th className="py-2 px-4 border-b text-left">isDeleted</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room: Room) => (
            <tr key={room._id}>
              <td className="py-2 px-4 border-b">{room.name}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={
                    room.image.length > 0
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
              <td className="py-2 px-4 border-b">
                {room.isDeleted ? "true" : "false"}
              </td>
              <td className="py-2 px-4 border-b">${room.pricePerSlot}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="text-green-500 hover:text-green-700 mr-2"
                  onClick={() => showEditModal(room)}
                >
                  <EditFilled className="text-lg" />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(room._id)}
                >
                  <DeleteFilled className="text-lg" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-4 mt-4">
        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-300  px-4 py-2 rounded hover:bg-gray-400"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <Modal
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okButtonProps={{
          style: {
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            color: "#fff",
          },
        }}
        cancelButtonProps={{
          style: {
            borderColor: "#4CAF50",
            color: "#000000",
          },
        }}
      >
        <h1 className="text-xl font-bold text-green-500 text-center pb-4">
          Update Room
        </h1>
        <Form className="pl-4 pr-4">
          <Form.Item>
            <label className="text-green-600">Room No</label>
            <Input
              value={editedRoom?.name}
              onChange={(e) => handleEditInputChange(e, "name")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Floor No</label>
            <Input
              type="number"
              value={editedRoom?.floorNo}
              onChange={(e) => handleEditInputChange(e, "floorNo")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Room No</label>
            <Input
              type="number"
              value={editedRoom?.roomNo}
              onChange={(e) => handleEditInputChange(e, "roomNo")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Capacity</label>
            <Input
              type="number"
              value={editedRoom?.capacity}
              onChange={(e) => handleEditInputChange(e, "capacity")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Price Per Slot</label>
            <Input
              type="number"
              value={editedRoom?.pricePerSlot}
              onChange={(e) => handleEditInputChange(e, "pricePerSlot")}
            />
          </Form.Item>
          {/* <Form.Item>
            <label className="text-green-600">
              Image URLs (comma-separated)
            </label>
            <Input
              value={editedRoom?.image.join(", ")}
              onChange={(e) => handleEditInputChange(e, "image")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Amenities</label>
            <Input
              value={editedRoom?.amenities.join(", ")}
              onChange={(e) => handleEditInputChange(e, "amenities")}
            />
          </Form.Item> */}
          <Form.Item>
            <label className="text-green-600">
              Image URLs (comma-separated)
            </label>
            <Input
              value={editedRoom?.image?.join(", ") ?? ""} // Add fallback for undefined
              onChange={(e) => handleEditInputChange(e, "image")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Amenities</label>
            <Input
              value={editedRoom?.amenities?.join(", ") ?? ""} // Add fallback for undefined
              onChange={(e) => handleEditInputChange(e, "amenities")}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        okButtonProps={{
          style: {
            backgroundColor: "#4CAF50",
            borderColor: "#4CAF50",
            color: "#fff",
          },
        }}
        cancelButtonProps={{
          style: {
            borderColor: "#4CAF50",
            color: "#000000",
          },
        }}
      >
        <h1 className="text-center font-bold text-green-500 text-xl pb-4">
          Add Room
        </h1>
        <Form>
          <Form.Item>
            <label className="text-green-600">Room Name</label>
            <Input
              value={newRoom.name}
              onChange={(e) => handleAddInputChange(e, "name")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Floor No</label>
            <Input
              type="number"
              value={newRoom.floorNo}
              onChange={(e) => handleAddInputChange(e, "floorNo")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Room No</label>
            <Input
              type="number"
              value={newRoom.roomNo}
              onChange={(e) => handleAddInputChange(e, "roomNo")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Capacity</label>
            <Input
              type="number"
              value={newRoom.capacity}
              onChange={(e) => handleAddInputChange(e, "capacity")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Price</label>
            <Input
              type="number"
              value={newRoom.pricePerSlot}
              onChange={(e) => handleAddInputChange(e, "pricePerSlot")}
            />
          </Form.Item>
          {/* <Form.Item>
            <label className="text-green-600">
              Image URLs (comma-separated)
            </label>
            <Input
              value={newRoom.image.join(", ")}
              onChange={(e) => handleAddInputChange(e, "image")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Amenities</label>
            <Input
              value={newRoom.amenities.join(", ")}
              onChange={(e) => handleAddInputChange(e, "amenities")}
            />
          </Form.Item> */}
          <Form.Item>
            <label className="text-green-600">
              Image URLs (comma-separated)
            </label>
            <Input
              value={newRoom.image?.join(", ") ?? ""} // Handle undefined case
              onChange={(e) => handleAddInputChange(e, "image")}
            />
          </Form.Item>
          <Form.Item>
            <label className="text-green-600">Amenities</label>
            <Input
              value={newRoom.amenities?.join(", ") ?? ""} // Handle undefined case
              onChange={(e) => handleAddInputChange(e, "amenities")}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default RoomTable;
