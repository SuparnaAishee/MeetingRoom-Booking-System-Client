/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Modal, Input, DatePicker, TimePicker, Switch } from "antd";

import { MdEditSquare } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import dayjs from "dayjs";
import { useGetAllSlotsQuery } from "../../../redux/features/slotsApi"; // Adjust the import path based on your project structure
import "../../../styles/sidebar.css"
interface Slot {
  room: { name: string }; // Adjusted to match the populated data structure
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
  isDeleted?: boolean;
}

const ITEMS_PER_PAGE = 9;

const SlotTable: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [editedSlot, setEditedSlot] = useState<Slot | null>(null);
  const [newSlot, setNewSlot] = useState<Slot>({
    room: { name: "" },
    date: "",
    startTime: "",
    endTime: "",
    isBooked: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError } = useGetAllSlotsQuery();
  const slots = Array.isArray(data) ? data : []; 
  const totalPages = Math.ceil(slots.length / ITEMS_PER_PAGE);

  
  const paginatedSlots = slots.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const showEditModal = (slot: Slot) => {
    setSelectedSlot(slot);
    setEditedSlot(slot);
    setIsEditModalVisible(true);
  };

  const showAddModal = () => {
    setNewSlot({
      room: { name: "" },
      date: "",
      startTime: "",
      endTime: "",
      isBooked: false,
    });
    setIsAddModalVisible(true);
  };

  const handleEditOk = () => {
    console.log("Updated slot:", editedSlot);
    setIsEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleAddOk = () => {
    console.log("Added new slot:", newSlot);
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
    setEditedSlot({
      ...editedSlot,
      [field]: e.target.value,
    } as Slot);
  };

  const handleAddInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewSlot({
      ...newSlot,
      [field]: e.target.value,
    } as Slot);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDateChange = (date: any, dateString: string, field: string) => {
    setEditedSlot({
      ...editedSlot,
      [field]: dateString, // Store the formatted date string
    } as Slot);
    setNewSlot({
      ...newSlot,
      [field]: dateString, // Store the formatted date string
    } as Slot);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading slots.</div>;

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-green-600 font-bold">Slots Management</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={showAddModal}
        >
          Add Slot
        </button>
      </div>

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">Room</th>
            <th className="py-2 px-4 border-b text-left">Date</th>
            <th className="py-2 px-4 border-b text-left">Start Time</th>
            <th className="py-2 px-4 border-b text-left">End Time</th>
            <th className="py-2 px-4 border-b text-left">Booked</th>
            <th className="py-2 px-4 border-b text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((slot: Slot, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{slot?.room?.name}</td>{" "}
              {/* Show room name */}
              <td className="py-2 px-4 border-b">
                {dayjs(slot.date).format("YYYY-MM-DD")}
              </td>
              <td className="py-2 px-4 border-b">{slot.startTime}</td>
              <td className="py-2 px-4 border-b">{slot.endTime}</td>
              <td className="py-2 px-4 border-b">
                {slot.isBooked ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b space-x-4 items-center">
                <button
                  className="text-green-500"
                  onClick={() => showEditModal(slot)}
                >
                  <MdEditSquare className="text-xl" />
                </button>
                <button className="text-red-500">
                  <RiDeleteBack2Fill className="text-xl" />
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

      {/* Add Slot Modal */}
      <Modal
        title="Add Slot"
        visible={isAddModalVisible}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
        okButtonProps={{
          className: "bg-green-500 text-white hover:bg-green-600",
        }}
        cancelButtonProps={{
          className: "bg-gray-200 text-black hover:bg-gray-300",
        }}
        className="modal-green-theme" // Custom class for the modal
      >
        <h1 className="text-green-500 text-center text-2xl font-bold">
          Add New Slot
        </h1>
        <div className="space-y-8 pl-6 pr-6">
          <div>
            <label className="text-gray-600">Room</label>
            <Input
              placeholder="Room"
              value={newSlot.room.name}
              onChange={(e) => handleAddInputChange(e, "room")}
              className="border-2 border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-gray-600">Date</label>
            <DatePicker
              format="YYYY-MM-DD"
              value={newSlot.date ? dayjs(newSlot.date) : null}
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "date")
              }
              className="w-full border-2 border-green-500 ant-input"
            />
          </div>

          <div>
            <label className="text-gray-600">Start Time</label>
            <TimePicker
              format="HH:mm"
              value={
                newSlot.startTime ? dayjs(newSlot.startTime, "HH:mm") : null
              }
              onChange={(time, timeString) =>
                setNewSlot({ ...newSlot, startTime: timeString })
              }
              className="w-full border-2 border-green-500 ant-input"
            />
          </div>

          <div>
            <label className="text-gray-600">End Time</label>
            <TimePicker
              format="HH:mm"
              value={newSlot.endTime ? dayjs(newSlot.endTime, "HH:mm") : null}
              onChange={(time, timeString) =>
                setNewSlot({ ...newSlot, endTime: timeString })
              }
              className="w-full border-2 border-green-500 ant-input"
            />
          </div>

          <div>
            <label className="text-gray-600">Is Booked</label>
            <Switch
              checked={newSlot.isBooked}
              onChange={(checked) =>
                setNewSlot({ ...newSlot, isBooked: checked })
              }
              className="bg-green-500"
            />
          </div>
        </div>
      </Modal>

      {/* Edit Slot Modal */}
      <Modal
        visible={isEditModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
        okButtonProps={{
          className: "bg-green-500 text-white hover:bg-green-600",
        }}
        cancelButtonProps={{
          className: "bg-gray-200 text-black hover:bg-gray-300",
        }}
        className="modal-green-theme"
      >
        <h1 className="text-green-500 text-center text-2xl font-bold">
          Update Slot
        </h1>
        <div className="space-y-8 pl-6 pr-6">
          <div>
            <label className="text-gray-600">Room</label>
            <Input
              placeholder="Room"
              value={editedSlot?.room.name || ""}
              onChange={(e) => handleEditInputChange(e, "room")}
              className="border-2 border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="text-gray-600">Date</label>
            <DatePicker
              format="YYYY-MM-DD"
              value={editedSlot?.date ? dayjs(editedSlot.date) : null}
              onChange={(date, dateString) =>
                handleDateChange(date, dateString, "date")
              }
              className="w-full border-2 border-green-500"
            />
          </div>

          <div>
            <label className="text-gray-600">Start Time</label>
            <TimePicker
              format="HH:mm"
              value={
                editedSlot?.startTime
                  ? dayjs(editedSlot.startTime, "HH:mm")
                  : null
              }
              onChange={(time, timeString) =>
                setEditedSlot({ ...editedSlot, startTime: timeString })
              }
              className="w-full border-2 border-green-500"
            />
          </div>

          <div>
            <label className="text-gray-600">End Time</label>
            <TimePicker
              format="HH:mm"
              value={
                editedSlot?.endTime ? dayjs(editedSlot.endTime, "HH:mm") : null
              }
              onChange={(time, timeString) =>
                setEditedSlot({ ...editedSlot, endTime: timeString })
              }
              className="w-full border-2 border-green-500"
            />
          </div>

          <div>
            <label className="text-gray-600">Is Booked</label>
            <Switch
              checked={editedSlot?.isBooked || false}
              onChange={(checked) =>
                setEditedSlot({ ...editedSlot, isBooked: checked })
              }
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SlotTable;
