// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetMyBookingsQuery } from "../../redux/booking/bookingApi";

// const MyBooking = () => {
//   const { data, isLoading } = useGetMyBookingsQuery(undefined, {
//     pollingInterval: 5000, 
//   });

//   if (isLoading) {
//     return (
//       <div className="container mx-auto mt-40 md:mt-0 py-10">
//         <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
//           Loading your bookings...
//         </h2>
//         <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.from({ length: 6 }).map((_, index) => (
//             <div
//               key={index}
//               className="bg-white border p-4 border-[#49674a] rounded-lg shadow-md overflow-hidden animate-pulse"
//             >
//               <div className="w-full h-48 bg-gray-300 rounded-xl"></div>
//               <div className="p-6">
//                 <div className="h-6 bg-gray-300 rounded mb-4"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded mb-2"></div>
//                 <div className="h-4 bg-gray-300 rounded mt-4"></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto mt-40 md:mt-0 py-10">
//       {data?.data?.length > 0 ? (
//         <>
//           <h2 className="text-3xl mb-2 font-medium text-center text-green-500">
//             My Bookings
//           </h2>

//           <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-16">
         
            
//             {data?.data.map((booking: any) => (
//               <div
//                 key={booking._id}
//                 className="bg-gray-100 border p-4 border-green-500 rounded-lg shadow-md overflow-hidden"
//               >
//                 {/* Image container with overlay */}
//                 <div className="relative">
//                   <img
//                     src={
//                       booking.room?.image[0] || "/path/to/fallback-image.jpg"
//                     }
//                     alt={booking.room?.name || "Room Image"}
//                     className="w-full rounded-xl h-1/2 object-cover "
//                   />
//                   {/* Black transparent overlay */}
//                   <div className="absolute inset-0 bg-black opacity-30 rounded-xl  "></div>
//                 </div>
//                 <div className="p-6">
//                   <h3 className="text-xl font-semibold mb-2 text-green-500">
//                     {booking.room?.name || "Room Name"}
//                   </h3>
//                   <p className="text-black">
//                     Room No: {booking.room?.roomNo || "N/A"}
//                   </p>
//                   <p className="text-black">
//                     Floor No: {booking.room?.floorNo || "N/A"}
//                   </p>
//                   <p className="text-black">
//                     Capacity: {booking.room?.capacity || "N/A"} people
//                   </p>
//                   <p className="text-black">
//                     Amenities:{" "}
//                     {booking.room?.amenities
//                       ? booking.room.amenities.join(", ")
//                       : "N/A"}
//                   </p>
//                   <p className="text-green-600 mt-2 font-bold">
//                     Date: {new Date(booking.date).toLocaleDateString()}
//                   </p>
//                   <p className="text-black">
//                     Time:{" "}
//                     {booking.slots
//                       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//                       .map((slot: any) => `${slot.startTime} - ${slot.endTime}`)
//                       .join(", ")}
//                   </p>
//                   <p
//                     className={`mt-4 text-lg font-bold ${
//                       booking.isConfirmed === "confirmed"
//                         ? "text-green-600"
//                         : booking.isConfirmed === "pending"
//                         ? "text-yellow-600"
//                         : "text-red-600"
//                     }`}
//                   >
//                     Status:{" "}
//                     {booking.isConfirmed.charAt(0).toUpperCase() +
//                       booking.isConfirmed.slice(1)}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
//           There is no booking history
//         </h2>
//       )}
//     </div>
//   );
// };

// export default MyBooking;
"use client";

import { useState, useEffect } from "react";
import { useGetMyBookingsQuery } from "../../redux/booking/bookingApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Eye,
  Users,
  MapPin,
  Share2,
  Download,
  Printer,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import {
  Button,
  Input,
  Select,
  Badge,
  Spin,
  Empty,
  Modal,
  Tabs,
  Tooltip,
  Progress,
} from "antd";
import { jsPDF } from "jspdf";

const { TabPane } = Tabs;
const { Option } = Select;

// Define booking status types
type BookingStatus = "confirmed" | "pending" | "cancelled";

