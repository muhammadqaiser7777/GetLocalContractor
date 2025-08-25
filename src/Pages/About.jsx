import React from "react";
import { useNavigate } from "react-router-dom";
import WhyUs from "@/Components/WhyUs";

const About = () => {
  const navigate = useNavigate();
  return (
    <div className="py-16">
      {/* Hero Section */}
      <h1
        className="font-bold md:text-4xl sm:text-2xl text-xl text-center pt-10 pb-20"
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
        ABOUT US
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
      <div className="container mx-auto px-6 lg:px-20 py-12">
        <p className="text-[#1f2020] text-lg leading-relaxed text-center">
          GetLocalContractors is an innovative way for you to connect with home
          service providers nearby. Finding the right home contractor according
          to your needs and budget can be a daunting task. We make it easy for
          home owners to connect with multiple qualified professionals in their
          area. Able to compare services and budgets and make inform decisions.
          This all can be achieved by few clicks by filling the form.
        </p>
        <div className="pl-8 pt-10">
          <h1 className="font-bold">
            What getlocalcontractors helps you with?
          </h1>
          <ul>
            <li>- To find the right Professional near you</li>
            <li>
              - It saves you time as you do not have to find different
              contractors through extensive searches.
            </li>
            <li>- Compare multi quotations and make the right decision.</li>
            <li>- Find the right professional and get the job done</li>
          </ul>
        </div>
      </div>

      {/* Divider line */}
      <div className="flex items-center justify-center my-8">
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

      {/* why choose us section */}
      <section>
        <WhyUs/>
      </section>

    </div>
  );
};

export default About;
