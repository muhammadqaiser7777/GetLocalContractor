import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { allServices } from "../Components/servicesData";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";

const Services = ({ visibleServices, homeView = false }) => {
  const navigate = useNavigate();

  return (
    <div className="py-16">
      <h1
        className={`font-bold md:text-4xl sm:text-2xl text-xl text-center pt-10 pb-20 ${
          homeView ? "hidden" : ""
        }`}
      >
        <span className="absolute left-[80%] sm:left-[66%] md:left-[70%] top-29">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70px] h-[14px] sm:w-[90px] sm:h-[18px] md:w-[123px] md:h-[24px]"
            viewBox="0 0 123 24"
            fill="none"
          >
            <path d="M0 5.74514H6V17.7451H0V5.74514Z" fill="#ffb000"></path>
            <path d="M6 8.74514H103V14.7451H6V8.74514Z" fill="#ffb000"></path>
            <path
              d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
              fill="#ffb000"
            ></path>
          </svg>
        </span>
        OUR SERVICES
        <span className="absolute left-[5%] sm:left-[20%] md:left-[16%]  top-29 -scale-x-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-[70px] h-[14px] sm:w-[90px] sm:h-[18px] md:w-[123px] md:h-[24px]"
            viewBox="0 0 123 24"
            fill="none"
          >
            <path d="M0 5.74514H6V17.7451H0V5.74514Z" fill="#ffb000"></path>
            <path d="M6 8.74514H103V14.7451H6V8.74514Z" fill="#ffb000"></path>
            <path
              d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
              fill="#ffb000"
            ></path>
          </svg>
        </span>
      </h1>

      <div className="container mx-auto px-6 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 cursor-pointer">
          {allServices.slice(0, visibleServices).map((service) => (
            <div
              key={service.id}
              className="bg-secondary-foreground text-secondary shadow-md  rounded-4xl p-6 text-center hover:scale-105 transition-transform duration-500"
              onClick={() => navigate(`/Services/${service.title}`)}
            >
              <div className="mb-4">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-20 h-20 mx-auto"
                  loading="lazy"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 ">{service.title}</h3>
              <p className="text-secondary mb-4">{service.description}</p>
              <button className="px-20 py-2 bg-secondary text-white rounded-lg cursor-pointer">
                Get Quote
              </button>
            </div>
          ))}
        </div>
        {visibleServices < allServices.length && (
          <Link to="/Services">
            <div className="flex justify-center mt-10">
              <Button className="text-secondary cursor-pointer ">
                All Services
              </Button>
            </div>
          </Link>
        )}
      </div>
      {/* Divider line */}
      <div className={`flex items-center justify-center my-8 ${homeView ? "hidden" : ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 123 24"
          fill="none"
          className="mr-2"
        >
          <path
            d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
            fill="#ffb000"
          />
        </svg>
        <div className="border-t border-secondary w-full max-w-md"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 123 24"
          fill="none"
          className="ml-2 -scale-x-100"
        >
          <path
            d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
            fill="#ffb000"
          />
        </svg>
      </div>
    </div>
  );
};

export default Services;
