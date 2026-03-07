import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const IntroScreen = () => {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  const handleEnterStore = () => {
    setShowIntro(false);
    setTimeout(() => {
      navigate("/shop/home");
    }, 1000);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#050505]">
      <AnimatePresence>
        {showIntro && (
          <motion.div
            key="intro-screen"
            onClick={handleEnterStore}
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              scale: 1.05,
              filter: "blur(40px)",
            }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[#050505] text-[#F5F5F7] cursor-pointer"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.05)_0%,transparent_70%)]"
            />

            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="overflow-hidden mb-2 px-4 text-center">
                <motion.h1
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-7xl md:text-9xl font-light tracking-[0.2em] md:tracking-[0.5em] uppercase"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    textShadow: "0 0 40px rgba(255,255,255,0.05)",
                  }}
                >
                  KoKhaN
                </motion.h1>
              </div>

              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.2em" }}
                animate={{ opacity: 0.5, letterSpacing: "1.2em" }}
                transition={{ duration: 2, delay: 0.8 }}
                className="text-[10px] md:text-xs uppercase font-light text-gray-400 mt-6 mb-24"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                The Curated Collection
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="group relative"
              >
                <motion.div
                  className="absolute -inset-4 border border-white/5 rounded-full"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />

                <div className="flex flex-col items-center gap-6">
                  <div className="h-px w-20 bg-linear-to-r from-transparent via-white/20 to-transparent" />

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden px-8 py-3 rounded-full border border-white/10 backdrop-blur-sm transition-all hover:bg-white hover:text-black duration-500"
                  >
                    <span
                      className="text-[10px] uppercase tracking-[0.6em] font-medium"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Enter Experience
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ delay: 2, duration: 2 }}
              className="absolute bottom-12 text-[9px] uppercase tracking-[0.5em] font-light"
            >
              Est. 2024 • Excellence In Every Thread
            </motion.div>

            <div className="absolute top-8 left-8 w-12 h-12">
              <div className="absolute top-0 left-0 w-px h-full bg-white/10" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 rotate-180">
              <div className="absolute top-0 left-0 w-px h-full bg-white/10" />
              <div className="absolute top-0 left-0 w-full h-px bg-white/10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center bg-[#050505]">
        <motion.div
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[10px] uppercase tracking-[1em] text-white/20 font-light"
        >
          Refining Perspective
        </motion.div>
      </div>
    </div>
  );
};

export default IntroScreen;
