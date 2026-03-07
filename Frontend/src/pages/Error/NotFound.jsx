import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#0a0a0a] text-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
        <h1 className="text-[20vw] font-bold tracking-tighter">KOKHAN</h1>
      </div>

      <div className="relative z-10 text-center px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-8xl md:text-9xl font-extralight tracking-[20px] mb-4 text-[#d4af37]"
        >
          404
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <h3 className="text-xl md:text-2xl font-light uppercase tracking-[5px] mb-8">
            Lost in Elegance
          </h3>
          <p className="max-w-md mx-auto text-gray-500 font-light leading-relaxed mb-12">
            The page you are looking for has been moved to a private collection
            or no longer exists in our store.
          </p>
        </motion.div>

        {/* Luxury Button */}
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="px-10 py-4 border border-white/30 rounded-full text-xs uppercase tracking-[3px] transition-all duration-500 hover:border-white"
        >
          Back to Gallery
        </motion.button>
      </div>

      <motion.div
        initial={{ height: 0 }}
        animate={{ height: "100px" }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-0 w-[1px] bg-gradient-to-t from-[#d4af37] to-transparent"
      />
    </div>
  );
};

export default NotFound;
