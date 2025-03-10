
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
// import React, { useState, useEffect } from "react";
// import { Row, Col, Card, Button, Input, Select, Spin } from "antd";
// import { useGetRoomsQuery } from "../redux/features/roomsApi";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setSearch,
//   setCapacity,
//   setPriceRange,
//   setSort,
//   clearFilters,
// } from "../redux/features/searchBarSlice";
// import { RootState } from "../hooks/store";
// import { SerializedError } from "@reduxjs/toolkit";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
// import { UserOutlined } from "@ant-design/icons";
// import CustomFooter from "../components/layout/Footer";


// const { Option } = Select;

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

// const getErrorMessage = (
//   error: FetchBaseQueryError | SerializedError | undefined
// ) => {
//   if (!error) return null;
//   if ("status" in error) {
//     const fetchError = error as FetchBaseQueryError;
//     if (fetchError.status === "FETCH_ERROR") {
//       return "Network error: failed to connect to the server.";
//     } else if (fetchError.status === 500) {
//       return "Internal server error";
//     }
//     return `Error: ${fetchError.status}`;
//   }
//   if ("message" in error) {
//     return (error as SerializedError).message;
//   }
//   return "An unknown error occurred.";
// };

// const Rooms: React.FC<RoomsProps> = ({ limit }) => {
//   const dispatch = useDispatch();
//   const filters = useSelector((state: RootState) => state.filters);
//   const { search, capacity, priceRange, sort } = filters;

//   const [page, setPage] = useState(1);
//   const defaultLimit = 9;

//   const { data, error, isLoading } = useGetRoomsQuery({ limit: 1000 });
//   const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

//   useEffect(() => {
//     if (data?.data?.rooms) {
//       let filtered = [...data.data.rooms];
//       if (search) {
//         filtered = filtered.filter((room) =>
//           room.name.toLowerCase().includes(search.toLowerCase())
//         );
//       }
//       if (capacity) {
//         filtered = filtered.filter(
//           (room) => room.capacity >= capacity[0] && room.capacity <= capacity[1]
//         );
//       }
//       filtered = filtered.filter(
//         (room) =>
//           room.pricePerSlot >= priceRange[0] &&
//           room.pricePerSlot <= priceRange[1]
//       );
//       if (sort === "priceAsc") {
//         filtered.sort((a, b) => a.pricePerSlot - b.pricePerSlot);
//       } else if (sort === "priceDesc") {
//         filtered.sort((a, b) => b.pricePerSlot - a.pricePerSlot);
//       }
//       setFilteredRooms(filtered);
//     }
//   }, [data, search, capacity, priceRange, sort]);

//   const errorMessage = getErrorMessage(error);
//   // 
//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen ">
//         <Spin className="dot-spinner" size="large" />
    
//       </div>
//     );
//   if (errorMessage) return <div>{errorMessage}</div>;

//   const roomsToDisplay = limit
//     ? filteredRooms.slice(0, limit)
//     : filteredRooms.slice((page - 1) * defaultLimit, page * defaultLimit);

//   const handleClearFilters = () => {
//     dispatch(clearFilters());
//     setPage(1);
//   };

//   return (
//     <div>
//       <div className="p-4 sm:p-8 bg-white layout-padding">
//         <h2 className="text-2xl sm:text-4xl font-bold text-center text-green-600 mb-4 sm:mb-8">
//           {limit ? "Featured Rooms" : "Room List For Bookings"}
//         </h2>

//         {/* Search, Filter, and Sort Controls */}
//         <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
//           <Input.Search
//             placeholder="Search rooms by name..."
//             value={search}
//             onChange={(e) => dispatch(setSearch(e.target.value))}
//             onSearch={() => setPage(1)}
//             className="w-full sm:w-1/3"
//           />

