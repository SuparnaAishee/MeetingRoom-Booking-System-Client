import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Avatar, Card } from "antd";

const testimonials = [
  {
    name: "Mr. John Doe",
    role: "CLIENT",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Ms. Jane Smith",
    role: "CLIENT",
    testimonial: "Ut elit tellus, luctus nec ullamcorper mattis.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Mr. Michael Lee",
    role: "CLIENT",
    testimonial: "Pulvinar dapibus leo lorem ipsum dolor sit amet.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Mrs. Emma Watson",
    role: "CLIENT",
    testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Mr. Chris Evans",
    role: "CLIENT",
    testimonial: "Ut elit tellus, luctus nec ullamcorper mattis.",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="pb-32 lg:pb-48 layout-padding">
      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-8 space-y-8 lg:space-y-0 layout-padding">
        {/* Left Side: Image */}
        <div className="relative w-full lg:w-1/2">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725475212/the-27-best-office-plants-3803-1642137541436_ceeyqx.webp"
            alt="Testimonial Section"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Right Side: Writings */}
        <div className="w-full lg:w-1/2 space-y-6 text-left lg:pl-12">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Discover What Our Members Have To Say About Their Experience.
          </h2>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
          {/* <button className="bg-green-500 text-white px-6 py-3  rounded-lg hover:bg-green-600">
            Discover All
          </button> */}
        </div>

        {/* Carousel overlapping both sides */}
        <div className="absolute bottom-0 right-0 w-full lg:w-3/4 bg-green-400 shadow-lg p-6  lg:right-[15%]  lg:bottom-[-45%] ">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            stopOnHover
            showIndicators={false}
            centerMode
            centerSlidePercentage={33.33} // Show 3 cards at a time
            className="flex items-center"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-4 shadow-md rounded-lg mx-2"
                style={{ width: "100%", maxWidth: "300px" }}
              >
                <div className="flex items-center space-x-4">
                  <Avatar
                    src={testimonial.imgSrc}
                    size={64}
                    className="flex-shrink-0"
                  />
                  <div className="text-left">
                    <p className="text-gray-800 font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-green-600">{testimonial.role}</p>
                    <p className="text-gray-600 text-sm">
                      {testimonial.testimonial}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
