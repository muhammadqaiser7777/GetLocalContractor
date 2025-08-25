import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-5 h-5 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
      animate={{ x: position.x + 10, y: position.y + 10 }}
      transition={{ type: "spring", stiffness: 600, damping: 30 }}
    />
  );
};

export default Cursor;
