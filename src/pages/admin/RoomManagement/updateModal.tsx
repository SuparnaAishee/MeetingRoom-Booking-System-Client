import React, { useState } from "react";
import { Modal, Button, Input, message } from "antd";
import { z } from "zod";
import { useUpdateRoomMutation } from "../../../redux/features/roomsApi"; // Adjust the import path based on your project structure
import { Room } from "./RoomTable"; // Adjust the import path based on your project structure

// Define Zod validation schema
const roomSchema = z.object({
  name: z.string().min(1, "Room Name is required"),
  image: z.array(z.string().url("Invalid Image URL")),
  roomNo: z.string().min(1, "Room Number is required"),
  floorNo: z.string().min(1, "Floor Number is required"),
  capacity: z.number().min(1, "Capacity must be greater than 0"),
  pricePerSlot: z.number().min(0, "Price must be non-negative"),
});

interface UpdateModalProps {
  visible: boolean;
  room: Room | null;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Room) => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({
  visible,
  room,
  onCancel,
  onChange,
}) => {
  const [errors, setErrors] = useState<{ [key in keyof Room]?: string }>({});
  const [updateRoom, { isLoading }] = useUpdateRoomMutation(); // Use the mutation

  const handleUpdate = async () => {
    if (!room) return;

    try {
      roomSchema.parse(room); // Validate data against the schema
      await updateRoom(room).unwrap(); // Proceed to update room and wait for the promise to resolve
      setErrors({}); // Clear errors if validation passes
      message.success("Room updated successfully!");
      onCancel(); // Close the modal after successful update
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationErrors: { [key in keyof Room]?: string } = {};
        error.errors.forEach((err) => {
          validationErrors[err.path[0] as keyof Room] = err.message;
        });
        setErrors(validationErrors); // Set errors if validation fails
      } else {
        message.error("Failed to update room. Please try again."); // Handle other errors
      }
    }
  };

  return (
    <Modal
      title={
        <h2 className="text-green-600 text-center text-xl font-semibold">
          Update Meeting Room
        </h2>
      }
      visible={visible}
      onOk={handleUpdate}
      onCancel={onCancel}
      footer={[
        <div className="flex justify-center mt-4 space-x-4" key="footer">
          <Button
            key="cancel"
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 text-black"
          >
            Cancel
          </Button>
          <Button
            key="submit"
            onClick={handleUpdate}
            className="bg-green-500 hover:bg-green-600 text-white"
            loading={isLoading} // Show loading spinner while the update is in progress
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
            value={room?.name || ""}
            onChange={(e) => onChange(e, "name")}
            className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Image URL</label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Image URL"
              value={room?.image?.[0] || ""}
              onChange={(e) => onChange(e, "image")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">Room Number</label>
            <Input
              placeholder="Room Number"
              value={room?.roomNo || ""}
              onChange={(e) => onChange(e, "roomNo")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.roomNo && <p className="text-red-500">{errors.roomNo}</p>}
          </div>

          <div>
            <label className="text-gray-400">Floor Number</label>
            <Input
              placeholder="Floor Number"
              value={room?.floorNo || ""}
              onChange={(e) => onChange(e, "floorNo")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.floorNo && <p className="text-red-500">{errors.floorNo}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">Capacity</label>
            <Input
              placeholder="Capacity"
              type="number"
              value={room?.capacity || ""}
              onChange={(e) => onChange(e, "capacity")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.capacity && (
              <p className="text-red-500">{errors.capacity}</p>
            )}
          </div>

          <div>
            <label className="text-gray-400">Price Per Slot</label>
            <Input
              placeholder="Price Per Slot"
              type="number"
              value={room?.pricePerSlot || ""}
              onChange={(e) => onChange(e, "pricePerSlot")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.pricePerSlot && (
              <p className="text-red-500">{errors.pricePerSlot}</p>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateModal;
