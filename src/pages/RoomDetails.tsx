// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Button, Spin } from "antd";
// import { useGetRoomByIdQuery } from "../redux/features/roomsApi";

// const RoomDetails: React.FC = () => {
//   const { roomId } = useParams<{ roomId: string }>();
//   const { data: response, isLoading, error } = useGetRoomByIdQuery(roomId);

//   const [mainImage, setMainImage] = useState<string | null>(null);
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

//   const room = response?.data;

//   useEffect(() => {
//     if (room && room.image && room.image.length > 0) {
//       setMainImage(room.image[0]);
//     }
//   }, [room]);

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen ">
//         <Spin className="dot-spinner" size="large" />
//       </div>
//     );
//   if (error || !room)
//     return (
//       <div className="text-center text-red-500 py-8">
//         Error loading room details.
//       </div>
//     );

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 layout-padding flex flex-col lg:flex-row lg:space-x-12">
    
//       <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
//         <div className="mb-4 lg:mb-6 w-full">
//           <img
//             src={mainImage || "https://via.placeholder.com/400"}
//             alt={room?.name}
//             className="w-full h-60 sm:h-72 lg:h-96 object-cover mb-4 rounded-lg border-2 border-green-500"
//           />
//         </div>

//         <div className="flex overflow-x-auto space-x-2 lg:space-x-4 mb-4 lg:mb-6">
//           {room.image && room.image.length > 0 ? (
//             room.image.map((img: string, index: number) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`Room Image ${index + 1}`}
//                 className={`w-20 h-20 sm:w-24 sm:h-24 object-cover cursor-pointer rounded-md transition-all duration-300 ${
//                   selectedImageIndex === index
//                     ? "border-4 border-green-500"
//                     : "border-2 border-gray-300"
//                 }`}
//                 onClick={() => {
//                   setMainImage(img);
//                   setSelectedImageIndex(index);
//                 }}
//               />
//             ))
//           ) : (
//             <p>No images available for this room.</p>
//           )}
//         </div>
//       </div>

//       <div className="w-full lg:w-1/2">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-green-500">
//           {room?.name || "No Room Name"}
//         </h1>

//         <div className="mb-2 space-y-4">
//           <p className="text-base">
//             <strong>Room No:</strong> {room?.roomNo || "N/A"}
//           </p>
//           <p className="text-base">
//             <strong>Floor No:</strong> {room?.floorNo || "N/A"}
//           </p>
//           <p>
//             <strong className="text-base">Capacity:</strong>{" "}
//             {room?.capacity || "N/A"}
//           </p>
//           <p>
//             <strong className="text-xl text-green-500">Price per Slot:</strong>{" "}
//             <span className="bg-yellow-100 px-3 py-1 rounded-lg">
//               ${room?.pricePerSlot || "N/A"}
//             </span>
//           </p>
//           <p>
//             <strong className="text-base">Description:</strong>{" "}
//             {room?.description || "No description available."}
//           </p>
//           <p>
//             <strong className="text-base">Amenities:</strong>{" "}
//             {room?.amenities && room?.amenities.length > 0 ? (
//               <ul className="list-none flex flex-wrap space-x-2 pt-2">
//                 {room.amenities.map((amenity: string, index: number) => (
//                   <li
//                     key={index}
//                     className="bg-gray-200 px-3 py-1 rounded-lg text-sm"
//                   >
//                     {amenity}
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               "No amenities available."
//             )}
//           </p>
//         </div>

        
//         <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md">
//           <p className="text-lg font-semibold">
//             Special Offer: Book now and get{" "}
//             <span className="text-green-500">10% off</span> your first booking!
//           </p>
//           <p className="text-md">
//             Use code <strong>FIRST10</strong> at checkout.
//           </p>
//         </div>

       
//         <Button
//           className="bg-green-500 text-white text-lg py-3 px-6 lg:py-6 lg:px-8 "
//           onClick={() => (window.location.href = `/book-now/${roomId}`)}
         
//         >
//           Book Now
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default RoomDetails;


