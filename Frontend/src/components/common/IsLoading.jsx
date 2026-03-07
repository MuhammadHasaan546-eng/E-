import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Loading = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000); // Luxury feel ke liye 2 seconds behtar hain

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="loader"
          // EXIT ANIMATION: Smoothly zooms out and blurs
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
        >
          {/* Subtle Ambient Glow */}
          <motion.div
            animate={{ opacity: [0.05, 0.1, 0.05] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute w-[400px] h-[400px] bg-[#d4af37] blur-[120px] rounded-full"
          />

          <div className="relative flex flex-col items-center">
            {/* Animated Logo Symbol */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-10"
            >
              <div className="relative w-20 h-20 border border-[#d4af37]/20 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                  className="absolute inset-0 border-t border-b border-[#d4af37] rounded-full"
                ></motion.div>
                <span className="text-[#d4af37] text-3xl font-extralight italic">
                  K
                </span>
              </div>
            </motion.div>

            {/* Store Name with Smooth Letter Spacing */}
            <motion.h2
              className="text-white text-4xl font-extralight tracking-[20px] uppercase ml-[20px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              KoKhaN
            </motion.h2>

            {/* Slow & Smooth Progress Bar */}
            <div className="mt-12 w-64 h-[1px] bg-white/5 overflow-hidden relative">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5, // Thora slow kiya taake premium lage
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-6 text-[9px] text-gray-400 uppercase tracking-[6px]"
            >
              Establishing Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loading;
