
////////////
// import React, { useState } from "react";
// import { Row, Col, Card, Button } from "antd";
// import { UserOutlined } from "@ant-design/icons";
// import { useGetRoomsQuery } from "../redux/features/roomsApi";
// import "../styles/custom.css";
// import CustomFooter from "../components/layout/Footer";
// import { Link } from "react-router-dom";

// interface Room {
//   _id: string;
//   name: string;
//   capacity: number;
//   pricePerSlot: number;
//   image: string[];
// }

// interface RoomsProps {
//   limit?: number;
// }

// const Rooms: React.FC<RoomsProps> = ({ limit }) => {
//   const [page, setPage] = useState(1);
//   const defaultLimit = 9;

//   const { data, error, isLoading } = useGetRoomsQuery({
//     page,
//     limit: limit || defaultLimit,
//   });

//   if (isLoading) return <div>Loading...</div>;

//   if (error) {
//     console.log(error);

//     let errorMessage = "An error occurred";

//     if ("status" in error) {
//       const fetchError = error as {
//         status: number;
//         data: { message?: string };
//       };
//       errorMessage = fetchError.data?.message || `Error: ${fetchError.status}`;
//     } else if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return <div>Error: {errorMessage}</div>;
//   }

//   const roomsToDisplay = limit
//     ? data?.data?.rooms?.slice(0, limit)
//     : data?.data?.rooms;

//   return (
//     <div>
//       <div className="p-8 bg-white layout-padding">
//         <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
//           {limit ? "Featured Rooms" : "RoomList For Bookings"}
//         </h2>
//         <Row gutter={[16, 16]}>
//           {roomsToDisplay?.map((room: Room) => (
//             <Col xs={24} md={12} lg={8} key={room._id}>
//               <Card
//                 hoverable
//                 className="relative overflow-hidden rounded-lg shadow-lg h-64"
//                 cover={
//                   <div className="relative h-64">
//                     <img
//                       src={
//                         room.image && room.image.length > 0
//                           ? room.image[0]
//                           : "default-image-url.jpg"
//                       }
//                       alt={room.name}
//                       className="w-full h-full object-cover"
//                     />
//                     <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
//                       <div className="text-white mb-4">
//                         <h3 className="text-2xl font-bold">{room.name}</h3>
//                         <p className="text-xl">${room.pricePerSlot} per slot</p>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <Button
//                           type="default"
//                           icon={<UserOutlined />}
//                           className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
//                         >
//                           {room.capacity} Guests
//                         </Button>
//                         <Link to={`/rooms/${room._id}`}>
//                           <Button
//                             type="primary"
//                             className="bg-black text-white hover:bg-green-500"
//                           >
//                             See Details
//                           </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                 }
//               />
//             </Col>
//           ))}
//         </Row>

//         {!limit && (
//           <div className="flex justify-center mt-8">
//             <button
//               onClick={() => setPage((prev) => prev - 1)}
//               disabled={page === 1}
//               className="bg-black text-white px-4 py-2 mr-4 rounded hover:bg-green-500 hover:text-black transition-colors"
//             >
//               Previous
//             </button>
//             <button
//               onClick={() => setPage((prev) => prev + 1)}
//               disabled={data?.data?.totalPages && page >= data.data.totalPages}
//               className="bg-black text-white px-4 py-2 rounded hover:bg-green-500 hover:text-black transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//       {!limit && <CustomFooter />}
//     </div>
//   );
// };
// export default Rooms;
import React, { useState, useEffect } from "react";
import { Row, Col, Card, Button, Input, Select } from "antd";
import { useGetRoomsQuery } from "../redux/features/roomsApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearch,
  setCapacity,
  setPriceRange,
  setSort,
  clearFilters,
} from "../redux/features/searchBarSlice";
import { RootState } from "../hooks/store";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UserOutlined } from "@ant-design/icons";
import CustomFooter from "../components/layout/Footer";

const { Option } = Select;

interface Room {
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
}

interface RoomsProps {
  limit?: number;
}

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  if (!error) return null;
  if ("status" in error) {
    const fetchError = error as FetchBaseQueryError;
    if (fetchError.status === "FETCH_ERROR") {
      return "Network error: failed to connect to the server.";
    } else if (fetchError.status === 500) {
      return "Internal server error";
    }
    return `Error: ${fetchError.status}`;
  }
  if ("message" in error) {
    return (error as SerializedError).message;
  }
  return "An unknown error occurred.";
};