// Define booking interface
interface Booking {
  _id: string;
  room: {
    _id: string;
    name: string;
    roomNo: string | number;
    floorNo: string | number;
    capacity: number;
    amenities: string[];
    image: string[];
  };
  date: string;
  slots: {
    _id: string;
    startTime: string;
    endTime: string;
  }[];
  isConfirmed: BookingStatus;
  paymentMethod: string;
  createdAt: string;
}

const MyBooking = () => {
  // State for filtering and sorting
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("date-desc");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [expandedAmenities, setExpandedAmenities] = useState(false);

  // Fetch bookings data
  const { data, isLoading, refetch } = useGetMyBookingsQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds
  });

  // Derived state for filtered bookings
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  // Update filtered bookings when data changes or filters change
  useEffect(() => {
    if (data?.data) {
      let filtered = [...data.data];

      // Apply search filter
      if (searchTerm) {
        const searchTermLower = searchTerm.toLowerCase();
        filtered = filtered.filter((booking) => {
          // Safely check if room name exists and includes search term
          const nameMatch = booking.room?.name
            ? booking.room.name.toLowerCase().includes(searchTermLower)
            : false;

          // Safely check if room number exists and includes search term
          // Convert to string first to handle numeric room numbers
          const roomNoMatch = booking.room?.roomNo
            ? String(booking.room.roomNo)
                .toLowerCase()
                .includes(searchTermLower)
            : false;

          return nameMatch || roomNoMatch;
        });
      }

      // Apply status filter
      if (statusFilter) {
        filtered = filtered.filter(
          (booking) => booking.isConfirmed === statusFilter
        );
      }

      // Apply tab filter
      if (activeTab === "past") {
        filtered = filtered.filter(
          (booking) =>
            new Date(booking.date) < new Date() &&
            booking.isConfirmed !== "cancelled"
        );
      } else if (activeTab === "cancelled") {
        filtered = filtered.filter(
          (booking) => booking.isConfirmed === "cancelled"
        );
      } else if (activeTab === "all") {
        // Show all bookings (no additional filtering needed)
      }

      // Apply sorting
      if (sortBy === "date-asc") {
        filtered.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      } else if (sortBy === "date-desc") {
        filtered.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      } else if (sortBy === "name-asc") {
        filtered.sort((a, b) => {
          const nameA = a.room?.name || "";
          const nameB = b.room?.name || "";
          return nameA.localeCompare(nameB);
        });
      } else if (sortBy === "name-desc") {
        filtered.sort((a, b) => {
          const nameA = a.room?.name || "";
          const nameB = b.room?.name || "";
          return nameB.localeCompare(nameA);
        });
      }

      setFilteredBookings(filtered);
    }
  }, [data, searchTerm, statusFilter, sortBy, activeTab]);

  // Handle booking cancellation
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCancelBooking = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setIsConfirmModalVisible(true);
  };

  const confirmCancelBooking = () => {
    // Here you would call your API to cancel the booking
    console.log(`Cancelling booking ${bookingToCancel}`);

    // For demo purposes, let's just close the modal and refetch
    setIsConfirmModalVisible(false);
    setBookingToCancel(null);
    refetch();
  };

  // Handle view booking details
  const handleViewBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setExpandedAmenities(false);
    setIsModalVisible(true);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setStatusFilter(null);
    setSortBy("date-desc");
    setActiveTab("all");
  };

  // Get status badge color
  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Get status icon
  const getStatusIcon = (status: BookingStatus) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return "N/A";
      // Use the same simple date formatting that works in the card view
      return (
        new Date(dateString).toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || "N/A"
      );
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  // Calculate time remaining until booking
  const getTimeRemaining = (dateString: string, startTime: string) => {
    try {
      if (!dateString || !startTime) return null;

      const bookingDate = new Date(dateString);
      const [hours, minutes] = startTime.split(":").map(Number);

      bookingDate.setHours(hours, minutes, 0, 0);

      const now = new Date();
      const diffMs = bookingDate.getTime() - now.getTime();

      if (diffMs <= 0) return null; // Booking is in the past

      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const diffHours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );

      if (diffDays > 0) {
        return `${diffDays} day${diffDays > 1 ? "s" : ""} ${diffHours} hour${
          diffHours > 1 ? "s" : ""
        }`;
      } else {
        return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
      }
    } catch (error) {
      return null;
    }
  };

  // Handle add to calendar
  const handleAddToCalendar = (booking: Booking) => {
    try {
      if (!booking || !booking.date || booking.slots.length === 0) return;

      const startSlot = booking.slots[0];
      const endSlot = booking.slots[booking.slots.length - 1];

      if (!startSlot || !endSlot) return;

      const bookingDate = new Date(booking.date);
      const [startHours, startMinutes] = startSlot.startTime
        .split(":")
        .map(Number);
      const [endHours, endMinutes] = endSlot.endTime.split(":").map(Number);

      const startDateTime = new Date(bookingDate);
      startDateTime.setHours(startHours, startMinutes, 0, 0);

      const endDateTime = new Date(bookingDate);
      endDateTime.setHours(endHours, endMinutes, 0, 0);

      const eventTitle = `Booking: ${booking.room.name}`;
      const eventDetails = `Room: ${booking.room.roomNo}, Floor: ${booking.room.floorNo}\nCapacity: ${booking.room.capacity} people`;
      const eventLocation = `Room ${booking.room.roomNo}, Floor ${booking.room.floorNo}`;

      // Format for Google Calendar
      const startIso = startDateTime.toISOString().replace(/-|:|\.\d+/g, "");
      const endIso = endDateTime.toISOString().replace(/-|:|\.\d+/g, "");

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
        eventTitle
      )}&details=${encodeURIComponent(
        eventDetails
      )}&location=${encodeURIComponent(
        eventLocation
      )}&dates=${startIso}/${endIso}`;

      window.open(googleCalendarUrl, "_blank");
    } catch (error) {
      console.error("Error adding to calendar:", error);
    }
  };

  // Handle share booking
  const handleShareBooking = (booking: Booking) => {
    if (!booking) return;

    const bookingInfo = `I've booked ${booking.room.name} on ${formatDate(
      booking.date
    )} at ${booking.slots
      .map((slot) => `${slot.startTime} - ${slot.endTime}`)
      .join(", ")}`;

    if (navigator.share) {
      navigator
        .share({
          title: "My Room Booking",
          text: bookingInfo,
          url: window.location.href,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          // Fallback to clipboard
          copyToClipboard(bookingInfo);
        });
    } else {
      // Fallback to clipboard
      copyToClipboard(bookingInfo);
    }
  };

  // Add this new function for generating and downloading PDF
  const generatePDF = (booking: Booking) => {
    try {
      if (!booking) return;

      // Create a new PDF document
      const doc = new jsPDF();

      // Add a title
      doc.setFontSize(20);
      doc.setTextColor(39, 174, 96); // Green color
      doc.text("Booking Confirmation", 105, 20, { align: "center" });

      // Add booking details
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);

      // Add room image if available
      if (booking.room?.image && booking.room.image.length > 0) {
        try {
          // This would require additional setup for image loading in PDF
          // For simplicity, we'll skip the image in this implementation
        } catch (error) {
          console.error("Error adding image to PDF:", error);
        }
      }

      // Add booking information
      doc.setFontSize(16);
      doc.text(`Room: ${booking.room.name}`, 20, 40);

      doc.setFontSize(12);
      doc.text(`Booking ID: ${booking._id}`, 20, 50);
      doc.text(
        `Status: ${
          booking.isConfirmed.charAt(0).toUpperCase() +
          booking.isConfirmed.slice(1)
        }`,
        20,
        60
      );
      doc.text(`Date: ${formatDate(booking.date)}`, 20, 70);

      // Time slots
      doc.text("Time Slots:", 20, 80);
      booking.slots.forEach((slot, index) => {
        doc.text(`${slot.startTime} - ${slot.endTime}`, 30, 90 + index * 10);
      });

      // Room details
      const yPos = 90 + booking.slots.length * 10 + 10;
      doc.text(`Room Number: ${booking.room.roomNo}`, 20, yPos);
      doc.text(`Floor: ${booking.room.floorNo}`, 20, yPos + 10);
      doc.text(`Capacity: ${booking.room.capacity} people`, 20, yPos + 20);

      // Amenities
      doc.text("Amenities:", 20, yPos + 30);
      booking.room.amenities.forEach((amenity, index) => {
        if (index < 5) {
          // Limit to 5 amenities to avoid overflow
          doc.text(`• ${amenity}`, 30, yPos + 40 + index * 10);
        }
      });

      // Payment information
      doc.text(
        "Payment Status: Completed",
        20,
        yPos + 40 + Math.min(booking.room.amenities.length, 5) * 10 + 10
      );

      // Footer
      doc.setFontSize(10);
      doc.text("Thank you for your booking!", 105, 280, { align: "center" });

      // Save the PDF
      doc.save(`Booking-${booking._id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  // Copy to clipboard helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert("Booking details copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };

  // Loading state with skeleton cards
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-6 ">
        <div className="flex justify-center mb-8">
          <Spin size="large" />
        </div>
        <h2 className="text-3xl mb-6 font-medium tracking-widest text-center text-gray-400">
          Loading your bookings...
        </h2>
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border p-4 border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mt-4"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-6 lg:pl-28 lg:pr-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl mb-2 font-bold text-center text-green-600">
          My Bookings
        </h2>
        <p className="text-center text-gray-500 mb-8">
          View and manage all your room bookings in one place
        </p>

        {/* Tabs for categorizing bookings */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          className="mb-6"
          type="card"
          centered
        >
          <TabPane
            tab={
              <span className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                All Bookings
              </span>
            }
            key="all"
          />
          <TabPane
            tab={
              <span className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Past
              </span>
            }
            key="past"
          />
          <TabPane
            tab={
              <span className="flex items-center">
                <XCircle className="mr-2 h-4 w-4" />
                Cancelled
              </span>
            }
            key="cancelled"
          />
        </Tabs>

        {/* Search and filter controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <Input
              placeholder="Search by room name or number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              prefix={<Search className="h-4 w-4 text-gray-400" />}
              allowClear
              className="w-full"
            />
          </div>

          <Select
            placeholder="Filter by status"
            value={statusFilter}
            onChange={setStatusFilter}
            allowClear
            className="min-w-[180px]"
          >
            <Option value="confirmed">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                Confirmed
              </div>
            </Option>
            <Option value="pending">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mr-2" />
                Pending
              </div>
            </Option>
            <Option value="cancelled">
              <div className="flex items-center">
                <XCircle className="h-4 w-4 text-red-500 mr-2" />
                Cancelled
              </div>
            </Option>
          </Select>

          <Select
            placeholder="Sort by"
            value={sortBy}
            onChange={setSortBy}
            className="min-w-[180px]"
          >
            <Option value="date-desc">Date (Newest first)</Option>
            <Option value="date-asc">Date (Oldest first)</Option>
            <Option value="name-asc">Room name (A-Z)</Option>
            <Option value="name-desc">Room name (Z-A)</Option>
          </Select>

          <Button
            onClick={resetFilters}
            icon={<RefreshCw className="h-4 w-4" />}
            className="flex items-center"
          >
            Reset
          </Button>
        </div>

        {/* Bookings grid */}
        {filteredBookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredBookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  {/* Image container with overlay */}
                  <div className="relative h-48">
                    <img
                      src={
                        booking.room?.image[0] ||
                        "/placeholder.svg?height=200&width=400"
                      }
                      alt={booking.room?.name || "Room Image"}
                      className="w-full h-full object-cover"
                    />

                    {/* Status badge */}
                    <div className="absolute top-3 right-3">
                      <Badge
                        status={getStatusColor(booking.isConfirmed)}
                        text={
                          <span className="bg-white px-2 py-1 rounded-full text-sm font-medium flex items-center shadow-sm">
                            {getStatusIcon(booking.isConfirmed)}
                            <span className="ml-1">
                              {booking.isConfirmed.charAt(0).toUpperCase() +
                                booking.isConfirmed.slice(1)}
                            </span>
                          </span>
                        }
                      />
                    </div>

                    {/* Date badge */}
                    <div className="absolute bottom-3 left-3">
                      <div className="bg-white/90 px-3 py-1 rounded-full text-sm font-medium flex items-center shadow-sm">
                        <Calendar className="h-4 w-4 text-green-500 mr-1" />
                        {booking.date
                          ? new Date(booking.date).toLocaleDateString() || "N/A"
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-3 text-gray-800">
                      {booking.room?.name || "Room Name"}
                    </h3>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start">
                        <MapPin className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="text-gray-700">
                            Room {booking.room?.roomNo || "N/A"}, Floor{" "}
                            {booking.room?.floorNo || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Users className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Capacity</p>
                          <p className="text-gray-700">
                            {booking.room?.capacity || "N/A"} people
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <Clock className="h-4 w-4 text-gray-500 mr-2 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Time Slots</p>
                          <p className="text-gray-700">
                            {booking.slots
                              .map(
                                (slot) => `${slot.startTime} - ${slot.endTime}`
                              )
                              .join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex justify-center mt-4 pt-4 border-t border-gray-100">
                      <Button
                        type="primary"
                        onClick={() => handleViewBooking(booking)}
                        icon={<Eye className="h-4 w-4" />}
                        className="bg-green-500 hover:bg-green-600 border-none w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="space-y-2">
                  <p className="text-gray-500 text-lg">No bookings found</p>
                  <p className="text-gray-400 text-sm">
                    {searchTerm || statusFilter || activeTab !== "all"
                      ? "Try adjusting your filters or search terms"
                      : "You haven't made any bookings yet"}
                  </p>
                </div>
              }
            >
              {searchTerm || statusFilter || activeTab !== "all" ? (
                <Button
                  type="primary"
                  onClick={resetFilters}
                  className="mt-4 bg-green-500 hover:bg-green-600 border-none"
                >
                  Clear Filters
                </Button>
              ) : (
                <Button
                  type="primary"
                  href="/rooms"
                  className="mt-4 bg-green-500 hover:bg-green-600 border-none"
                >
                  Browse Rooms
                </Button>
              )}
            </Empty>
          </motion.div>
        )}
      </motion.div>

      {/* Booking details modal */}
      <Modal
        title={
          <span className="text-xl font-semibold text-green-600">
            Booking Details
          </span>
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedBooking && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/2">
                <motion.div
                  initial={{ scale: 0.95, opacity: 0.8 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={
                      selectedBooking.room?.image[0] ||
                      "/placeholder.svg?height=300&width=400"
                    }
                    alt={selectedBooking.room?.name}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                </motion.div>

                {/* Interactive action buttons */}
                <div className="flex justify-between mt-4">
                  <Tooltip title="Add to Calendar">
                    <Button
                      icon={<Calendar className="h-4 w-4" />}
                      onClick={() => handleAddToCalendar(selectedBooking)}
                      className="flex items-center"
                    >
                      Add to Calendar
                    </Button>
                  </Tooltip>

                  <Tooltip title="Share Booking">
                    <Button
                      icon={<Share2 className="h-4 w-4" />}
                      onClick={() => handleShareBooking(selectedBooking)}
                      className="flex items-center"
                    >
                      Share
                    </Button>
                  </Tooltip>
                </div>
              </div>

              <div className="md:w-1/2">
                <motion.h3
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-semibold text-gray-800 mb-2"
                >
                  {selectedBooking.room?.name}
                </motion.h3>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Badge
                    status={getStatusColor(selectedBooking.isConfirmed)}
                    text={
                      <span className="text-sm font-medium flex items-center">
                        {getStatusIcon(selectedBooking.isConfirmed)}
                        <span className="ml-1">
                          {selectedBooking.isConfirmed.charAt(0).toUpperCase() +
                            selectedBooking.isConfirmed.slice(1)}
                        </span>
                      </span>
                    }
                    className="mb-4"
                  />
                </motion.div>

                <div className="space-y-3">
                  <motion.div
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Calendar className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">
                      {selectedBooking?.date
                        ? new Date(selectedBooking.date).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )
                        : "Date not available"}
                    </span>
                  </motion.div>

                  <motion.div
                    className="flex items-center"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <Clock className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-gray-700">
                      {selectedBooking.slots
                        .map((slot) => `${slot.startTime} - ${slot.endTime}`)
                        .join(", ")}
                    </span>
                  </motion.div>

                  {/* Time remaining indicator */}
                  {selectedBooking.slots.length > 0 &&
                    selectedBooking.isConfirmed === "confirmed" &&
                    new Date(selectedBooking.date) > new Date() && (
                      <motion.div
                        className="mt-2 p-3 bg-blue-50 rounded-lg"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <p className="text-sm text-blue-700 font-medium mb-1">
                          Time until booking:
                        </p>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-blue-500 mr-2" />
                          <span className="text-blue-700 font-medium">
                            {getTimeRemaining(
                              selectedBooking.date,
                              selectedBooking.slots[0].startTime
                            ) || "Less than an hour"}
                          </span>
                        </div>
                        <Progress
                          percent={75}
                          showInfo={false}
                          strokeColor="#3b82f6"
                          trailColor="#e0e7ff"
                          className="mt-2"
                        />
                      </motion.div>
                    )}
                </div>
              </div>
            </div>

            <motion.div
              className="border-t border-gray-200 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
            >
              <h4 className="font-medium text-gray-700 mb-2">Room Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700">
                    Room {selectedBooking.room?.roomNo}, Floor{" "}
                    {selectedBooking.room?.floorNo}
                  </span>
                </div>

                <div className="flex items-center">
                  <Users className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-700">
                    {selectedBooking.room?.capacity} people capacity
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="border-t border-gray-200 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-gray-700">Amenities</h4>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setExpandedAmenities(!expandedAmenities)}
                  icon={
                    expandedAmenities ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  }
                >
                  {expandedAmenities ? "Show Less" : "Show All"}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedBooking.room?.amenities
                  .slice(0, expandedAmenities ? undefined : 3)
                  .map((amenity, index) => (
                    <motion.span
                      key={index}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    >
                      {amenity}
                    </motion.span>
                  ))}
                {!expandedAmenities &&
                  selectedBooking.room?.amenities.length > 3 && (
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                      +{selectedBooking.room.amenities.length - 3} more
                    </span>
                  )}
              </div>
            </motion.div>

            <motion.div
              className="border-t border-gray-200 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <h4 className="font-medium text-gray-700 mb-2">
                Booking Information
              </h4>
              <motion.div
                className="p-3 bg-green-50 rounded-lg border border-green-100"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-700">
                    Payment Done
                  </span>
                </div>
              </motion.div>

              {/* Print booking option */}
              <div className="mt-4 flex justify-end">
                <Tooltip title="Print Booking Details">
                  <Button
                    icon={<Printer className="h-4 w-4 mr-1" />}
                    onClick={() => window.print()}
                    className="flex items-center"
                  >
                    Print
                  </Button>
                </Tooltip>

                <Tooltip title="Download as PDF">
                  <Button
                    icon={<Download className="h-4 w-4 mr-1" />}
                    onClick={() => generatePDF(selectedBooking)}
                    className="flex items-center ml-2"
                  >
                    Download
                  </Button>
                </Tooltip>
              </div>
            </motion.div>
          </div>
        )}
      </Modal>

      {/* Confirmation modal for cancellation */}
      <Modal
        title="Cancel Booking"
        open={isConfirmModalVisible}
        onCancel={() => {
          setIsConfirmModalVisible(false);
          setBookingToCancel(null);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setIsConfirmModalVisible(false);
              setBookingToCancel(null);
            }}
          >
            No, Keep Booking
          </Button>,
          <Button key="submit" danger onClick={confirmCancelBooking}>
            Yes, Cancel Booking
          </Button>,
        ]}
      >
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-yellow-500 mr-3 mt-0.5" />
          <div>
            <p className="text-gray-700">
              Are you sure you want to cancel this booking?
            </p>
            <p className="text-gray-500 text-sm mt-1">
              This action cannot be undone. Cancellation policies may apply.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MyBooking;

