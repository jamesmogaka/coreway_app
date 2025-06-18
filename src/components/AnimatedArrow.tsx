import * as React from "react";
import { motion } from "framer-motion";

export const AnimatedArrow: React.FC = () => {
  const handleScroll = () => {
    window.scrollBy({
      top: window.innerHeight * 0.4, // Scroll down by 40% of the viewport height
      behavior: "smooth",
    });
  };

  return (
    <motion.div
      onClick={handleScroll}
      className="absolute bottom-32 left-[48%] -translate-x-1/2 cursor-pointer z-50 hidden md:block"
      animate={{
        y: ["0%", "20%", "0%"],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <svg
        className="w-8 h-8 text-yellow-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </motion.div>
  );
};