const Rooms: React.FC<RoomsProps> = ({ limit }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const { search, capacity, priceRange, sort } = filters;

  const [page, setPage] = useState(1);
  const defaultLimit = 9;

  const { data, error, isLoading } = useGetRoomsQuery({ limit: 1000 });
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

  useEffect(() => {
    if (data?.data?.rooms) {
      let filtered = [...data.data.rooms];
      if (search) {
        filtered = filtered.filter((room) =>
          room.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (capacity) {
        filtered = filtered.filter(
          (room) => room.capacity >= capacity[0] && room.capacity <= capacity[1]
        );
      }
      filtered = filtered.filter(
        (room) =>
          room.pricePerSlot >= priceRange[0] &&
          room.pricePerSlot <= priceRange[1]
      );
      if (sort === "priceAsc") {
        filtered.sort((a, b) => a.pricePerSlot - b.pricePerSlot);
      } else if (sort === "priceDesc") {
        filtered.sort((a, b) => b.pricePerSlot - a.pricePerSlot);
      }
      setFilteredRooms(filtered);
    }
  }, [data, search, capacity, priceRange, sort]);

  const errorMessage = getErrorMessage(error);
  if (isLoading) return <div>Loading...</div>;
  if (errorMessage) return <div>{errorMessage}</div>;

  const roomsToDisplay = limit
    ? filteredRooms.slice(0, limit)
    : filteredRooms.slice((page - 1) * defaultLimit, page * defaultLimit);

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPage(1);
  };

  return (
    <div>
    <div className="p-8 bg-white layout-padding">
      <h2 className="text-4xl font-bold text-center text-green-600 mb-8">
        {limit ? "Featured Rooms" : "Room List For Bookings"}
      </h2>

      {/* Search, Filter, and Sort Controls */}
      <div className="flex justify-between mb-4 gap-4">
        <Input.Search
          placeholder="Search rooms by name..."
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          onSearch={() => setPage(1)}
          className="w-1/3 "
        />

        <Select
          placeholder="Filter by capacity"
          value={
            capacity ? `${capacity[0]} - ${capacity[1]} Guests` : undefined
          }
          onChange={(value) => {
            const selectedCapacity = value.split(" - ").map(Number);
            dispatch(setCapacity([selectedCapacity[0], selectedCapacity[1]]));
            setPage(1); // Reset to first page when filtering
          }}
          className="w-1/4 green-outline-select"
          allowClear
        >
          <Option value="5 - 20">5 - 20 Guests</Option>
          <Option value="20 - 50">20 - 50 Guests</Option>
          <Option value="50 - 100">50 - 100 Guests</Option>
          <Option value="100 - 200">100 - 200 Guests</Option>
          <Option value="200 - 500">200 - 500 Guests</Option>
        </Select>

        <Select
          placeholder="Filter by price"
          value={
            priceRange ? `${priceRange[0]} - ${priceRange[1]} $` : undefined
          }
          onChange={(value) => {
            const selectedPriceRange = value.split(" - ").map(Number);
            dispatch(
              setPriceRange([selectedPriceRange[0], selectedPriceRange[1]])
            );
            setPage(1); // Reset to first page when filtering
          }}
          className="w-1/3 green-outline-select"
          allowClear
        >
          <Option value="0 - 20">0 - 20 $</Option>
          <Option value="20 - 50">20 - 50 $</Option>
          <Option value="50 - 100">50 - 100 $</Option>
          <Option value="100 - 500">100 - 500 $</Option>
          <Option value="500 - 1000">500 - 1000 $</Option>
          <Option value="1000 - 2000">1000 - 2000 $</Option>
        </Select>

        <Select
          placeholder="Sort by" // Placeholder text for the Select component
          value={sort || undefined} // Ensure the value is undefined when not selected
          onChange={(value) => {
            dispatch(setSort(value));
            setPage(1); // Reset to first page when sorting
          }}
          className="w-1/4 green-outline-select"
          allowClear
        >
          <Option value="priceAsc">Price: Low to High</Option>
          <Option value="priceDesc">Price: High to Low</Option>
        </Select>
        <Button
          onClick={handleClearFilters}
          className="bg-black text-white hover:bg-green-600 py-4 px-4 text-lg"
        >
          Clear Filters
        </Button>
      </div>

      {/* Rooms List */}
      <Row gutter={[16, 16]}>
        {roomsToDisplay.length > 0 ? (
          roomsToDisplay.map((room: Room) => (
            <Col xs={24} md={12} lg={8} key={room._id}>
              <Card
                hoverable
                className="relative overflow-hidden rounded-lg shadow-lg h-64"
                cover={
                  <div className="relative h-64">
                    <img
                      src={
                        room.image && room.image.length > 0
                          ? room.image[0]
                          : "default-image-url.jpg"
                      }
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
                      <div className="text-white mb-4">
                        <h3 className="text-2xl font-bold">{room.name}</h3>
                        <p className="text-xl">${room.pricePerSlot} per slot</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button
                          type="default"
                          icon={<UserOutlined />}
                          className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
                        >
                          {room.capacity} Guests
                        </Button>
                        <Link to={`/rooms/${room._id}`}>
                          <Button
                            type="primary"
                            className="bg-black text-white hover:bg-green-500"
                          >
                            See Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                }
              />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <div className="text-center text-red-500 text-xl">
              No rooms found matching the criteria.
            </div>
          </Col>
        )}
      </Row>

      {/* Pagination Controls */}
      {!limit && (
        <div className="flex justify-center mt-8">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-black text-white px-4 py-2 mr-2"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setPage((prev) =>
                Math.min(
                  prev + 1,
                  Math.ceil(filteredRooms.length / defaultLimit)
                )
              )
            }
            disabled={page === Math.ceil(filteredRooms.length / defaultLimit)}
            className="bg-black text-white px-4 py-2"
          >
            Next
          </Button>
        </div>
      )}
      
    </div>
    <div><CustomFooter/></div>
    </div>
  );
};

export default Rooms;
