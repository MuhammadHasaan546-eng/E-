import React from "react";
import { motion } from "framer-motion";

const ProductSkeleton = () => {
  return (
    <div className="group relative bg-white flex flex-col w-full h-full">
      {/* 3:4 Image Placeholder */}
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-none w-full">
        <motion.div
          className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transform-gpu"
          animate={{ translateX: ["-100%", "100%"] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />
        <div className="absolute top-4 left-4 bg-gray-200 w-12 h-4" />
      </div>

      {/* Details Placeholder */}
      <div className="py-5 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-2 w-full">
            <div className="h-3 bg-gray-100 w-1/3 relative overflow-hidden rounded-none">
              <motion.div
                className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transform-gpu"
                animate={{ translateX: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </div>
            <div className="h-4 bg-gray-100 w-3/4 relative overflow-hidden rounded-none">
              <motion.div
                className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transform-gpu"
                animate={{ translateX: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              />
            </div>
          </div>
          <div className="h-4 bg-gray-100 w-1/4 relative overflow-hidden rounded-none shrink-0">
            <motion.div
              className="absolute inset-0 z-10 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transform-gpu"
              animate={{ translateX: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductSkeleton);
