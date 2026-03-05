import React from "react";
import { useNavigate } from "react-router-dom";
import { Frown, ArrowLeft } from "lucide-react";

/**
 * NotFound Component
 *
 * A premium, responsive 404 error page.
 * Features:
 * - Glassmorphism UI
 * - Subtle background animations
 * - Professional typography (Inter)
 */
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      {/* Dynamic Background Elements - Using Blue/Purple for 404 */}
      <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-blue-900/15 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-purple-900/15 blur-[140px] rounded-full animate-pulse" />

      {/* Main Content Card */}
      <div className="relative z-10 w-full max-w-lg px-8 py-14 m-4 bg-zinc-900/50 backdrop-blur-2xl border border-zinc-800/60 rounded-[2.5rem] shadow-2xl items-center flex flex-col text-center transition-all duration-700 hover:border-blue-500/40 hover:shadow-blue-500/10 group">
        {/* Animated Icon Container */}
        <div className="relative mb-10">
          <div className="absolute inset-0 bg-blue-500/25 blur-3xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-1000 ease-out" />
          <div className="relative bg-zinc-800/60 p-7 rounded-[2rem] border border-zinc-700/60 group-hover:border-blue-500/60 transition-all duration-500 transform group-hover:-translate-y-1">
            <Frown
              size={56}
              className="text-blue-400 group-hover:text-blue-300 transition-colors duration-500"
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl leading-relaxed mb-12 max-w-[340px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          The page you're searching for seems to have vanished into the digital
          void.
        </p>

        {/* Action Button - Luxury Styled */}
        <button
          onClick={() => navigate("/")}
          className="group/btn relative w-full overflow-hidden rounded-2xl bg-zinc-50 py-5 font-bold text-zinc-950 transition-all duration-500 hover:bg-white active:scale-95 flex items-center justify-center gap-3"
        >
          <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
          <ArrowLeft
            size={20}
            className="transition-transform duration-500 group-hover/btn:-translate-x-1.5"
          />
          <span className="relative z-10">Back to Safety</span>
        </button>

        {/* Footer Identifier */}
        <div className="mt-12 pt-10 border-t border-zinc-800/60 w-full flex flex-col items-center gap-1">
          <span className="text-zinc-600 text-xs uppercase tracking-[0.2em] font-medium">
            Resolution Status
          </span>
          <span className="text-zinc-400 font-mono text-sm tracking-wider">
            ERR_404_VOID_REACHED
          </span>
        </div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Modern Gradient Accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-purple-500/20 to-transparent" />
    </div>
  );
};

export default NotFound;
