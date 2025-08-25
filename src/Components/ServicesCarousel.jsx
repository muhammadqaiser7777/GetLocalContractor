import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { allServices } from "./servicesData";
import { Link } from "react-router-dom";

const ServicesCarousel = () => {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const requestRef = useRef();
  const prevTimestamp = useRef(0);
  const speed = 50; 
  const [isHovered, setIsHovered] = useState(false);

  const animate = (timestamp) => {
    if (!prevTimestamp.current) prevTimestamp.current = timestamp;
    const delta = timestamp - prevTimestamp.current;
    prevTimestamp.current = timestamp;

    if (!isHovered) {
      const moveBy = (speed * delta) / 1000;
      x.set(x.get() - moveBy);

      
      const totalWidth = containerRef.current.scrollWidth / 2;
      if (Math.abs(x.get()) >= totalWidth) {
        x.set(0);
      }
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isHovered]);

  return (
    <div className="overflow-hidden relative w-full bg-secondary py-6">
      <motion.div
        className="flex whitespace-nowrap"
        ref={containerRef}
        style={{ x }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Duplicate services to make it seamless */}
        {[...allServices, ...allServices].map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex-shrink-0 px-4"
          >
            <Link
              to={`/services/${service.title}`}
              className="block px-6 py-3 bg-primary text-secondary rounded-lg shadow-md hover:bg-secondary-foreground transition-all"
            >
              {service.title}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ServicesCarousel;