//           <Select
//             placeholder="Filter by capacity"
//             value={
//               capacity ? `${capacity[0]} - ${capacity[1]} Guests` : undefined
//             }
//             onChange={(value) => {
//               const selectedCapacity = value.split(" - ").map(Number);
//               dispatch(setCapacity([selectedCapacity[0], selectedCapacity[1]]));
//               setPage(1); 
//             }}
//             className="w-full sm:w-1/4 green-outline-select"
//             allowClear
//           >
//             <Option value="5 - 20">5 - 20 Guests</Option>
//             <Option value="20 - 50">20 - 50 Guests</Option>
//             <Option value="50 - 100">50 - 100 Guests</Option>
//             <Option value="100 - 200">100 - 200 Guests</Option>
//             <Option value="200 - 500">200 - 500 Guests</Option>
//           </Select>

//           <Select
//             placeholder="Filter by price"
//             value={
//               priceRange ? `${priceRange[0]} - ${priceRange[1]} $` : undefined
//             }
//             onChange={(value) => {
//               const selectedPriceRange = value.split(" - ").map(Number);
//               dispatch(
//                 setPriceRange([selectedPriceRange[0], selectedPriceRange[1]])
//               );
//               setPage(1); 
//             }}
//             className="w-full sm:w-1/3 green-outline-select"
//             allowClear
//           >
//             <Option value="0 - 20">0 - 20 $</Option>
//             <Option value="20 - 50">20 - 50 $</Option>
//             <Option value="50 - 100">50 - 100 $</Option>
//             <Option value="100 - 500">100 - 500 $</Option>
//             <Option value="500 - 1000">500 - 1000 $</Option>
//             <Option value="1000 - 2000">1000 - 2000 $</Option>
//           </Select>

//           <Select
//             placeholder="Sort by"
//             value={sort || undefined} 
//             onChange={(value) => {
//               dispatch(setSort(value));
//               setPage(1); 
//             }}
//             className="w-full sm:w-1/4 green-outline-select"
//             allowClear
//           >
//             <Option value="priceAsc">Price: Low to High</Option>
//             <Option value="priceDesc">Price: High to Low</Option>
//           </Select>
//           <Button
//             onClick={handleClearFilters}
//             className="bg-black text-white hover:bg-green-600 py-2 px-4 text-base sm:text-lg"
//           >
//             Clear Filters
//           </Button>
//         </div>

        
//         <Row gutter={[16, 16]}>
//           {roomsToDisplay.length > 0 ? (
//             roomsToDisplay.map((room: Room) => (
//               <Col xs={24} md={12} lg={8} key={room._id}>
//                 <Card
//                   hoverable
//                   className="relative overflow-hidden rounded-lg shadow-lg h-64"
//                   cover={
//                     <div className="relative h-64">
//                       <img
//                         src={
//                           room.image && room.image.length > 0
//                             ? room.image[0]
//                             : "default-image-url.jpg"
//                         }
//                         alt={room.name}
//                         className="w-full h-full object-cover"
//                       />
//                       <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
//                         <div className="text-white mb-4">
//                           <h3 className="text-xl sm:text-2xl font-bold">
//                             {room.name}
//                           </h3>
//                           <p className="text-lg sm:text-xl">
//                             ${room.pricePerSlot} per slot
//                           </p>
//                         </div>
//                         <div className="flex justify-between items-center">
//                           <Button
//                             type="default"
//                             icon={<UserOutlined />}
//                             className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
//                           >
//                             {room.capacity} Guests
//                           </Button>
//                           <Link to={`/rooms/${room._id}`}>
//                             <Button
//                               type="primary"
//                               className="bg-black text-white hover:bg-green-500"
//                             >
//                               See Details
//                             </Button>
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   }
//                 />
//               </Col>
//             ))
//           ) : (
//             <Col span={24}>
//               <div className="text-center text-gray-500">
//                 No rooms match your search criteria.
//               </div>
//             </Col>
//           )}
//         </Row>

        
//         {!limit && filteredRooms.length > defaultLimit && (
//           <div className="flex justify-center mt-6">
//             <Button
//               onClick={() => setPage((prevPage) => prevPage - 1)}
//               disabled={page === 1}
//               className="mx-2 bg-green-500 text-white hover:bg-green-700"
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={() => setPage((prevPage) => prevPage + 1)}
//               disabled={page === Math.ceil(filteredRooms.length / defaultLimit)}
//               className="mx-2 bg-green-500 text-white hover:bg-green-700"
//             >
//               Next
//             </Button>
//           </div>
//         )}
//       </div>
//       {!limit && <CustomFooter />}
//     </div>
//   );
// };