import type React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Spin } from "antd";
import {
  useGetRoomByIdQuery,
  useGetRoomsQuery,
} from "../redux/features/roomsApi";
import {
  Star,
  Heart,
  Share2,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Users,
  Clock,
  Info,
  ThumbsUp,
  MessageSquare,
  
  Coffee,
  Wifi,
  Monitor,
  Video,
  Mic,
  Calendar,
  HelpCircle,
  Phone,
  CreditCard,
  Tag,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const { data: response, isLoading, error } = useGetRoomByIdQuery(roomId);

  // State for main component
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  // State for image gallery
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // State for reviews
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [averageRating, setAverageRating] = useState<number>(4.2);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [reviews, setReviews] = useState<any[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar:
          "https://res.cloudinary.com/dwelabpll/image/upload/v1740226214/portrait-of-smiling-male-owner-of-fashion-store-standing-in-front-of-clothing-display_ttj1zu.jpg",
      },
      rating: 5,
      comment:
        "Excellent room with great amenities. The space was perfect for our team meeting and the technology worked flawlessly.",
      date: "2023-05-15",
      likes: 3,
      hasLiked: false,
    },
    {
      id: "2",
      user: {
        name: "Sarah Smith",
        avatar:
          "https://res.cloudinary.com/dwelabpll/image/upload/v1740226235/happy-indian-woman-look-at-webcam-doing-job-interview-videochat_zbcmnl.jpg",
      },
      rating: 4,
      comment:
        "Very nice room, clean and spacious. The only issue was that the air conditioning was a bit too cold.",
      date: "2023-04-22",
      likes: 1,
      hasLiked: false,
    },
  ]);
  const [newReview, setNewReview] = useState<string>("");
  const [newRating, setNewRating] = useState<number>(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState<boolean>(false);
  const [activeReviewTab, setActiveReviewTab] = useState<string>("reviews");

  // State for virtual tour
  // const [activeVirtualTab, setActiveVirtualTab] = useState<string>("video");

  // State for similar rooms
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [similarRooms, setSimilarRooms] = useState<any[]>([]);
  const [loadingSimilarRooms, setLoadingSimilarRooms] = useState<boolean>(true);

  // State for tabs
  const [activeTab, setActiveTab] = useState<string>("description");

  const room = response?.data;

  // Initialize main image when room data loads
  useEffect(() => {
    if (room && room.image && room.image.length > 0) {
      setMainImage(room.image[0]);
    }
  }, [room]);

  // Add this near the other query hooks
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: allRoomsData, isLoading: isLoadingAllRooms } = useGetRoomsQuery(
    { limit: 1000 }
  );

  // Replace the useEffect for similar rooms with this:
  useEffect(() => {
    if (allRoomsData?.data?.rooms && room) {
      setLoadingSimilarRooms(true);

      // Filter to exclude current room
      let filtered = allRoomsData.data.rooms.filter(
        (r: { _id: string | undefined }) => r._id !== roomId
      );

      // If there are no rooms after filtering by type, just show any 3 rooms
      if (filtered.length === 0) {
        filtered = allRoomsData.data.rooms.filter(
          (r: { _id: string | undefined }) => r._id !== roomId
        );
      }

      // Limit to 3 rooms
      filtered = filtered.slice(0, 3);

      // Map to the format expected by the component
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedRooms = filtered.map((room: any) => ({
        id: room._id,
        name: room.name,
        image: room.image || [],
        pricePerSlot: room.pricePerSlot,
        capacity: room.capacity,
        amenities: room.amenities || [
          "Conference Equipment",
          "Whiteboard",
          "Projector",
        ],
      }));

      setSimilarRooms(mappedRooms);
      setLoadingSimilarRooms(false);
    }
  }, [allRoomsData, roomId, room]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spin className="dot-spinner" size="large" />
      </div>
    );
  if (error || !room)
    return (
      <div className="text-center text-red-500 py-8">
        <AlertCircle className="h-12 w-12 mx-auto mb-2" />
        Error loading room details.
      </div>
    );

  // Image Gallery Functions
  const nextImage = () => {
    if (room.image && room.image.length > 0) {
      const newIndex =
        selectedImageIndex === room.image.length - 1
          ? 0
          : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setMainImage(room.image[newIndex]);
      setZoomLevel(1);
    }
  };

  const prevImage = () => {
    if (room.image && room.image.length > 0) {
      const newIndex =
        selectedImageIndex === 0
          ? room.image.length - 1
          : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setMainImage(room.image[newIndex]);
      setZoomLevel(1);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    setZoomLevel(1);
  };

  const zoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const zoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  // Review Functions
  const handleLike = (reviewId: string) => {
    setReviews(
      reviews.map((review) => {
        if (review.id === reviewId) {
          const hasLiked = review.hasLiked || false;
          return {
            ...review,
            likes: hasLiked ? review.likes - 1 : review.likes + 1,
            hasLiked: !hasLiked,
          };
        }
        return review;
      })
    );
  };

  const handleSubmitReview = () => {
    if (!newReview.trim()) return;

    setIsSubmittingReview(true);

    // Simulate API call
    setTimeout(() => {
      const newReviewObj = {
        id: `review-${Date.now()}`,
        user: {
          name: "You",
          avatar: undefined,
        },
        rating: newRating,
        comment: newReview,
        date: new Date().toLocaleDateString(),
        likes: 0,
        hasLiked: false,
      };

      setReviews([newReviewObj, ...reviews]);
      setNewReview("");
      setNewRating(5);
      setIsSubmittingReview(false);
      setActiveReviewTab("reviews");
    }, 1000);
  };

  // Similar Rooms Functions
  const scrollLeft = () => {
    const container = document.getElementById("similar-rooms-container");
    if (container) {
      container.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = document.getElementById("similar-rooms-container");
    if (container) {
      container.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // Toggle favorite
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  // Calculate rating stats
  const totalReviews = reviews.length;
  const ratingCounts = [0, 0, 0, 0, 0];

  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const ratingPercentages = ratingCounts.map((count) =>
    totalReviews > 0 ? (count / totalReviews) * 100 : 0
  );

  return (
    <div className="">
      <div className="p-4 sm:p-6 lg:p-8 layout-padding ">
        {/* Header with breadcrumbs and actions */}
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div className="text-sm breadcrumbs">
            <ul className="flex space-x-2">
              <li>
                <a href="/" className="text-gray-500 hover:text-green-500">
                  Home
                </a>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li>
                <a href="/rooms" className="text-gray-500 hover:text-green-500">
                  Rooms
                </a>
              </li>
              <li>
                <span className="text-gray-500 mx-2">/</span>
              </li>
              <li className="text-green-500">{room?.name}</li>
            </ul>
          </div>
          <div className="flex space-x-2 mt-2 sm:mt-0">
            <Button
              className="flex items-center gap-1 border border-gray-300"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                // You could add a toast notification here
              }}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              className={`flex items-center gap-1 ${
                isFavorite
                  ? "bg-red-50 text-red-500 border-red-300"
                  : "border border-gray-300"
              }`}
              onClick={toggleFavorite}
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isFavorite ? "Saved" : "Save"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
          {/* Left column - Images and details */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              {room.image && room.image.length > 0 ? (
                <div className="relative w-full">
                  <div
                    className={`relative ${
                      isFullscreen
                        ? "fixed inset-0 z-50 bg-black flex items-center justify-center"
                        : "w-full"
                    }`}
                  >
                    {isFullscreen && (
                      <button
                        onClick={toggleFullscreen}
                        className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    )}

                    <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
                      <img
                        src={mainImage || "https://via.placeholder.com/400"}
                        alt={`${room?.name} view ${selectedImageIndex + 1}`}
                        className={`transition-transform duration-300 cursor-move ${
                          isFullscreen
                            ? "max-h-screen"
                            : "w-full h-60 sm:h-72 lg:h-96 object-cover rounded-lg border-2 border-green-500"
                        }`}
                        style={{ transform: `scale(${zoomLevel})` }}
                      />
                    </div>

                    <div
                      className={`absolute ${
                        isFullscreen ? "bottom-4" : "bottom-2"
                      } left-1/2 transform -translate-x-1/2 flex space-x-2 z-10`}
                    >
                      {isFullscreen && (
                        <>
                          <button
                            onClick={zoomIn}
                            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ZoomIn className="h-5 w-5" />
                          </button>
                          <button
                            onClick={zoomOut}
                            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                          >
                            <ZoomOut className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </div>

                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </div>

                  {!isFullscreen && (
                    <button
                      onClick={toggleFullscreen}
                      className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <ZoomIn className="h-5 w-5" />
                    </button>
                  )}

                  <div className="flex overflow-x-auto space-x-2 lg:space-x-4 mt-4 pb-2">
                    {room.image.map((img: string, index: number) => (
                      <img
                        key={index}
                        src={img || "/placeholder.svg"}
                        alt={`Room thumbnail ${index + 1}`}
                        className={`w-20 h-20 sm:w-24 sm:h-24 object-cover cursor-pointer rounded-md transition-all duration-300 ${
                          selectedImageIndex === index
                            ? "border-4 border-green-500"
                            : "border-2 border-gray-300 hover:border-green-300"
                        }`}
                        onClick={() => {
                          setMainImage(img);
                          setSelectedImageIndex(index);
                        }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="w-full h-60 sm:h-72 lg:h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">No images available</p>
                </div>
              )}
            </div>

            {/* Room Details */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-500 mb-2">
                    {room?.name || "No Room Name"}
                  </h1>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>
                      Floor {room?.floorNo || "N/A"}, Room{" "}
                      {room?.roomNo || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">
                      {averageRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0">
                  <div className="text-3xl font-bold text-green-500">
                    ${room?.pricePerSlot || "N/A"}
                  </div>
                  <div className="text-sm text-gray-500">per slot</div>
                </div>
              </div>

              <hr className="my-6 border-gray-200" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="border rounded-lg p-4 flex items-center">
                  <Users className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Capacity</div>
                    <div className="font-medium">
                      {room?.capacity || "N/A"} People
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex items-center">
                  <Clock className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Duration</div>
                    <div className="font-medium">2 Hours / Slot</div>
                  </div>
                </div>
                <div className="border rounded-lg p-4 flex items-center">
                  <Tag className="w-5 h-5 text-green-500 mr-3" />
                  <div>
                    <div className="text-sm text-gray-500">Room Type</div>
                    <div className="font-medium">Conference Room</div>
                  </div>
                </div>
              </div>

              {/* Tabs for room details */}
              <div className="mb-6">
                <div className="border-b">
                  <div className="flex -mb-px">
                    <button
                      className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                        activeTab === "description"
                          ? "border-green-500 text-green-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("description")}
                    >
                      <Info className="w-4 h-4 inline-block mr-1" />
                      Description
                    </button>
                    <button
                      className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                        activeTab === "amenities"
                          ? "border-green-500 text-green-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("amenities")}
                    >
                      <CheckCircle className="w-4 h-4 inline-block mr-1" />
                      Amenities
                    </button>
                    <button
                      className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                        activeTab === "policies"
                          ? "border-green-500 text-green-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveTab("policies")}
                    >
                      <AlertCircle className="w-4 h-4 inline-block mr-1" />
                      Policies
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  {activeTab === "description" && (
                    <div className="prose max-w-none">
                      <p>{room?.description || "No description available."}</p>
                      <p className="mt-4">
                        This room is perfect for team meetings, presentations,
                        and collaborative sessions. It features state-of-the-art
                        equipment and a comfortable environment designed to
                        enhance productivity and creativity.
                      </p>
                    </div>
                  )}

                  {activeTab === "amenities" && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {room?.amenities && room?.amenities.length > 0 ? (
                        room.amenities.map((amenity: string, index: number) => {
                          // Choose an appropriate icon based on amenity name
                          let AmenityIcon = CheckCircle;
                          if (amenity.toLowerCase().includes("wifi"))
                            AmenityIcon = Wifi;
                          if (amenity.toLowerCase().includes("coffee"))
                            AmenityIcon = Coffee;
                          if (
                            amenity.toLowerCase().includes("projector") ||
                            amenity.toLowerCase().includes("screen")
                          )
                            AmenityIcon = Monitor;
                          if (amenity.toLowerCase().includes("video"))
                            AmenityIcon = Video;
                          if (
                            amenity.toLowerCase().includes("audio") ||
                            amenity.toLowerCase().includes("mic")
                          )
                            AmenityIcon = Mic;

                          return (
                            <div key={index} className="flex items-center">
                              <AmenityIcon className="w-4 h-4 text-green-500 mr-2" />
                              <span>{amenity}</span>
                            </div>
                          );
                        })
                      ) : (
                        <p>No amenities available.</p>
                      )}
                    </div>
                  )}

                  {activeTab === "policies" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1 flex items-center">
                          <Calendar className="w-4 h-4 text-green-500 mr-2" />
                          Cancellation Policy
                        </h3>
                        <p className="text-sm text-gray-600">
                          Free cancellation up to 24 hours before the booking
                          time. After that, a 50% fee applies.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 flex items-center">
                          <AlertCircle className="w-4 h-4 text-green-500 mr-2" />
                          Usage Rules
                        </h3>
                        <p className="text-sm text-gray-600">
                          No food or drinks near electronic equipment. Leave the
                          room in the same condition as you found it.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 flex items-center">
                          <Clock className="w-4 h-4 text-green-500 mr-2" />
                          Additional Time
                        </h3>
                        <p className="text-sm text-gray-600">
                          Additional time can be booked in 30-minute increments,
                          subject to availability.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Virtual Tour */}
              {/* <div className="border rounded-lg mb-8">
              <div className="p-4 border-b">
                <h2 className="flex items-center text-lg font-medium">
                  <Compass className="mr-2 h-5 w-5 text-green-500" />
                  <span>Virtual Experience</span>
                </h2>
              </div>
              <div className="p-4">
                <div className="border-b mb-4">
                  <div className="flex -mb-px">
                    <button
                      className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                        activeVirtualTab === "video"
                          ? "border-green-500 text-green-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveVirtualTab("video")}
                    >
                      <Video className="w-4 h-4 inline-block mr-1" />
                      Video Tour
                    </button>
                    <button
                      className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                        activeVirtualTab === "360"
                          ? "border-green-500 text-green-500"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      onClick={() => setActiveVirtualTab("360")}
                    >
                      <Compass className="w-4 h-4 inline-block mr-1" />
                      360° View
                    </button>
                  </div>
                </div>

                {activeVirtualTab === "video" && (
                  <>
                    <div className="aspect-video w-full overflow-hidden rounded-lg">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/IxRVa1DbSAg?si=52lYDJ3M12MpxQqs"
                        title="Room Video Tour"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Take a guided video tour of the room and its amenities.
                    </p>
                  </>
                )} */}
              {/* 
                {activeVirtualTab === "360" && (
                  <>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center"> */}
              {/* This would be replaced with an actual 360 viewer component */}
              {/* <div className="text-center p-6">
                        <Compass className="h-16 w-16 mx-auto mb-4 text-green-500 animate-pulse" />
                        <p className="text-lg font-medium">
                          360° Panoramic View
                        </p>
                        <p className="text-sm text-gray-500 mb-4">
                          Explore the room from every angle
                        </p>
                        <Button className="mx-auto border border-gray-300">
                          View in Fullscreen
                        </Button>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Click and drag to look around the room in 360 degrees.
                    </p>
                  </>
                )}
              </div>
            </div> */}

              {/* Reviews Section */}
              <div className="border rounded-lg mb-8">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-medium flex items-center">
                    <MessageSquare className="mr-2 h-5 w-5 text-green-500" />
                    Guest Reviews
                  </h2>
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= Math.round(averageRating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 font-bold">
                      {averageRating.toFixed(1)}
                    </span>
                    <span className="ml-1 text-gray-500">
                      ({reviews.length})
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="border-b mb-4">
                    <div className="flex -mb-px">
                      <button
                        className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                          activeReviewTab === "reviews"
                            ? "border-green-500 text-green-500"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveReviewTab("reviews")}
                      >
                        <MessageSquare className="w-4 h-4 inline-block mr-1" />
                        Reviews
                      </button>
                      <button
                        className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                          activeReviewTab === "write"
                            ? "border-green-500 text-green-500"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                        onClick={() => setActiveReviewTab("write")}
                      >
                        <Star className="w-4 h-4 inline-block mr-1" />
                        Write a Review
                      </button>
                    </div>
                  </div>

                  {activeReviewTab === "reviews" && (
                    <>
                      <div className="py-4">
                        <h3 className="font-medium mb-4">Rating Overview</h3>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((rating, index) => (
                            <div key={rating} className="flex items-center">
                              <span className="w-12 text-sm">
                                {rating} stars
                              </span>
                              <div className="flex-1 h-2 mx-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{
                                    width: `${ratingPercentages[4 - index]}%`,
                                  }}
                                />
                              </div>
                              <span className="w-12 text-sm text-right">
                                {ratingCounts[4 - index]} (
                                {Math.round(ratingPercentages[4 - index])}%)
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {reviews.length > 0 ? (
                        <div className="space-y-4">
                          {reviews.map((review) => (
                            <div
                              key={review.id}
                              className="border-b pb-4 last:border-0"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 rounded-full overflow-hidden">
                                    {review.user.avatar ? (
                                      <img
                                        src={
                                          review.user.avatar ||
                                          "/placeholder.svg"
                                        }
                                        alt={review.user.name}
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="h-full w-full flex items-center justify-center bg-green-100 text-green-600 font-bold text-lg">
                                        {review.user.name
                                          .charAt(0)
                                          .toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="ml-3">
                                    <p className="font-medium">
                                      {review.user.name}
                                    </p>
                                    <div className="flex items-center text-sm text-gray-500">
                                      <div className="flex mr-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                          <Star
                                            key={star}
                                            className={`h-3 w-3 ${
                                              star <= review.rating
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                      <span>{review.date}</span>
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  className={`flex items-center gap-1 ${
                                    review.hasLiked ? "text-green-500" : ""
                                  }`}
                                  onClick={() => handleLike(review.id)}
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>{review.likes}</span>
                                </Button>
                              </div>
                              <p className="mt-3 text-gray-700">
                                {review.comment}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>
                            No reviews yet. Be the first to review this room!
                          </p>
                        </div>
                      )}
                    </>
                  )}

                  {activeReviewTab === "write" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Your Rating</h3>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-8 w-8 cursor-pointer ${
                                star <= newRating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300 hover:text-yellow-200"
                              }`}
                              onClick={() => setNewRating(star)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Your Review</h3>
                        <textarea
                          placeholder="Share your experience with this room..."
                          className="w-full min-h-[120px] p-2 border rounded-md"
                          value={newReview}
                          onChange={(e) => setNewReview(e.target.value)}
                        />
                      </div>

                      <Button
                        className="w-full bg-green-500 text-white hover:bg-green-600"
                        onClick={handleSubmitReview}
                        disabled={isSubmittingReview || !newReview.trim()}
                      >
                        {isSubmittingReview ? "Submitting..." : "Submit Review"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Rooms */}
              <div className="border rounded-lg mb-8">
                <div className="p-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-medium flex items-center">
                    <Tag className="mr-2 h-5 w-5 text-green-500" />
                    Similar Conference Rooms
                  </h2>
                  <div className="flex space-x-2">
                    <Button
                      className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center p-0"
                      onClick={scrollLeft}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      className="h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center p-0"
                      onClick={scrollRight}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  {loadingSimilarRooms ? (
                    <div className="flex space-x-4 overflow-x-auto py-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="min-w-[250px] rounded-md bg-gray-100 animate-pulse h-[300px]"
                        ></div>
                      ))}
                    </div>
                  ) : similarRooms.length > 0 ? (
                    <div
                      id="similar-rooms-container"
                      className="flex space-x-4 overflow-x-auto py-2 scrollbar-hide"
                      style={{
                        scrollbarWidth: "none",
                        msOverflowStyle: "none",
                      }}
                    >
                      {similarRooms.map((room) => (
                        <div
                          key={room.id}
                          className="min-w-[250px] max-w-[250px] border rounded-lg overflow-hidden"
                        >
                          <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                              src={
                                room.image && room.image.length > 0
                                  ? room.image[0]
                                  : "https://via.placeholder.com/400x300?text=Room+Image"
                              }
                              alt={room.name}
                              className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                            />
                            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
                              ${room.pricePerSlot}
                            </div>
                          </div>
                          <div className="p-3">
                            <h3 className="font-medium text-base">
                              {room.name}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              Capacity: {room.capacity} people
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {room.amenities
                                .slice(0, 2)
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                .map(
                                  (
                                    amenity:
                                      | string
                                      | number
                                      | boolean
                                      | React.ReactElement<
                                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                          any,
                                          | string
                                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                          | React.JSXElementConstructor<any>
                                        >
                                      | Iterable<React.ReactNode>
                                      | React.ReactPortal
                                      | null
                                      | undefined,
                                    index: React.Key | null | undefined
                                  ) => (
                                    <span
                                      key={index}
                                      className="text-xs bg-gray-100 px-2 py-1 rounded-md"
                                    >
                                      {amenity}
                                    </span>
                                  )
                                )}
                              {room.amenities.length > 2 && (
                                <span className="text-xs bg-gray-100 px-2 py-1 rounded-md">
                                  +{room.amenities.length - 2} more
                                </span>
                              )}
                            </div>
                            <a
                              href={`/rooms/${room.id}`}
                              className="block w-full mt-3"
                            >
                              <Button className="w-full border border-gray-300">
                                View Details
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center py-4 text-gray-500">
                      No similar rooms found.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Booking and additional info */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="border rounded-lg mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium flex items-center">
                  <Calendar className="mr-2 h-5 w-5 text-green-500" />
                  Book This Room
                </h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                  <p className="text-lg font-semibold flex items-center">
                    <Tag className="mr-2 h-5 w-5 text-green-500" />
                    Special Offer: Book now and get{" "}
                    <span className="text-green-500 mx-1">10% off</span> your
                    first booking!
                  </p>
                  <p className="text-md">
                    Use code <strong>FIRST10</strong> at checkout.
                  </p>
                </div>

                <Button
                  className="bg-green-500 text-white text-lg py-3 w-full hover:bg-green-600 flex items-center justify-center"
                  onClick={() => (window.location.href = `/book-now/${roomId}`)}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Now
                </Button>

                <p className="text-xs text-center text-gray-500 flex items-center justify-center">
                  <CreditCard className="mr-1 h-3 w-3" />
                  You won't be charged yet
                </p>
              </div>
            </div>

            {/* Host Information */}
            <div className="border rounded-lg mb-6">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5 text-green-500" />
                  Managed By
                </h2>
              </div>
              <div className="p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-4">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-medium">Facility Management</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Response time: &lt; 1 hour
                  </p>
                  <Button className="p-0 h-auto text-green-500 bg-transparent hover:bg-transparent flex items-center">
                    <Phone className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="border rounded-lg">
              <div className="p-4 border-b">
                <h2 className="text-lg font-medium flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5 text-green-500" />
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
                <div>
                  <h3 className="font-medium mb-1 flex items-center">
                    <Coffee className="w-4 h-4 text-green-500 mr-2" />
                    Is catering available?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes, catering can be arranged with 24 hours notice for an
                    additional fee.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1 flex items-center">
                    <Monitor className="w-4 h-4 text-green-500 mr-2" />
                    Is technical support available?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Technical support is available during business hours (9 AM -
                    5 PM).
                  </p>
                </div>
                <div>
                  <h3 className="font-medium mb-1 flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-2" />
                    Can I extend my booking?
                  </h3>
                  <p className="text-sm text-gray-600">
                    Yes, if the room is available after your slot, you can
                    extend your booking.
                  </p>
                </div>
                <Button className="w-full border border-gray-300 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4 mr-2" />
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;


