// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Avatar, Card } from "antd";
// import "../styles/custom.css"

// const testimonials = [
//   {
//     name: "Mr. John Doe",
//     role: "CLIENT",
//     testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     imgSrc:
//       "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
//   },
//   {
//     name: "Ms. Jane Smith",
//     role: "CLIENT",
//     testimonial: "Ut elit tellus, luctus nec ullamcorper mattis.",
//     imgSrc:
//       "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
//   },
//   {
//     name: "Mr. Michael Lee",
//     role: "CLIENT",
//     testimonial: "Pulvinar dapibus leo lorem ipsum dolor sit amet.",
//     imgSrc:
//       "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
//   },
//   {
//     name: "Mrs. Emma Watson",
//     role: "CLIENT",
//     testimonial: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     imgSrc:
//       "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
//   },
//   {
//     name: "Mr. Chris Evans",
//     role: "CLIENT",
//     testimonial: "Ut elit tellus, luctus nec ullamcorper mattis.",
//     imgSrc:
//       "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
//   },
// ];

// const TestimonialSection = () => {
//   return (
//     <section className=" lg:pb-48  min-h-screen">
//       <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-8 space-y-8 lg:space-y-0 layout-padding">
//         {/* Left Side: Image */}
//         <div className="relative w-full lg:w-1/2">
//           <img
//             src="https://res.cloudinary.com/dwelabpll/image/upload/v1725475212/the-27-best-office-plants-3803-1642137541436_ceeyqx.webp"
//             alt="Testimonial Section"
//             className="w-full h-auto object-cover rounded-lg"
//           />
//         </div>

//         {/* Right Side: Writings */}
//         <div className="w-full lg:w-1/2 space-y-6 text-left lg:pl-12">
//           <h2 className="text-3xl lg:text-4xl font-bold">
//             Discover What Our Members Have To Say About Their Experience.
//           </h2>
//           <p className="text-gray-600">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
//             tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
//           </p>
//           <button className="bg-green-500 text-white px-6 py-3  rounded-lg hover:bg-green-600">
//             Explore Rooms
//           </button>
//         </div>
//         {/* Carousel overlapping both sides */}
//         <div className="absolute bottom-0 right-0 w-full lg:w-3/4 bg-gray-100 shadow-lg p-6  lg:right-[5%]  lg:bottom-[-30%] testimonial-custom">
//           <Carousel
//             showThumbs={false}
//             showStatus={false}
//             infiniteLoop
//             autoPlay
//             interval={3000}
//             stopOnHover
//             showIndicators={false}
//             centerMode
//             centerSlidePercentage={33.333} // Show 3 cards at a time
//             className="flex items-center "
//           >
//             {testimonials.map((testimonial, index) => (
//               <Card
//                 key={index}
//                 className="p-4 shadow-md rounded-lg mx-2"
//                 style={{ width: "100%", maxWidth: "300px" }}
//               >
//                 <div className="flex items-center space-x-4">
//                   <Avatar
//                     src={testimonial.imgSrc}
//                     size={64}
//                     className="flex-shrink-0"
//                   />
//                   <div className="text-left">
//                     <p className="text-gray-800 font-semibold">
//                       {testimonial.name}
//                     </p>
//                     <p className="text-sm text-green-600">{testimonial.role}</p>
//                     <p className="text-gray-600 text-sm">
//                       {testimonial.testimonial}
//                     </p>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSection;
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Avatar, Card } from "antd";
import "../styles/custom.css";
import Aos from "aos";

const testimonials = [
  {
    name: "Mr. John Doe",
    role: "CLIENT",
    testimonial: " The facilities were top-notch, Highly recommend!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1725476958/close-up-portrait-of-smiling-handsome-young-caucasian-man-face-looking-at-camera-on-isolated-light-gray-studio-background-photo_ztom4p.jpg",
  },
  {
    name: "Ms. Jane Smith",
    role: "CLIENT",
    testimonial: " Clean, well-equipped, and provided a great environment",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161931/Testimonial-Videos-1_di6gde.png",
  },
  {
    name: "Mr. Michael Lee",
    role: "CLIENT",
    testimonial: "Our experience was fantastic! Staff were incredibly helpful",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727162014/images_5_oyzjjc.jpg",
  },
  {
    name: "Mrs. Emma Watson",
    role: "CLIENT",
    testimonial: "The meeting room was spacious and comfortable",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161859/positive-mindset-positive-life-portrait-happy-young-woman-home_590464-22422_pxuwht.avif",
  },
  {
    name: "Jessica Anne M",
    role: "CLIENT",
    testimonial: "The booking process was simple and efficient.Impressive!",
    imgSrc:
      "https://res.cloudinary.com/dwelabpll/image/upload/v1727161761/portrait-young-indian-woman-happy-with-internship-human-resources-opportunity-mission-vision-company-values-goals-face-headshot-gen-z-pe_lsoixl.avif",
  },
];

const TestimonialSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  const [slidePercentage, setSlidePercentage] = useState(
    window.innerWidth < 640 ? 100 : 33.333
  );

  useEffect(() => {
    const handleResize = () => {
      const percentage = window.innerWidth < 640 ? 100 : 33.333;
      setSlidePercentage(percentage);
    };

    
    window.addEventListener("resize", handleResize);

   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="lg:pb-48 min-h-screen">
      <div className="relative flex flex-col lg:flex-row items-center justify-between bg-gray-100 p-8 space-y-8 lg:space-y-0 layout-padding">
        {/* Left Side: Image */}
        <div className="relative w-full lg:w-1/2" data-aos="zoom-in-left">
          <img
            src="https://res.cloudinary.com/dwelabpll/image/upload/v1725475212/the-27-best-office-plants-3803-1642137541436_ceeyqx.webp"
            alt="Testimonial Section"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>


        <div
          className="w-full lg:w-1/2 space-y-6 text-left lg:pl-12"
          data-aos="fade-up"
        >
          <h2 className="text-3xl lg:text-4xl font-bold">
            Discover What Our Clients Have To Say About Their Experience.
          </h2>
          <p className="text-gray-600">
            Our clients consistently praise our commitment to quality and service. 
            From the friendly staff to the well-equipped meeting rooms, we strive to create an environment that fosters productivity and collaboration. 
            Join the growing list of satisfied clients who trust us for their meeting needs.
          </p>
          <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600">
            Explore Rooms
          </button>
        </div>

        <div
          className="absolute bottom-0 right-0 w-full lg:w-3/4 bg-gray-100 shadow-lg p-6 lg:right-[5%] lg:bottom-[-30%] testimonial-custom"
          data-aos="fade-up"
        >
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={3000}
            stopOnHover
            showIndicators={false}
            centerMode
            centerSlidePercentage={slidePercentage}
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