// export default Rooms;


import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Input,
  Select,
  Spin,
  Badge,
  Empty,
  Drawer,
  notification,
} from "antd";
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
import type { RootState } from "../hooks/store";
import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  UserOutlined,
  CloseOutlined,
  
  LeftOutlined,
  RightOutlined,
  HeartOutlined,
  HeartFilled,
  StarFilled,
  EyeOutlined,
  ShareAltOutlined,
  CheckCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import CustomFooter from "../components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";

const { Option } = Select;
const { Search } = Input;

interface Room {
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
  rating?: number;
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [quickViewRoom, setQuickViewRoom] = useState<Room | null>(null);
  const [compareRooms, setCompareRooms] = useState<string[]>([]);
  const [isCompareMode, setIsCompareMode] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFavorites, setShowFavorites] = useState(false);

  const { data, error, isLoading } = useGetRoomsQuery({ limit: 1000 });
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const roomsContainerRef = useRef<HTMLDivElement>(null);

  // Add ratings to rooms for demo purposes
  useEffect(() => {
    if (data?.data?.rooms) {
      const roomsWithRatings = data.data.rooms.map((room: Room) => ({
        ...room,
        rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3.0 and 5.0
      }));

      let filtered = [...roomsWithRatings];

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

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteRooms");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favoriteRooms", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (roomId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setFavorites((prev) => {
      if (prev.includes(roomId)) {
        notification.info({
          message: "Removed from favorites",
          description: "This room has been removed from your favorites.",
          placement: "bottomRight",
        });
        return prev.filter((id) => id !== roomId);
      } else {
        notification.success({
          message: "Added to favorites",
          description: "This room has been added to your favorites.",
          placement: "bottomRight",
        });
        return [...prev, roomId];
      }
    });
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setPage(1);
  };

  const scrollToTop = () => {
    roomsContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuickView = (room: Room, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setQuickViewRoom(room);
  };

  const toggleCompareRoom = (roomId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setCompareRooms((prev) => {
      if (prev.includes(roomId)) {
        return prev.filter((id) => id !== roomId);
      } else {
        if (prev.length >= 3) {
          notification.warning({
            message: "Compare limit reached",
            description:
              "You can compare up to 3 rooms at a time. Remove a room to add another.",
            placement: "bottomRight",
          });
          return prev;
        }
        return [...prev, roomId];
      }
    });
  };

  const shareRoom = (room: Room, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    // Create a shareable URL
    const shareUrl = `${window.location.origin}/rooms/${room._id}`;

    // Use Web Share API if available
    if (navigator.share) {
      navigator
        .share({
          title: room.name,
          text: `Check out this room: ${room.name}`,
          url: shareUrl,
        })
        .catch(() => {
          // Fallback if share fails
          copyToClipboard(shareUrl);
        });
    } else {
      // Fallback for browsers that don't support Web Share API
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      notification.success({
        message: "Link copied!",
        description: "Room link has been copied to clipboard.",
        placement: "bottomRight",
      });
    });
  };

  const toggleFavoritesView = () => {
    setShowFavorites(!showFavorites);
    // Reset to page 1 when toggling favorites view
    setPage(1);
  };

  const errorMessage = getErrorMessage(error);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin className="dot-spinner" size="large" />
      </div>
    );

  if (errorMessage) return <div>{errorMessage}</div>;

  const roomsToDisplay = showFavorites
    ? filteredRooms.filter((room) => favorites.includes(room._id))
    : limit
    ? filteredRooms.slice(0, limit)
    : filteredRooms.slice((page - 1) * defaultLimit, page * defaultLimit);

  const totalPages = Math.ceil(
    showFavorites
      ? filteredRooms.filter((room) => favorites.includes(room._id)).length /
          defaultLimit
      : filteredRooms.length / defaultLimit
  );

  return (
    <div ref={roomsContainerRef} className="">
      <div className="p-4 sm:p-8 bg-white layout-padding ">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-green-600 mb-4 sm:mb-8">
            {limit ? "Featured Rooms" : "Room List For Bookings"}
          </h2>

          {/* Compare Rooms Bar - Shows when rooms are selected for comparison */}
          <AnimatePresence>
            {compareRooms.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-0 left-0 right-0 bg-white shadow-lg z-40 p-5 border-t-2 border-green-500"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Compare Rooms ({compareRooms.length}/3)
                    </h3>
                    <div className="flex gap-3">
                      <Button
                        onClick={() => setCompareRooms([])}
                        className="text-gray-600"
                      >
                        Clear All
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setIsCompareMode(true)}
                        className="bg-green-500 hover:bg-green-600 border-none"
                        disabled={compareRooms.length < 2}
                      >
                        Compare Now
                      </Button>
                    </div>
                  </div>

                  <div className="flex gap-6 overflow-x-auto pb-3">
                    {compareRooms.map((roomId) => {
                      const room = filteredRooms.find((r) => r._id === roomId);
                      if (!room) return null;

                      return (
                        <motion.div
                          key={roomId}
                          className="flex-shrink-0 w-56 relative"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                        >
                          <div className="bg-gray-100 rounded-lg overflow-hidden">
                            <div className="h-32 relative overflow-hidden">
                              <img
                                src={
                                  room.image?.[0] ||
                                  "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg" ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />
                              <motion.button
                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() =>
                                  setCompareRooms((prev) =>
                                    prev.filter((id) => id !== roomId)
                                  )
                                }
                              >
                                <CloseOutlined className="text-gray-600" />
                              </motion.button>
                            </div>
                            <div className="p-3">
                              <p className="font-medium text-sm truncate">
                                {room.name}
                              </p>
                              <p className="text-green-600 text-sm">
                                ${room.pricePerSlot}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}

                    {Array.from({ length: 3 - compareRooms.length }).map(
                      (_, index) => (
                        <div
                          key={`empty-${index}`}
                          className="flex-shrink-0 w-56 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center"
                        >
                          <p className="text-gray-400 text-sm">
                            Add room to compare
                          </p>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Search, Filter, and Sort Controls - Using your original design */}
          {!limit && (
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
              <Search
                placeholder="Search rooms by name..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
                onSearch={() => setPage(1)}
                className="w-full sm:w-1/3"
              />

              <Select
                placeholder="Filter by capacity"
                value={
                  capacity
                    ? `${capacity[0]} - ${capacity[1]} Guests`
                    : undefined
                }
                onChange={(value) => {
                  const selectedCapacity = value.split(" - ").map(Number);
                  dispatch(
                    setCapacity([selectedCapacity[0], selectedCapacity[1]])
                  );
                  setPage(1);
                }}
                className="w-full sm:w-1/4 green-outline-select"
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
                  priceRange
                    ? `${priceRange[0]} - ${priceRange[1]} $`
                    : undefined
                }
                onChange={(value) => {
                  const selectedPriceRange = value.split(" - ").map(Number);
                  dispatch(
                    setPriceRange([
                      selectedPriceRange[0],
                      selectedPriceRange[1],
                    ])
                  );
                  setPage(1);
                }}
                className="w-full sm:w-1/3 green-outline-select"
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
                placeholder="Sort by"
                value={sort || undefined}
                onChange={(value) => {
                  dispatch(setSort(value));
                  setPage(1);
                }}
                className="w-full sm:w-1/4 green-outline-select"
                allowClear
              >
                <Option value="priceAsc">Price: Low to High</Option>
                <Option value="priceDesc">Price: High to Low</Option>
              </Select>

              <div className="flex gap-2">
                <Button
                  onClick={handleClearFilters}
                  className="bg-black text-white hover:bg-green-600 py-2 px-4 text-base sm:text-lg"
                >
                  Clear Filters
                </Button>

                <div className="flex border rounded-md overflow-hidden">
                  <Button
                    type={viewMode === "grid" ? "primary" : "default"}
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-green-500 hover:bg-green-600 border-none"
                        : ""
                    }
                    icon={
                      <div className="grid grid-cols-2 gap-1 w-4 h-4">
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                        <div className="bg-current rounded-sm"></div>
                      </div>
                    }
                  />
                  <Button
                    type={viewMode === "list" ? "primary" : "default"}
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-green-500 hover:bg-green-600 border-none"
                        : ""
                    }
                    icon={
                      <div className="flex flex-col gap-1 w-4 h-4">
                        <div className="bg-current h-1 rounded-sm"></div>
                        <div className="bg-current h-1 rounded-sm"></div>
                        <div className="bg-current h-1 rounded-sm"></div>
                      </div>
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* Favorites Toggle Button */}
          {!limit && (
            <div className="mb-4 flex justify-between items-center">
              <div className="flex items-center">
                <Button
                  type={showFavorites ? "primary" : "default"}
                  onClick={toggleFavoritesView}
                  className={`flex items-center ${
                    showFavorites
                      ? "bg-green-500 hover:bg-green-600 border-none"
                      : ""
                  }`}
                  icon={
                    showFavorites ? (
                      <HeartFilled className="mr-1" />
                    ) : (
                      <HeartOutlined className="mr-1" />
                    )
                  }
                >
                  {showFavorites ? "Showing Favorites" : "Show Favorites"}
                </Button>
                {showFavorites && favorites.length > 0 && (
                  <span className="ml-2 text-gray-600">
                    Showing {favorites.length} favorite{" "}
                    {favorites.length === 1 ? "room" : "rooms"}
                  </span>
                )}
              </div>
              {showFavorites && favorites.length > 0 && (
                <Button
                  danger
                  onClick={() => {
                    setFavorites([]);
                    notification.info({
                      message: "Favorites cleared",
                      description:
                        "All rooms have been removed from your favorites.",
                      placement: "bottomRight",
                    });
                  }}
                >
                  Clear All Favorites
                </Button>
              )}
            </div>
          )}

          {/* Favorites Empty State */}
          {showFavorites && favorites.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
              <div className="text-6xl text-gray-300 mb-4">
                <HeartOutlined />
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No Favorite Rooms Yet
              </h3>
              <p className="text-gray-500 mb-4">
                Click the heart icon on any room to add it to your favorites.
              </p>
              <Button
                onClick={() => setShowFavorites(false)}
                className="bg-green-500 hover:bg-green-600 text-white border-none"
              >
                Browse All Rooms
              </Button>
            </div>
          )}

          {/* Room Cards - Grid View */}
          <AnimatePresence mode="wait">
            {viewMode === "grid" && roomsToDisplay.length > 0 ? (
              <Row gutter={[16, 16]}>
                {roomsToDisplay.map((room: Room, index) => (
                  <Col xs={24} md={12} lg={8} key={room._id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link to={`/rooms/${room._id}`} className="block">
                        <Card
                          hoverable
                          className="relative overflow-hidden rounded-lg shadow-lg h-64"
                          bodyStyle={{ padding: 0 }}
                          onMouseEnter={() => setHoveredRoom(room._id)}
                          onMouseLeave={() => setHoveredRoom(null)}
                          cover={
                            <div className="relative h-64">
                              <img
                                src={
                                  room.image && room.image.length > 0
                                    ? room.image[0]
                                    : "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
                                }
                                alt={room.name}
                                className="w-full h-full object-cover"
                              />

                              {/* Action Buttons */}
                              <div className="absolute top-3 right-3 z-10">
                                <motion.button
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  whileHover={{ scale: 1.1 }}
                                  className="bg-white p-2 rounded-full shadow-md transition-all duration-300"
                                  onClick={(e) => toggleFavorite(room._id, e)}
                                >
                                  {favorites.includes(room._id) ? (
                                    <HeartFilled className="text-red-500 text-xl" />
                                  ) : (
                                    <HeartOutlined className="text-gray-600 text-xl hover:text-red-500" />
                                  )}
                                </motion.button>
                              </div>

                              {/* Rating Badge */}
                              <div className="absolute top-3 left-3 z-10 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
                                <StarFilled className="text-yellow-400 mr-1" />
                                <span className="font-medium">
                                  {room.rating}
                                </span>
                              </div>

                              <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
                                <div className="text-white mb-4">
                                  <h3 className="text-xl sm:text-2xl font-bold">
                                    {room.name}
                                  </h3>
                                  <p className="text-lg sm:text-xl">
                                    ${room.pricePerSlot} per slot
                                  </p>
                                </div>

                                <div className="flex justify-between items-center">
                                  <Button
                                    type="default"
                                    icon={<UserOutlined />}
                                    className="bg-green-500 border-none text-white hover:bg-white hover:text-green-500 hover:border-green-500"
                                  >
                                    {room.capacity} Guests
                                  </Button>

                                  <div className="flex gap-2">
                                    <motion.button
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{
                                        opacity:
                                          hoveredRoom === room._id ? 1 : 0,
                                        scale:
                                          hoveredRoom === room._id ? 1 : 0.8,
                                      }}
                                      className="p-2 rounded-full bg-white text-green-500 shadow-md"
                                      onClick={(e) => handleQuickView(room, e)}
                                    >
                                      <EyeOutlined />
                                    </motion.button>

                                    <motion.button
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{
                                        opacity:
                                          hoveredRoom === room._id ? 1 : 0,
                                        scale:
                                          hoveredRoom === room._id ? 1 : 0.8,
                                      }}
                                      className={`p-2 rounded-full shadow-md ${
                                        compareRooms.includes(room._id)
                                          ? "bg-green-500 text-white"
                                          : "bg-white text-green-500"
                                      }`}
                                      onClick={(e) =>
                                        toggleCompareRoom(room._id, e)
                                      }
                                    >
                                      <CheckCircleOutlined />
                                    </motion.button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          }
                        />
                      </Link>
                    </motion.div>
                  </Col>
                ))}
              </Row>
            ) : viewMode === "list" && roomsToDisplay.length > 0 ? (
              <div className="space-y-4">
                {roomsToDisplay.map((room: Room, index) => (
                  <motion.div
                    key={room._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ y: -3 }}
                  >
                    <Link to={`/rooms/${room._id}`} className="block">
                      <Card
                        hoverable
                        className="overflow-hidden rounded-lg shadow-md border-0"
                        bodyStyle={{ padding: 0 }}
                      >
                        <div className="flex flex-col md:flex-row">
                          <div className="md:w-1/3 h-48 md:h-auto relative">
                            <img
                              src={
                                room.image && room.image.length > 0
                                  ? room.image[0]
                                  : "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
                              }
                              alt={room.name}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
                              <StarFilled className="text-yellow-400 mr-1" />
                              <span className="font-medium">{room.rating}</span>
                            </div>
                          </div>
                          <div className="p-4 md:w-2/3 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                  {room.name}
                                </h3>
                                <div className="flex gap-2">
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-1 rounded-full ${
                                      favorites.includes(room._id)
                                        ? "text-red-500"
                                        : "text-gray-400 hover:text-red-500"
                                    }`}
                                    onClick={(e) => toggleFavorite(room._id, e)}
                                  >
                                    {favorites.includes(room._id) ? (
                                      <HeartFilled className="text-lg" />
                                    ) : (
                                      <HeartOutlined className="text-lg" />
                                    )}
                                  </motion.button>
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className={`p-1 rounded-full ${
                                      compareRooms.includes(room._id)
                                        ? "text-green-500"
                                        : "text-gray-400 hover:text-green-500"
                                    }`}
                                    onClick={(e) =>
                                      toggleCompareRoom(room._id, e)
                                    }
                                  >
                                    <CheckCircleOutlined className="text-lg" />
                                  </motion.button>
                                </div>
                              </div>
                              <div className="flex items-center mb-4">
                                <Badge
                                  count={`${room.capacity} Guests`}
                                  style={{ backgroundColor: "#10b981" }}
                                  className="mr-2"
                                />
                                <Badge
                                  count={`$${room.pricePerSlot}`}
                                  style={{ backgroundColor: "#3b82f6" }}
                                />
                              </div>
                              <p className="text-gray-600 mb-4">
                                Perfect space for meetings, events, and
                                gatherings. Book now to secure your slot.
                              </p>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex gap-2">
                                <Button
                                  size="small"
                                  icon={<EyeOutlined />}
                                  onClick={(e) => handleQuickView(room, e)}
                                >
                                  Quick View
                                </Button>
                                <Button
                                  size="small"
                                  icon={<ShareAltOutlined />}
                                  onClick={(e) => shareRoom(room, e)}
                                >
                                  Share
                                </Button>
                              </div>
                              <Button
                                type="primary"
                                className="bg-black hover:bg-green-600 border-none"
                              >
                                See Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Empty
                  description={
                    <span className="text-gray-500 text-lg">
                      No rooms match your search criteria
                    </span>
                  }
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
                <div className="text-center mt-4">
                  <Button
                    type="primary"
                    onClick={handleClearFilters}
                    className="bg-black hover:bg-green-600 border-none"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Pagination */}
          {!limit && filteredRooms.length > defaultLimit && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={() => {
                  setPage((prevPage) => prevPage - 1);
                  scrollToTop();
                }}
                disabled={page === 1}
                className="mx-2 bg-green-500 text-white hover:bg-green-700"
                icon={<LeftOutlined />}
              >
                Previous
              </Button>
              <div className="mx-4 flex items-center">
                Page {page} of {totalPages}
              </div>
              <Button
                onClick={() => {
                  setPage((prevPage) => prevPage + 1);
                  scrollToTop();
                }}
                disabled={page === totalPages}
                className="mx-2 bg-green-500 text-white hover:bg-green-700"
              >
                Next <RightOutlined />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
      {!limit && <CustomFooter />}
      {/* Scroll to top button */}
      
      {/* Quick View Modal */}
      <Drawer
        title={quickViewRoom?.name || "Room Details"}
        placement="right"
        onClose={() => setQuickViewRoom(null)}
        open={quickViewRoom !== null}
        width={640}
        footer={
          <div className="flex justify-between">
            <Button onClick={() => setQuickViewRoom(null)}>Close</Button>
            {quickViewRoom && (
              <Link to={`/rooms/${quickViewRoom._id}`}>
                <Button
                  type="primary"
                  className="bg-black hover:bg-green-600 border-none"
                >
                  See Details
                </Button>
              </Link>
            )}
          </div>
        }
      >
        {quickViewRoom ? (
          <div className="space-y-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <img
                src={
                  quickViewRoom.image && quickViewRoom.image.length > 0
                    ? quickViewRoom.image[0]
                    : "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg"
                }
                alt={quickViewRoom.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
                <StarFilled className="text-yellow-400 mr-1" />
                <span className="font-medium">{quickViewRoom.rating}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">
                {quickViewRoom.name}
              </h2>
              <div className="flex gap-2">
                <Button
                  type="text"
                  icon={
                    favorites.includes(quickViewRoom._id) ? (
                      <HeartFilled className="text-red-500" />
                    ) : (
                      <HeartOutlined />
                    )
                  }
                  onClick={(e) => toggleFavorite(quickViewRoom._id, e)}
                />
                <Button
                  type="text"
                  icon={<ShareAltOutlined />}
                  onClick={(e) => shareRoom(quickViewRoom, e)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                count={`${quickViewRoom.capacity} Guests`}
                style={{ backgroundColor: "#10b981" }}
              />
              <Badge
                count={`$${quickViewRoom.pricePerSlot} per slot`}
                style={{ backgroundColor: "#3b82f6" }}
              />
            </div>

            <div className="border-t border-b py-4 my-4">
              <h3 className="text-lg font-semibold mb-2">Room Information</h3>
              <p className="text-gray-600">
                This spacious room is perfect for meetings, events, and
                gatherings. It comes equipped with modern amenities and can
                accommodate up to {quickViewRoom.capacity} guests comfortably.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Availability</h3>
              <p className="text-gray-600 mb-2">
                This room is available for booking in time slots. Select a date
                on the booking page to see available slots.
              </p>
              <Link to={`/rooms/${quickViewRoom._id}`}>
                <Button type="link" className="text-green-500 p-0">
                  Check availability and book now
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        )}
      </Drawer>
      {/* Compare Rooms Modal */}
      <Drawer
        title="Compare Rooms"
        placement="bottom"
        height="80vh"
        onClose={() => setIsCompareMode(false)}
        open={isCompareMode}
        extra={
          <Button onClick={() => setCompareRooms([])} danger>
            Clear All
          </Button>
        }
      >
        {compareRooms.length >= 2 ? (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-3 text-left font-semibold text-gray-600 border-b">
                    Features
                  </th>
                  {compareRooms.map((roomId) => {
                    const room = filteredRooms.find((r) => r._id === roomId);
                    if (!room) return null;

                    return (
                      <th
                        key={roomId}
                        className="p-3 text-left font-semibold text-gray-600 border-b min-w-[200px]"
                      >
                        <div className="flex flex-col">
                          <div className="h-32 mb-2 relative">
                            <img
                              src={
                                room.image?.[0] ||
                                "https://res.cloudinary.com/dwelabpll/image/upload/v1725890780/1686761825938_abqi7t.jpg" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={room.name}
                              className="w-full h-full object-cover rounded-md"
                            />
                            <button
                              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md"
                              onClick={() =>
                                setCompareRooms((prev) =>
                                  prev.filter((id) => id !== roomId)
                                )
                              }
                            >
                              <CloseOutlined className="text-gray-600" />
                            </button>
                          </div>
                          <span className="font-bold text-gray-800">
                            {room.name}
                          </span>
                          <div className="flex items-center mt-1">
                            <StarFilled className="text-yellow-400 mr-1" />
                            <span>{room.rating}</span>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 border-b font-medium text-gray-600">
                    Price per slot
                  </td>
                  {compareRooms.map((roomId) => {
                    const room = filteredRooms.find((r) => r._id === roomId);
                    if (!room) return null;

                    return (
                      <td key={roomId} className="p-3 border-b">
                        <span className="font-semibold text-green-600">
                          ${room.pricePerSlot}
                        </span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium text-gray-600">
                    Capacity
                  </td>
                  {compareRooms.map((roomId) => {
                    const room = filteredRooms.find((r) => r._id === roomId);
                    if (!room) return null;

                    return (
                      <td key={roomId} className="p-3 border-b">
                        <span>{room.capacity} guests</span>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium text-gray-600">
                    Rating
                  </td>
                  {compareRooms.map((roomId) => {
                    const room = filteredRooms.find((r) => r._id === roomId);
                    if (!room) return null;

                    return (
                      <td key={roomId} className="p-3 border-b">
                        <div className="flex items-center">
                          <StarFilled className="text-yellow-400 mr-1" />
                          <span>{room.rating}/5.0</span>
                        </div>
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="p-3 border-b font-medium text-gray-600">
                    Actions
                  </td>
                  {compareRooms.map((roomId) => {
                    const room = filteredRooms.find((r) => r._id === roomId);
                    if (!room) return null;

                    return (
                      <td key={roomId} className="p-3 border-b">
                        <Link to={`/rooms/${room._id}`}>
                          <Button
                            type="primary"
                            className="bg-black hover:bg-green-600 border-none"
                          >
                            See Details
                          </Button>
                        </Link>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-4xl text-gray-300 mb-4">
              <InfoCircleOutlined />
            </div>
            <p className="text-gray-500 text-lg mb-4">
              Select at least 2 rooms to compare
            </p>
            <Button
              onClick={() => setIsCompareMode(false)}
              className="bg-green-500 hover:bg-green-600 text-white border-none"
            >
              Back to Room List
            </Button>
          </div>
        )}
      </Drawer>
      
      {/* Add custom styles */}
      
      <style >{`
        .search-input .ant-input-affix-wrapper:focus,
        .search-input .ant-input-affix-wrapper-focused {
          border-color: #10b981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }

        .green-outline-select .ant-select-selector:focus,
        .green-outline-select .ant-select-selector:active,
        .green-outline-select .ant-select-open .ant-select-selector {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2) !important;
        }

        /* Ensure consistent image sizing */
        .ant-card-cover img {
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Add more breathing room */
        .ant-card {
          overflow: hidden;
        }

        .ant-card-body {
          padding: 16px;
        }

        /* Improve animation smoothness */
        .ant-btn {
          transition: all 0.3s ease;
        }

        .ant-btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
};

export default Rooms;

