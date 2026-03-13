import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UniqueReveal = () => {
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
  });

  // Scroll Animations
  const yImage = useTransform(smoothProgress, [0, 1], [-50, 50]);
  const rotateImage = useTransform(smoothProgress, [0, 1], [-3, 3]);
  const opacityText = useTransform(
    smoothProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  // Mouse Parallax Animations
  const springMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const mouseMoveX = useTransform(springMouseX, [-0.5, 0.5], [-20, 20]);
  const mouseMoveY = useTransform(springMouseY, [-0.5, 0.5], [-20, 20]);

  // COMBINED Y TRANSFORM: This fixes the duplicate key "y" error
  const combinedY = useTransform(
    [yImage, mouseMoveY],
    ([latestYImage, latestMouseMoveY]) => latestYImage + latestMouseMoveY,
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen md:h-[110vh] flex items-center justify-center bg-white overflow-hidden py-20 md:py-0"
    >
      {/* BACKGROUND MOVING TEXT */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden opacity-40">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap mb-2 md:mb-4"
        >
          {[...Array(15)].map((_, i) => (
            <h2
              key={i}
              className="text-[25vw] md:text-[18vw] font-black text-black uppercase leading-none px-12"
            >
              KOKHAN
            </h2>
          ))}
        </motion.div>

        <motion.div
          animate={{ x: [-1200, 0] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap"
        >
          {[...Array(15)].map((_, i) => (
            <h2
              key={i}
              className="text-[25vw] md:text-[18vw] font-black text-transparent uppercase leading-none px-12"
              style={{ WebkitTextStroke: "1px rgba(0,0,0,0.03)" }}
            >
              KOKHAN
            </h2>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* LEFT: IMAGE CONTENT */}
        <motion.div
          style={{
            y: combinedY, // Uses the merged scroll + mouse value
            rotateZ: rotateImage,
            x: mouseMoveX,
          }}
          className="relative w-full max-w-[500px] lg:max-w-none mx-auto aspect-[4/5] lg:h-[75vh] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-gray-100 group bg-gray-50/50 p-2"
        >
          <motion.img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
            alt="Luxury Fashion"
            className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
          />

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 bg-white/80 backdrop-blur-md border border-gray-200 p-4 rounded-full hidden md:block shadow-lg"
          >
            <Star className="w-6 h-6 text-[#b8962d]" />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60" />
        </motion.div>

        {/* RIGHT: TEXT CONTENT */}
        <motion.div
          style={{ opacity: opacityText }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#b8962d] rounded-full" />
            <span className="text-[#b8962d] tracking-[4px] md:tracking-[8px] text-[10px] md:text-xs font-bold uppercase">
              Premium Collection 2026
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl lg:text-9xl font-light leading-[0.85] uppercase tracking-tighter text-zinc-900">
              The <br />
              <span className="font-serif italic text-[#b8962d]">Legacy</span>
            </h2>
          </div>

          <p className="text-zinc-500 text-lg md:text-xl font-light max-w-md leading-relaxed lg:border-l-2 lg:border-zinc-100 lg:pl-8">
            KoKhaN is not just fashion, it's an identity. Har piece mein milti
            hai be-misaal craft aur modern touch.
          </p>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/shop/listing");
            }}
            className="group relative flex items-center gap-6 text-zinc-900 font-bold uppercase tracking-[4px] text-xs cursor-pointer py-4"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-zinc-900 group-hover:border-zinc-900 transition-all duration-500">
              <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-zinc-100 group-hover:bg-zinc-900 transition-colors" />
          </motion.button>
        </motion.div>
      </div>

      {/* DECORATIVE ELEMENTS */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gray-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-stone-100 rounded-full blur-[120px] pointer-events-none opacity-50" />
    </section>
  );
};

export default UniqueReveal;
