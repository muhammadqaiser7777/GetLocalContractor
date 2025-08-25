import React, { useState, useEffect } from "react";
import { FiChevronUp } from "react-icons/fi";

const ScrollUp = () => {
  const [showScroll, setShowScroll] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;
      setScrollPercent(scrolled);
      setShowScroll(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    showScroll && (
      <div
        onClick={scrollTop}
        className="fixed bottom-5 right-5 cursor-pointer z-50"
      >
        <div
          className="relative w-12 h-12 flex items-center justify-center rounded-full bg-primary text-secondary shadow-2xl hover:scale-105 transition-all duration-300"
        >
          <svg
            className="absolute top-0 left-0 w-full h-full transform -rotate-90"
            viewBox="0 0 36 36"
          >
            <path
              className="text-secondary-foreground"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset={100 - scrollPercent}
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <FiChevronUp className="w-6 h-6 z-10" />
        </div>
      </div>
    )
  );
};

export default ScrollUp;
