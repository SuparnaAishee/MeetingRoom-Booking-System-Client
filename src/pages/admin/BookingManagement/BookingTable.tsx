// import React, { Key, useState } from "react";
// import { DeleteFilled, EditFilled } from "@ant-design/icons";
// import { Modal, Form, Input, Select, Button } from "antd";
// import Swal from "sweetalert2";
// import {
//   useGetAllBookingsQuery,
//   useDeleteBookingMutation,
// } from "../../../redux/booking/bookingApi"; // Adjust the import path based on your project structure

// export interface Slot {
//   endTime: string;
//   startTime: string;
//   _id: string;
//   slotDetail: string;
// }

// export interface Room {
//   _id: string;
//   name: string;
// }

// export interface Booking {
//   isConfirmed: boolean;
//   totalAmount: number;
//   user: { name: string };
//   id: Key | null | undefined;
//   _id: string;
//   customerName: string;
//   room: Room;
//   date: string;
//   slots: Slot[];
//   price: number;
//   status: string;
// }

// const BookingTable: React.FC = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [form] = Form.useForm();

//   // Fetching bookings data using RTK Query
//   const { data, isLoading, isError } = useGetAllBookingsQuery({
//     page: currentPage,
//   });

//   // Setting up the delete booking mutation
//   const [deleteBooking] = useDeleteBookingMutation();

//   const totalPages = data?.data?.totalPages || 1;

//   // Handle delete booking
//   const handleDelete = async (bookingId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You will not be able to recover this booking!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (result.isConfirmed) {
//       try {
//         await deleteBooking(bookingId).unwrap();
//         Swal.fire("Deleted!", "Your booking has been deleted.", "success");
//       } catch (error) {
//         Swal.fire(
//           "Error!",
//           "There was an error deleting the booking.",
//           "error"
//         );
//       }
//     }
//   };

//   // Handle edit booking - open modal and populate with booking details
//   const handleEdit = (booking: Booking) => {
//     setSelectedBooking(booking);
//     form.setFieldsValue({
//       customerName: booking.user.name,
//       room: booking.room.name,
//       status: booking.isConfirmed ? "Confirmed" : "Pending",
//     });
//     setIsModalVisible(true);
//   };

//   // Handle modal submit - form submission to update the booking
//   const handleUpdate = () => {
//     form.validateFields().then((values) => {
//       console.log("Updated values:", values);
//       // Here you can dispatch the update action, e.g., an API call to update the booking
//       setIsModalVisible(false);
//     });
//   };

//   // Pagination controls
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

//   if (isLoading) return <div>Loading...</div>;
//   if (isError) return <div>Error loading bookings.</div>;

//   return (
//     <div className="p-4">
//       <div className="flex justify-between mb-4">
//         <h2 className="text-xl text-green-600 font-bold">Bookings List</h2>
//       </div>

//       <table className="min-w-full bg-white shadow-md rounded-lg">
//         <thead>
//           <tr>
//             <th className="py-2 px-4 border-b text-left">Customer Name</th>
//             <th className="py-2 px-4 border-b text-left">Room Name</th>
//             <th className="py-2 px-4 border-b text-left">Date</th>
//             <th className="py-2 px-4 border-b text-left">Slots</th>
//             <th className="py-2 px-4 border-b text-left">Price</th>
//             <th className="py-2 px-4 border-b text-left">Status</th>
//             <th className="py-2 px-4 border-b text-left">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data?.data?.map((booking: Booking) => (
//             <tr key={booking._id}>
//               <td className="py-2 px-4 border-b">{booking.user.name}</td>
//               <td className="py-2 px-4 border-b">{booking.room.name}</td>
//               <td className="py-2 px-4 border-b">{booking.date}</td>
//               <td className="py-2 px-4 border-b">
//                 {booking.slots.length > 0 ? (
//                   <div>
//                     {booking.slots
//                       .map((slot) => `${slot.startTime} - ${slot.endTime}`)
//                       .join(", ")}
//                   </div>
//                 ) : (
//                   <div>No slots</div>
//                 )}
//               </td>
//               <td className="py-2 px-4 border-b">${booking.totalAmount}</td>
//               <td className="py-2 px-4 border-b">
//                 {booking.isConfirmed }
//               </td>
//               <td className="py-2 px-4 border-b space-x-4">
//                 <button
//                   className="text-green-500"
//                   onClick={() => handleEdit(booking)}
//                 >
//                   <EditFilled className="text-xl" title="Edit" />
//                 </button>
//                 <button
//                   className="text-red-500"
//                   onClick={() => handleDelete(booking._id)}
//                 >
//                   <DeleteFilled className="text-xl" title="Delete" />
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

