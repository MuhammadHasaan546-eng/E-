import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Lock } from "lucide-react";

const UnAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050505] text-white overflow-hidden font-serif">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-[#d4af37] blur-3xl opacity-10 rounded-full"></div>
        <div className="relative border border-[#d4af37]/30 p-8 rounded-full">
          <Lock size={48} strokeWidth={1} className="text-[#d4af37]" />
        </div>
      </motion.div>

      <div className="z-10 text-center px-6">
        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-5xl font-light tracking-[10px] uppercase mb-6"
        >
          Limited Access
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="max-w-md mx-auto text-gray-400 font-light tracking-wide leading-relaxed mb-10 italic"
        >
          Membership has its privileges. It appears your current account does
          not hold the credentials required for this collection.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => navigate("/auth/login")}
            className="px-8 py-3 bg-[#d4af37] text-black text-xs uppercase tracking-[2px] font-bold hover:bg-white transition-all duration-500"
          >
            Sign In
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 border border-white/20 text-white text-xs uppercase tracking-[2px] hover:border-[#d4af37] transition-all duration-500"
          >
            Return Home
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center text-[10px] uppercase tracking-[5px] text-gray-600 opacity-50">
        KoKhaN Private Concierge
      </div>
    </div>
  );
};

export default UnAuth;
