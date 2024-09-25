



/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Modal, Input, DatePicker, TimePicker, Select, Spin} from "antd";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import {
  useGetAllSlotsQuery,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
  useAddSlotMutation,
} from "../../../redux/features/slotsApi"; 
import "../../../styles/sidebar.css";

interface Slot {
  _id: string;
  room: { name: string };
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: boolean;
}


const ITEMS_PER_PAGE = 9;

const SlotTable: React.FC = () => {
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [editedSlot, setEditedSlot] = useState<Slot | null>(null);
  const [newSlot, setNewSlot] = useState<Slot>({
    _id: "",
    room: { name: "" },
    date: "",
    startTime: "",
    endTime: "",
    isBooked: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, refetch } = useGetAllSlotsQuery({});
  const [deleteSlot] = useDeleteSlotMutation();
  const [updateSlot] = useUpdateSlotMutation();
  const [addSlot] = useAddSlotMutation();

  // const slots = Array.isArray(data)? data : [];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const slots = data?.data || [];

  const totalPages = Math.ceil(slots.length / ITEMS_PER_PAGE);

  const paginatedSlots = slots.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  console.log(paginatedSlots);

  const showEditModal = (slot: Slot) => {
    setSelectedSlot(slot);
    setEditedSlot(slot);
    setIsEditModalVisible(true);
  };

  const showAddModal = () => {
    setNewSlot({
      _id: "",
      room: { name: "" },
      date: dayjs().format("YYYY-MM-DD"),
      startTime: "",
      endTime: "",
      isBooked: false,
    });
    setIsAddModalVisible(true);
  };

  // const handleEditOk = async () => {
  //   if (editedSlot && editedSlot._id) {
  //     try {

  //       const response = await updateSlot({
  //         id: editedSlot._id,
  //         slot: editedSlot,
  //       });

  //       if ("error" in response) {
  //         Swal.fire("Error!", "Failed to update slot.", "error");
  //       } else {

  //         refetch();
  //         Swal.fire("Updated!", "The slot has been updated.", "success");
  //         setIsEditModalVisible(false);
  //       }
  //     } catch (error) {
  //       console.error("Update error:", error);
  //       Swal.fire("Error!", "Something went wrong.", "error");
  //     }
  //   } else {
  //     Swal.fire("Error!", "Invalid slot ID.", "error");
  //   }
  // };
  const handleEditOk = async () => {
    if (editedSlot && editedSlot._id) {
      try {
        const response = await updateSlot({
          id: editedSlot._id,
          slot: editedSlot,
        });

        if ("error" in response) {
          Swal.fire({
            title: "Error!",
            text: "Failed to update slot.",
            icon: "error",
            confirmButtonColor: "#d33", // Red color for error modal
          });
        } else {
          refetch(); // Refresh data
          Swal.fire({
            title: "Updated!",
            text: "The slot has been updated.",
            icon: "success",
            confirmButtonColor: "#22C55E", // Green color for success modal
          });
          setIsEditModalVisible(false);
        }
      } catch (error) {
        console.error("Update error:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong.",
          icon: "error",
          confirmButtonColor: "#d33", // Red color for error modal
        });
      }
    } else {
      Swal.fire({
        title: "Error!",
        text: "Invalid slot ID.",
        icon: "error",
        confirmButtonColor: "#d33", // Red color for error modal
      });
    }
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
  };
  // const handleAddOk = async () => {
  //   try {
  //     const response = await addSlot(newSlot); // Call to addSlot mutation
  //     if ("error" in response) {
  //       Swal.fire("Error!", "Failed to add slot.", "error");
  //     } else {
  //       refetch(); // Refresh data
  //       Swal.fire("Added!", "The slot has been added.", "success");
  //       setIsAddModalVisible(false);
  //     }
  //   } catch (error) {
  //     console.error("Add error:", error);
  //     Swal.fire("Error!", "Something went wrong.", "error");
  //   }
  // };
  const handleAddOk = async () => {
    try {
      const response = await addSlot(newSlot); // Call to addSlot mutation
      if ("error" in response) {
        Swal.fire({
          title: "Error!",
          text: "Failed to add slot.",
          icon: "error",
          confirmButtonColor: "#d33", // Red color for error modal
        });
      } else {
        refetch(); // Refresh data
        Swal.fire({
          title: "Added!",
          text: "The slot has been added.",
          icon: "success",
          confirmButtonColor: "#22C55E", // Green color for success modal
        });
        setIsAddModalVisible(false);
      }
    } catch (error) {
      console.error("Add error:", error);
      Swal.fire({
        title: "Error!",
        text: "Something went wrong.",
        icon: "error",
        confirmButtonColor: "#d33", // Red color for error modal
      });
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
  const handleDateChange = (date: dayjs.Dayjs | null, field: string) => {
    if (date) {
      const dateString = date.format("YYYY-MM-DD");
      setEditedSlot((prev) => (prev ? { ...prev, [field]: dateString } : prev));
      setNewSlot((prev) => ({ ...prev, [field]: dateString }));
    }
  };

  const handleTimeChange = (time: dayjs.Dayjs | null, field: string) => {
    if (time) {
      const timeString = time.format("HH:mm");
      setEditedSlot((prev) => (prev ? { ...prev, [field]: timeString } : prev));
      setNewSlot((prev) => ({ ...prev, [field]: timeString }));
    } else {
      // Handle case where time is null (if you want to clear the time)
      setEditedSlot((prev) => (prev ? { ...prev, [field]: "" } : prev));
      setNewSlot((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // const handleDateChange = (
  //   date: dayjs.Dayjs | null,
  //   dateString: string,
  //   field: string
  // ) => {
  //   if (date) {
  //     setEditedSlot({
  //       ...editedSlot,
  //       [field]: dateString,
  //     } as Slot);
  //     setNewSlot({
  //       ...newSlot,
  //       [field]: dateString,
  //     } as Slot);
  //   }
  // };

  // const handleDeleteSlot = (slotId: string) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#22C55E",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteSlot(slotId)
  //         .then((response) => {
  //           if (response.error) {
  //             Swal.fire("Error!", "Failed to delete slot.", "error");
  //           } else {
  //             refetch(); // Refresh data
  //             Swal.fire("Deleted!", "The slot has been deleted.", "success");
  //           }
  //         })
  //         .catch((error) => {
  //           console.error("Delete error:", error);
  //           Swal.fire("Error!", "Something went wrong.", "error");
  //         });
  //     }
  //   });
  // };
  const handleDeleteSlot = (slotId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#22C55E", // Green color for confirm button
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSlot(slotId)
          .then((response) => {
            if (response.error) {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete slot.",
                icon: "error",
                confirmButtonColor: "#d33", // Red color for error modal
              });
            } else {
              refetch(); // Refresh data
              Swal.fire({
                title: "Deleted!",
                text: "The slot has been deleted.",
                icon: "success",
                confirmButtonColor: "#22C55E", // Green color for success modal
              });
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
              confirmButtonColor: "#d33", // Red color for error modal
            });
          });
      }
    });
  };

   if (isLoading)
     return (
       <div className="flex justify-center items-center h-screen ">
         <Spin className="dot-spinner" size="large" />
       </div>
     );
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
          {slots.map((slot: Slot, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{slot?.room?.name}</td>
              <td className="py-2 px-4 border-b">
                {dayjs(slot.date).format("YYYY-MM-DD")}
              </td>
              <td className="py-2 px-4 border-b">{slot.startTime}</td>
              <td className="py-2 px-4 border-b">{slot.endTime}</td>
              <td className="py-2 px-4 border-b">
                {slot.isBooked ? "True" : "False"}
              </td>
              <td className="py-2 px-4 border-b space-x-4 items-center">
                <button
                  className="text-green-500"
                  onClick={() => showEditModal(slot)}
                >
                  <MdEditSquare className="text-xl" />
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDeleteSlot(slot._id)}
                >
                  <RiDeleteBack2Fill className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Edit Modal */}
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
        <h1 className="text-center text-green-500 text-xl font-bold">
          Update Slot
        </h1>
        {editedSlot && (
          <div className="pl-4 pr-4">
            <div className="mb-4 ">
              <label className="block mb-1 text-green-600">Room Name</label>
              <Input
                value={editedSlot.room.name}
                onChange={(e) => handleEditInputChange(e, "room")}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-green-600">Date</label>
              <DatePicker
                value={dayjs(editedSlot.date)}
                format="YYYY-MM-DD"
                onChange={
                  (date) => handleDateChange(date, "date") //dateString,
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-green-600">Start Time</label>
              <TimePicker
                value={dayjs(editedSlot.startTime, "HH:mm")}
                format="HH:mm"
                onChange={
                  (time) => handleDateChange(time, "startTime") //, timeString
                }
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-green-600">End Time</label>
              <TimePicker
                value={dayjs(editedSlot.endTime, "HH:mm")}
                format="HH:mm"
                onChange={(time) => handleDateChange(time, "endTime")}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-green-600">Booked</label>
              <Select
                value={editedSlot.isBooked ? "true" : "false"}
                onChange={(value) =>
                  setEditedSlot({
                    ...editedSlot,
                    isBooked: value === "true",
                  } as Slot)
                }
              >
                <Select.Option value="true">True</Select.Option>
                <Select.Option value="false">False</Select.Option>
              </Select>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title="Add Slot"
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
        <div>
          <div className="mb-4">
            <label className="block mb-1 text-green-600">Room Name</label>
            <Input
              value={newSlot.room.name}
              onChange={(e) => handleAddInputChange(e, "room")}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-green-600">Date</label>
            <DatePicker
              value={dayjs(newSlot.date)}
              onChange={(date) => handleDateChange(date, "date")}
              placeholder="Select Date"
              className="w-full my-4"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-green-600">Start Time</label>
            <TimePicker
              value={
                newSlot.startTime ? dayjs(newSlot.startTime, "HH:mm") : null
              }
              format="HH:mm"
              onChange={(time) => handleTimeChange(time, "startTime")}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-green-600">End Time</label>
            <TimePicker
              value={newSlot.endTime ? dayjs(newSlot.endTime, "HH:mm") : null}
              format="HH:mm"
              onChange={(time) => handleTimeChange(time, "endTime")}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-green-600">Booked</label>
            <Select
              value={newSlot.isBooked ? "true" : "false"}
              onChange={(value) =>
                setNewSlot((prev) => ({
                  ...prev,
                  isBooked: value === "true",
                }))
              }
            >
              <Select.Option value="true">True</Select.Option>
              <Select.Option value="false">False</Select.Option>
            </Select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SlotTable;
