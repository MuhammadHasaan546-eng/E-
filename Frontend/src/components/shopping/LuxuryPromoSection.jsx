import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LuxuryPromoSection = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-20 bg-white overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 md:px-10 max-w-7xl mx-auto"
      >
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gray-50/50 backdrop-blur-sm border border-gray-100 p-10 md:p-14 text-zinc-900 shadow-xl shadow-gray-200/20 group cursor-pointer transition-all duration-500"
        >
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[120px] group-hover:bg-[#d4af37]/15 transition-all duration-1000" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 rounded-full bg-[#d4af37]"
                />
                <span className="text-[10px] font-bold text-[#b8962d] uppercase tracking-[5px]">
                  Limited Privilege
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-light mb-4 uppercase tracking-tighter leading-none text-zinc-900">
                Archive <br />
                <span className="font-serif italic text-[#d4af37]">
                  Seasonal
                </span>
              </h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl md:text-7xl font-bold tracking-tighter italic text-zinc-950">
                  50%
                </span>
                <span className="text-xl md:text-2xl font-light text-zinc-400 uppercase tracking-[4px]">
                  Off
                </span>
              </div>

              <p className="text-zinc-500 mb-10 max-w-xs font-light leading-relaxed text-sm md:text-base">
                Unlock exclusive access to our premium tailored archives. Luxury
                redefined.
              </p>
            </div>

            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/shop/listing");
              }}
              className="flex items-center gap-6 text-zinc-900 text-[10px] font-bold uppercase tracking-[4px] group/btn w-fit"
            >
              <span className="relative">
                Shop The Deals
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-zinc-900 group-hover/btn:w-full transition-all duration-500" />
              </span>
              <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center group-hover/btn:bg-zinc-900 group-hover/btn:border-zinc-900 transition-all duration-700">
                <ArrowRight className="w-5 h-5 text-zinc-400 group-hover/btn:text-white transition-colors" />
              </div>
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={cardVariants}
          whileHover={{ y: -10 }}
          className="relative rounded-[2.5rem] overflow-hidden bg-gray-50/50 backdrop-blur-sm border border-gray-100 p-10 md:p-14 text-zinc-900 shadow-xl shadow-gray-200/20 group cursor-pointer transition-all duration-500"
        >
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-zinc-100 rounded-full blur-[120px] group-hover:bg-zinc-200 transition-all duration-1000" />

          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-[5px]">
                  Modern Curations
                </span>
              </div>

              <h3 className="text-4xl md:text-6xl font-light mb-4 uppercase tracking-tighter leading-none text-zinc-900">
                Latest <br />
                <span className="font-serif italic text-zinc-600">
                  Elegance
                </span>
              </h3>

              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl md:text-7xl font-bold tracking-tighter italic text-zinc-950">
                  New
                </span>
                <span className="text-xl md:text-2xl font-light text-zinc-400 uppercase tracking-[4px]">
                  Drop
                </span>
              </div>

              <p className="text-zinc-500 mb-10 max-w-xs font-light leading-relaxed text-sm md:text-base">
                Discover the new era of aesthetics with our freshly tailored
                collection.
              </p>
            </div>

            <button
              onClick={() => {
                window.scrollTo(0, 0);
                navigate("/shop/listing");
              }}
              className="flex items-center gap-6 text-zinc-900 text-[10px] font-bold uppercase tracking-[4px] group/btn w-fit"
            >
              <span className="relative">
                Explore Now
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-zinc-900 group-hover/btn:w-full transition-all duration-500" />
              </span>
              <div className="w-14 h-14 rounded-full border border-zinc-200 flex items-center justify-center group-hover/btn:bg-zinc-900 group-hover/btn:border-zinc-900 transition-all duration-700">
                <ArrowRight className="w-5 h-5 text-zinc-400 group-hover/btn:text-white transition-colors" />
              </div>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default LuxuryPromoSection;
