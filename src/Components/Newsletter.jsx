import React from "react";
import { Link } from "react-router-dom";

const Newsletter = () => {
  return (
    <div className="bg-primary text-secondary p-20">
      <div className="flex items-center w-full flex-col sm:flex-row gap-y-4">
        {/* Left Text */}
        <span className="text-2xl font-bold whitespace-nowrap">
          Get Our Services
        </span>

        {/* Line between */}
        <div className="flex-grow h-[2px] bg-secondary-foreground mx-4" />

        {/* Button */}
        <Link to="/services">
          <button className="bg-accent text-secondary px-6 py-2 rounded-md cursor-pointer font-semibold whitespace-nowrap">
            Get Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Newsletter;