//       {/* Edit Booking Modal */}
//       <Modal
//         title="Edit Booking"
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         footer={[
//           <Button key="cancel" onClick={() => setIsModalVisible(false)}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleUpdate}>
//             Update
//           </Button>,
//         ]}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item label="Customer Name" name="customerName">
//             <Input disabled />
//           </Form.Item>
//           <Form.Item label="Room" name="room">
//             <Input disabled />
//           </Form.Item>
//           <Form.Item
//             label="Status"
//             name="status"
//             rules={[{ required: true, message: "Please select a status" }]}
//           >
//             <Select>
//               <Select.Option value="Confirmed">Confirmed</Select.Option>
//               <Select.Option value="Pending">Pending</Select.Option>
//               <Select.Option value="Canceled">Canceled</Select.Option>
//             </Select>
//           </Form.Item>
//         </Form>
//       </Modal>
//     </div>
//   );
// };

// export default BookingTable;
import React, { Key, useState } from "react";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Modal, Form, Input, Button, message, Select } from "antd";
import Swal from "sweetalert2";
import {
  useGetAllBookingsQuery,
  useDeleteBookingMutation,
  useUpdateBookingMutation,
} from "../../../redux/booking/bookingApi"; 

export interface Slot {
  endTime: string;
  startTime: string;
  _id: string;
  slotDetail: string;
}

export interface Room {
  _id: string;
  name: string;
}

export interface Booking {
  isConfirmed: boolean;
  totalAmount: number;
  user: { name: string };
  id: Key | null | undefined;
  _id: string;
  customerName: string;
  room: Room;
  date: string;
  slots: Slot[];
  price: number;
  status: string;
}

const BookingTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [form] = Form.useForm();
  const [isUpdating, setIsUpdating] = useState(false); 

  // Fetching bookings data
  const { data, isLoading, isError } = useGetAllBookingsQuery({
    page: currentPage,
  });


  const [deleteBooking] = useDeleteBookingMutation();
  const [updateBooking] = useUpdateBookingMutation();

  const totalPages = data?.data?.totalPages || 1;

 
  const handleDelete = async (bookingId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this booking!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22C55E",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBooking(bookingId).unwrap();
        Swal.fire("Deleted!", "Your booking has been deleted.", "success");
      } catch (error) {
        Swal.fire(
          "Error!",
          "There was an error deleting the booking.",
          "error"
        );
      }
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    form.setFieldsValue({
      customerName: booking.user.name,
      status: booking.isConfirmed ? "Confirmed" : "canceled",
    });
    setIsModalVisible(true);
  };

  const handleUpdate = async () => {
    try {
      setIsUpdating(true); 
      const values = await form.validateFields();

     
      const updatedBooking = {
        ...selectedBooking,
        isConfirmed: values.status === "Confirmed",
      };

    
      if (selectedBooking) {
        await updateBooking({
          bookingId: selectedBooking._id,
          updatedBooking,
        }).unwrap();

        
        setIsModalVisible(false);
        message.success("Booking updated successfully");
      }
    } catch (error) {
      message.error("Error updating booking");
    } finally {
      setIsUpdating(false); 
    }
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
  if (isError) return <div>Error loading bookings.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-green-600 font-bold">Bookings List</h2>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Customer Name</th>
            <th className="py-2 px-4 border-b text-left">Room Name</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Slots</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Status</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((booking: Booking) => (
            <tr key={booking._id}>
              <td className="py-2 px-4 border-b">{booking.user.name}</td>
              <td className="py-2 px-4 border-b">{booking.room.name}</td>
              <td className="py-2 px-4 border-b">{booking.date}</td>
              <td className="py-2 px-4 border-b">
                {booking.slots.length > 0 ? (
                  <div>
                    {booking.slots
                      .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                      .join(", ")}
                  </div>
                ) : (
                  <div>No slots</div>
                )}
              </td>
              <td className="py-2 px-4 border-b">${booking.totalAmount}</td>
              <td className="py-2 px-4 border-b">{booking.isConfirmed}</td>
              <td className="py-2 px-4 border-b space-x-4">
                <button
                  className="text-green-500"
                  onClick={() => handleEdit(booking)}
                >
                  <EditFilled className="text-xl" title="Edit" />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(booking._id)}
                >
                  <DeleteFilled className="text-xl" title="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Booking Modal */}
      <Modal
        title="Edit Booking"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isUpdating} // Use loading state here
            onClick={handleUpdate}
            style={{ backgroundColor: "#22C55E", borderColor: "#22C55E" }}
          >
            Update
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
         
        >
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[
              { required: true, message: "Please input the customer's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: "Please select the booking status!" },
            ]}
          >
            <Select style={{ borderColor: "#22C55E" }}>
              <Select.Option value="Canceled">Canceled</Select.Option>
              <Select.Option value="Confirmed">Confirmed</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <Button disabled={currentPage === 1} onClick={handlePrevPage}>
          Previous
        </Button>
        <Button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default BookingTable;
