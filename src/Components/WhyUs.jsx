import React, { useState } from "react";
import { Link } from "react-router-dom";

const WhyUs = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState(null);

  const statements = [
    {
      title: "Reliable & Verified Professionals",
      sub: "We work only with trusted local professionals who are thoroughly vetted and background-checked. Whether it's plumbing, roofing, or remodeling, you get peace of mind knowing you’re hiring someone from your own community with a reputation for quality work.",
    },
    {
      title: "Nationwide Service, Local Touch",
      sub: "Although we operate across the United States, our contractors deliver personalized, locally-focused service. We connect you to professionals who understand your region’s specific needs—from weather conditions to building codes.",
    },
    {
      title: "Fast & Reliable Quotes",
      sub: "Skip the endless calls and get fast, no-obligation quotes from top contractors in your area. Just tell us what you need, and we’ll handle the rest—making your home improvement journey simple and stress-free.",
    },
  ];

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Title Section */}
      <h1 className="font-bold md:text-4xl sm:text-2xl text-xl text-center pb-10">
        WHY CHOOSE US
      </h1>

      {/* Video & Content Container */}
      <div className="relative w-full overflow-hidden">
        {/* Video */}
        <video
          src="/assets/videos/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setIsLoading(false)}
          className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] object-cover"
        />

        {/* Skeleton Loader */}
        {isLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-secondary animate-pulse z-10 " />
        )}

        {/* Overlay Content Wrapper */}
        <div className="relative lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 bg-primary bg-opacity-80 text-secondary p-6 w-full lg:w-1/2 z-20 lg:rounded-lg">
        <h1
        className="font-bold md:text-3xl sm:text-2xl text-xl text-center pt-10 pb-20"
      >
        <span className="absolute left-[80%] sm:left-[66%] md:left-[75%] top-19">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70px] h-[14px] sm:w-[90px] sm:h-[18px] md:w-[80px] md:h-[24px]"
            viewBox="0 0 123 24"
            fill="none"
          >
            <path d="M0 5.74514H6V17.7451H0V5.74514Z" fill="#1f2020"></path>
            <path d="M6 8.74514H103V14.7451H6V8.74514Z" fill="#1f2020"></path>
            <path
              d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
              fill="#1f2020"
            ></path>
          </svg>
        </span>
        OUR FEATURES
        <span className="absolute left-[5%] sm:left-[20%] md:left-[12%]  top-19 -scale-x-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70px] h-[14px] sm:w-[90px] sm:h-[18px] md:w-[80px] md:h-[24px]"
            viewBox="0 0 123 24"
            fill="none"
          >
            <path d="M0 5.74514H6V17.7451H0V5.74514Z" fill="#1f2020"></path>
            <path d="M6 8.74514H103V14.7451H6V8.74514Z" fill="#1f2020"></path>
            <path
              d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
              fill="#1f2020"
            ></path>
          </svg>
        </span>
      </h1>

          {statements.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`mb-4 p-3 rounded-md transition-all duration-200 ${
                  isOpen
                    ? "bg-secondary text-secondary-foreground"
                    : "hover:bg-secondary hover:text-secondary-foreground"
                }`}
              >
                <div
                  onClick={() => toggleIndex(index)}
                  className="cursor-pointer flex items-center justify-between md:justify-start gap-2"
                >
                  <p className="font-semibold text-lg">{item.title}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    <path
                      d="M0.247423 16.3415C-0.116259 16.7571 -0.0741412 17.3889 0.341495 17.7526C0.757132 18.1163 1.38889 18.0741 1.75258 17.6585L0.247423 16.3415ZM15.9978 0.933481C15.961 0.38242 15.4845 -0.0345222 14.9335 0.00221496L5.95341 0.600887C5.40235 0.637624 4.98541 1.11413 5.02215 1.66519C5.05889 2.21625 5.53539 2.63319 6.08645 2.59646L14.0687 2.0643L14.6009 10.0466C14.6376 10.5976 15.1141 11.0146 15.6652 10.9779C16.2163 10.9411 16.6332 10.4646 16.5965 9.91355L15.9978 0.933481ZM1.75258 17.6585L15.7526 1.65851L14.2474 0.341496L0.247423 16.3415L1.75258 17.6585Z"
                      fill={isOpen ? "#ffb000" : "white"}
                    />
                  </svg>
                </div>
                {isOpen && (
                  <p className="mt-2 text-sm text-primary">{item.sub}</p>
                )}
              </div>
            );
          })}
          <Link to="/services">
          <button className="mt-4 bg-accent text-secondary px-6 py-2 rounded-md cursor-pointer font-semibold">
            Get Services
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
