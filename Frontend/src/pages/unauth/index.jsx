import React from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UnAuth = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-900/20 blur-[120px] rounded-full animate-pulse capitalize" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zinc-800/20 blur-[120px] rounded-full animate-pulse" />

      <div className="relative z-10 w-full max-w-md px-6 py-12 m-4 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-3xl shadow-2xl items-center flex flex-col text-center transition-all duration-500 hover:border-red-500/30 hover:shadow-red-500/5 group">
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-700" />
          <div className="relative bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50 group-hover:border-red-500/50 transition-colors duration-500">
            <ShieldAlert size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-zinc-100 mb-4 tracking-tight">
          Access Denied
        </h1>
        <p className="text-zinc-400 text-lg leading-relaxed mb-10 max-w-[280px] mx-auto">
          You don't have the necessary permissions to access this exclusive
          area.
        </p>

        <button
          onClick={() => navigate("/")}
          className="group/btn relative w-full overflow-hidden rounded-xl bg-zinc-100 py-4 font-semibold text-zinc-950 transition-all duration-300 hover:bg-white active:scale-95 flex items-center justify-center gap-2"
        >
          <ArrowLeft
            size={18}
            className="transition-transform duration-300 group-hover/btn:-translate-x-1"
          />
          <span>Return Home</span>
        </button>

        <div className="mt-8 pt-8 border-t border-zinc-800/50 w-full text-zinc-500 text-sm">
          Error Code:{" "}
          <span className="text-zinc-400 font-mono tracking-wider">
            403_FORBIDDEN
          </span>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-zinc-800 to-transparent opacity-50" />
    </div>
  );
};

export default UnAuth;
