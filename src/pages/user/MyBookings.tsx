import { useGetMyBookingsQuery } from "../../redux/booking/bookingApi";

const MyBooking = () => {
  const { data, isLoading } = useGetMyBookingsQuery(undefined, {
    pollingInterval: 5000, // Adjust polling interval as needed (5 seconds here)
  });

  if (isLoading) {
    return (
      <div className="container mx-auto mt-40 md:mt-0 py-10">
        <h2 className="text-3xl mb-2 font-medium tracking-widest text-center">
          Loading your bookings...
        </h2>
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border p-4 border-[#49674a] rounded-lg shadow-md overflow-hidden animate-pulse"
            >
              <div className="w-full h-48 bg-gray-300 rounded-xl"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-40 md:mt-0 py-10">
      {data?.data?.length > 0 ? (
        <>
          <h2 className="text-3xl mb-2 font-medium text-center text-green-500">
            My Bookings
          </h2>

          <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pl-16">
         
            {data?.data.map((booking: any) => (
              <div
                key={booking._id}
                className="bg-gray-100 border p-4 border-green-500 rounded-lg shadow-md overflow-hidden"
              >
                {/* Image container with overlay */}
                <div className="relative">
                  <img
                    src={
                      booking.room?.image[0] || "/path/to/fallback-image.jpg"
                    }
                    alt={booking.room?.name || "Room Image"}
                    className="w-full rounded-xl h-1/2 object-cover "
                  />
                  {/* Black transparent overlay */}
                  <div className="absolute inset-0 bg-black opacity-30 rounded-xl  "></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-green-500">
                    {booking.room?.name || "Room Name"}
                  </h3>
                  <p className="text-black">
                    Room No: {booking.room?.roomNo || "N/A"}
                  </p>
                  <p className="text-black">
                    Floor No: {booking.room?.floorNo || "N/A"}
                  </p>
                  <p className="text-black">
                    Capacity: {booking.room?.capacity || "N/A"} people
                  </p>
                  <p className="text-black">
                    Amenities:{" "}
                    {booking.room?.amenities
                      ? booking.room.amenities.join(", ")
                      : "N/A"}
                  </p>
                  <p className="text-green-600 mt-2 font-bold">
                    Date: {new Date(booking.date).toLocaleDateString()}
                  </p>
                  <p className="text-black">
                    Time:{" "}
                    {booking.slots
                      .map((slot: any) => `${slot.startTime} - ${slot.endTime}`)
                      .join(", ")}
                  </p>
                  <p
                    className={`mt-4 text-lg font-bold ${
                      booking.isConfirmed === "confirmed"
                        ? "text-green-600"
                        : booking.isConfirmed === "pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    Status:{" "}
                    {booking.isConfirmed.charAt(0).toUpperCase() +
                      booking.isConfirmed.slice(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2 className="text-3xl mt-5 mb-2 font-medium tracking-wider text-center">
          There is no booking history
        </h2>
      )}
    </div>
  );
};

export default MyBooking;
