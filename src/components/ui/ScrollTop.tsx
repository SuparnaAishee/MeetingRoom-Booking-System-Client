
import { useState, useEffect } from "react";

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const updateScrollProgress = () => {
    const totalHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    setScrollProgress(progress);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("scroll", updateScrollProgress);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("scroll", updateScrollProgress);
    };
  }, []);

  return (
    <div
      id="scrollToTopButton"
      className={`fixed bottom-10 right-10 p-2   transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={scrollToTop}
    >
      <div className="relative w-12 h-12 rounded-full bg-green-500 border-4 border-white flex items-center justify-center cursor-pointer hover:scale-110">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 15l7-7 7 7"
          ></path>
        </svg>
        <svg className="absolute top-0 left-0 w-full h-full progress-circle">
          <circle
            cx="50%"
            cy="50%"
            r="24"
            strokeWidth="4"
            fill="none"
            stroke="#22c55e" // green color for progress circle
            pathLength="100"
            className="transform rotate-180 -rotate-90"
            style={{ strokeDasharray: `${scrollProgress} 100` }}
          ></circle>
        </svg>
      </div>
    </div>
  );
};

export default ScrollToTop;
