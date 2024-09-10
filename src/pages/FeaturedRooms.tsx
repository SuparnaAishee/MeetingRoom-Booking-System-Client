import React, { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "antd";
import { Link } from "react-router-dom";
import { useGetRoomsQuery } from "../redux/features/roomsApi";
import { UserOutlined } from "@ant-design/icons";
import AOS from "aos";

interface Room {
  _id: string;
  name: string;
  capacity: number;
  pricePerSlot: number;
  image: string[];
}

const FeaturedRooms: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200, 
    });
  }, []);

  const { data, error, isLoading } = useGetRoomsQuery({ limit: 6 });
  const [roomsToDisplay, setRoomsToDisplay] = useState<Room[]>([]);

  useEffect(() => {
    if (data?.data?.rooms) {
      setRoomsToDisplay(data.data.rooms.slice(0, 6)); 
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading rooms.</div>;

  return (
    <div className="p-8 bg-white layout-padding">
      <h2
        className="text-4xl font-bold text-center text-green-600 mb-8 "
        data-aos="fade-up"
      >
        Featured Rooms
      </h2>

      {/* Rooms List */}
      <Row gutter={[16, 16]}>
        {roomsToDisplay.length > 0 ? (
          roomsToDisplay.map((room: Room) => (
            <Col xs={24} md={12} lg={8} key={room._id}>
              <Card
                hoverable
                className="relative overflow-hidden rounded-lg shadow-lg h-64"
                data-aos="fade-up"
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
      <div className="text-center mt-8">
        <Link to="/rooms">
          <Button className="bg-green-500 text-white py-6 px-6 text-lg"data-aos="fade-up">
            See More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedRooms;
