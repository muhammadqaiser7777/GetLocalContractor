import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Services from "./Services";
import WhyUs from "@/Components/WhyUs";
import ServicesCarousel from "@/Components/ServicesCarousel";

const Home = () => {
  // Typing effect words for the second h1
  const words = ["expertise", "solutions", "team", "success"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [typingSpeed, setTypingSpeed] = useState(150);

  // Typing effect logic
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const handleTyping = () => {
      if (!isDeleting && text.length < currentWord.length) {
        setText(currentWord.slice(0, text.length + 1));
      } else if (isDeleting && text.length > 0) {
        setText(currentWord.slice(0, text.length - 1));
      } else if (!isDeleting && text.length === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
        setTypingSpeed(100);
      } else if (isDeleting && text.length === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length); // Cycle words
        setTypingSpeed(150);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, currentWordIndex, words, typingSpeed]);

  // SVG animation variants
  const svgPathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" },
        opacity: { duration: 0.1 },
      },
    },
  };

  // First h1 animation variants
  const h1Variants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  return (
    <div>
      <div className="relative md:w-full md:h-screen h-screen flex items-center bg-black">
        {/* Hero Section Background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/assets/images/hero-background.jpg')",
          }}
          loading="lazy"
        ></div>

        {/* Hero Content */}
        <div className="relative text-secondary-foreground ml-10">
          {/* SVG with creation effect */}
          <motion.div initial="hidden" animate="visible" className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="123"
              height="24"
              viewBox="0 0 123 24"
              fill="none"
            >
              <motion.path
                d="M0 5.74514H6V17.7451H0V5.74514Z"
                fill="#ffb000"
                variants={svgPathVariants}
              />
              <motion.path
                d="M6 8.74514H103V14.7451H6V8.74514Z"
                fill="#ffb000"
                variants={svgPathVariants}
              />
              <motion.path
                d="M99 11.7451L110.745 0L122.49 11.7451L110.745 23.4903L99 11.7451Z"
                fill="#ffb000"
                variants={svgPathVariants}
              />
            </svg>
          </motion.div>

          {/* First h1 sliding from left */}
          <motion.h1
            className="text-4xl font-bold"
            initial="hidden"
            animate="visible"
            variants={h1Variants}
          >
            Get Local Contractors
          </motion.h1>

          {/* Second h1 with typing effect */}
          <h1 className="text-primary text-2xl font-semibold">
            Your project, our{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={currentWordIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="inline-block"
              >
                {text}
              </motion.span>
            </AnimatePresence>{" "}
            – a perfect match.
          </h1>
          
        </div>
        

        {/* Right Side Image */}
        <div className="absolute md:right-0 md:bottom-0 md:top-22 top-80 right-5 hidden md:block">
          <img
            src="/assets/images/side-portrait.png"
            alt="Contractor working"
            className="md:w-xl md:h-118 w-sm h-60"
          />
        </div>  
      </div>
      

      {/* Services Section */}
      <section className="bg-secondary">
        <Services visibleServices={4} homeView={true} />
      </section>

      {/* Divider Line */}
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

      {/* Why Choose Us Section */}
      <section className="">
        <WhyUs />
      </section>


      {/* Carousel Section */}
      <section className="mt-20">
        <ServicesCarousel />
      </section>
      {/* Divider Line */}
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
    </div>
  );
};

export default Home;