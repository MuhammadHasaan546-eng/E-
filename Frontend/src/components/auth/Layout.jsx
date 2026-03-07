import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Sparkles, ShieldCheck } from "lucide-react";

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-white overflow-hidden">
      {/* Left Side: Animated Brand Experience */}
      <div className="hidden lg:flex flex-col items-center justify-center bg-slate-950 w-1/2 px-12 relative overflow-hidden">
        {/* --- ANIMATED BACKGROUND ELEMENTS --- */}
        {/* Floating Gradient Orb 1 */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-5%] w-96 h-96 bg-indigo-900/20 rounded-full blur-[100px]"
        />

        {/* Floating Gradient Orb 2 */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-slate-800/30 rounded-full blur-[120px]"
        />

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 w-full max-w-md text-center space-y-10">
          {/* Animated Icon Container */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2,
            }}
            className="flex justify-center"
          >
            <div className="relative p-6 rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <ShoppingBag className="h-14 w-14 text-white" />
              {/* Floating Mini Stars */}
              <motion.div
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-2 -right-2 text-yellow-500"
              >
                <Star className="h-5 w-5 fill-current" />
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content with Stagger Effect */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-6xl font-serif font-bold tracking-tighter text-white"
            >
              KOKHAN
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="h-1 w-20 bg-linear-to-r from-transparent via-slate-500 to-transparent mx-auto"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-slate-400 text-lg font-medium leading-relaxed italic"
            >
              "Where tradition meets modern elegance. Step into the world of
              premium lifestyle."
            </motion.p>
          </div>

          {/* Trust Badges with Hover Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex items-center justify-center gap-8 pt-10 border-t border-white/5"
          >
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              Secure
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              Premium
            </div>
          </motion.div>
        </div>

        {/* Bottom Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 text-white text-[10px] uppercase tracking-[0.5em] font-light"
        >
          Established 2026 • Charsadda
        </motion.p>
      </div>

      {/* Right Side: Form Area */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-1 items-center justify-center bg-slate-50/30 px-4 py-12 relative"
      >
        <div className="w-full max-w-md z-10">
          <Outlet />
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
