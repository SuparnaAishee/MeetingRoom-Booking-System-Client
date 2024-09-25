import Aos from "aos";
import { useEffect } from "react";

const BlogSection = () => {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  const blogPosts = [
    {
      day: "10",
      month: "MAY",
      category: "MEETSPACE",
      title: "Discover Inspiring Stories from Our Meet Space",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      imgSrc:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1725479365/stock-photo-multiethnic-businesspeople-formal-wear-conference-office_xin8ca.jpg",
    },
    {
      day: "17",
      month: "JULY",
      category: "MEETSPACE",
      title: "Innovations in Workspace Design and Functionality",
      description: "Ut elit tellus, luctus nec ullamcorper mattis...",
      imgSrc:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1725479050/istockphoto-557608497-612x612_z457lp.webp",
    },
    {
      day: "23",
      month: "AUGUST",
      category: "MEETSPACE",
      title: "Workspace News: Redefining Productivity and Collaboration",
      description: "Pulvinar dapibus leo lorem ipsum dolor sit amet...",
      imgSrc:
        "https://res.cloudinary.com/dwelabpll/image/upload/v1725478984/istockphoto-1337995272-612x612_fizg4d.jpg",
    },
  ];

  return (
    <section className="py-16 bg-white layout-padding">
      <div className="container mx-auto px-4"data-aos="fade-down">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold">
            Discover Our Working Spaces Content & News.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="bg-gray-100 shadow-lg rounded-lg overflow-hidden relative"
            >
              <div className="relative w-full h-64">
                <img
                  src={post.imgSrc}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
              </div>

              {/* Workspace label */}
              <div className="absolute top-0 left-0 bg-black text-white text-sm font-bold py-1 px-4 rounded-br-lg">
                {post.category}
              </div>

              {/* Date label */}
              <div className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-green-600 text-white font-bold py-2 px-3 rounded-r-lg text-center">
                <span className="text-xl block">{post.day}</span>
                <span className="text-sm block">{post.month}</span>
              </div>

              <div className="p-6 mt-6">
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-gray-600">{post.description}</p>
                <a
                  href="#"
                  className="text-green-600 font-semibold hover:underline"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
