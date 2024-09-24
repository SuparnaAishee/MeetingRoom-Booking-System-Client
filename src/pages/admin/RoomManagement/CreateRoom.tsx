import React, { useState } from "react";
import { Modal, Button, Input, notification } from "antd";
import { z } from "zod";
import { Room } from "./RoomTable";

const roomSchema = z.object({
  // image: z.string().url("Image must be a valid URL"),
  image: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(2, "At least two images are required"),
  name: z.string().min(1, "Name is required"),
  // name: z.string().min(1, "Name is required").refine((value) => /^[a-zA-Z\s]+$/.test(value), {
  //   message: "Name must only contain alphabetic characters",
  // }),
  roomNo: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Room number is required")
  ),
  floorNo: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Floor number is required")
  ),
  capacity: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Capacity is required")
  ),
  pricePerSlot: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Price per slot is required")
  ),
  amenities: z
    .array(
      z
        .string()
        .min(1)
        .refine((value) => /^[a-zA-Z\s]+$/.test(value), {
          message: "Amenities must only contain alphabetic characters",
        })
    )
    .min(1, "At least one amenity is required"),
});

interface AddRoomModalProps {
  visible: boolean;
  newRoom: Room;
  onAdd: (room: Room) => void;
  onCancel: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof Room) => void;
}

const AddRoomModal: React.FC<AddRoomModalProps> = ({
  visible,
  newRoom,
  onAdd,
  onCancel,
  onChange,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof Room
  ) => {
    const { value } = e.target;


    if (
      field === "roomNo" ||
      field === "floorNo" ||
      field === "capacity" ||
      field === "pricePerSlot"
    ) {
      const numericValue = value === "" ? "" : Number(value); 
      onChange(e, field); 
    } else {
      onChange(e, field); 
    }
  };

  const handleSubmit = async () => {
    try {
   
      await roomSchema.parseAsync(newRoom);
      onAdd(newRoom);
      notification.success({
        message: "Room added successfully!",
      });
      onCancel(); 
    } catch (error) {
      if (error instanceof z.ZodError) {
    
        const formErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length) {
            formErrors[err.path[0]] = err.message;
          }
        });
        setErrors(formErrors);
      }
    }
  };

  return (
    <Modal
      title={
        <h2 className="text-green-600 text-center text-xl font-semibold">
          Add New Meeting Room
        </h2>
      }
      visible={visible}
      onOk={handleSubmit}
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
            onClick={handleSubmit}
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
            onChange={(e) => handleInputChange(e, "name")}
            className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
          />
          {errors.name && <span className="text-red-500">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-400">Image URL</label>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Image URL"
              value={newRoom.image?.[0] || ""}
              onChange={(e) => handleInputChange(e, "image")}
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.image && (
              <span className="text-red-500">{errors.image}</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-400">Room Number</label>
            <Input
              type="number"
              placeholder="Room Number"
              value={newRoom.roomNo}
              onChange={(e) => handleInputChange(e, "roomNo")} 
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.roomNo && (
              <span className="text-red-500">{errors.roomNo}</span>
            )}
          </div>

          <div>
            <label className="text-gray-400">Floor Number</label>
            <Input
              type="number"
              placeholder="Floor Number"
              value={newRoom.floorNo}
              onChange={(e) => handleInputChange(e, "floorNo")} 
              className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
            />
            {errors.floorNo && (
              <span className="text-red-500">{errors.floorNo}</span>
            )}
          </div>
        </div>

        <div>
          <label className="text-gray-400">Capacity</label>
          <Input
            type="number"
            placeholder="Capacity"
            value={newRoom.capacity}
            onChange={(e) => handleInputChange(e, "capacity")} 
            className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
          />
          {errors.capacity && (
            <span className="text-red-500">{errors.capacity}</span>
          )}
        </div>

        <div>
          <label className="text-gray-400">Price per Slot</label>
          <Input
            type="number"
            placeholder="Price per Slot"
            value={newRoom.pricePerSlot}
            onChange={(e) => handleInputChange(e, "pricePerSlot")} 
            className="border-2 text-gray-400 border-gray-100 focus:ring-green-500"
          />
          {errors.pricePerSlot && (
            <span className="text-red-500">{errors.pricePerSlot}</span>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default AddRoomModal;
