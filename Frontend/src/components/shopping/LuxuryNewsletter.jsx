import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Send } from "lucide-react";

const LuxuryNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 5000);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-[2rem] md:rounded-[3.5rem] bg-gray-50/50 backdrop-blur-md p-8 sm:p-20 shadow-xl shadow-gray-200/40 mx-4 md:mx-10 border border-gray-100 my-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-50/50 rounded-full blur-[100px]" />
      </div>

      <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 z-10">
        {/* Text Side */}
        <div className="max-w-xl text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#b8962d] text-[10px] font-bold tracking-[5px] uppercase block mb-4">
              Join the Elite
            </span>
            <h3 className="text-4xl sm:text-6xl font-light text-zinc-900 mb-6 tracking-tight uppercase">
              Stay in the{" "}
              <span className="font-serif italic text-[#d4af37]">Loop</span>
            </h3>
            <p className="text-zinc-500 text-lg font-light leading-relaxed">
              Be the first to know about exclusive drops, limited collections,
              and private sales. Join the{" "}
              <span className="text-zinc-900 font-medium border-b border-zinc-200">
                KoKhaN
              </span>{" "}
              inner circle.
            </p>
          </motion.div>
        </div>

        {/* Input/Form Side */}
        <div className="w-full lg:w-auto min-w-[320px] md:min-w-[450px]">
          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row w-full gap-4"
              >
                <div className="relative flex-1 group">
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-8 py-8 rounded-full bg-white border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-[#d4af37]/50 focus:ring-0 shadow-sm transition-all duration-500 text-lg font-light"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#d4af37] group-focus-within:w-1/2 transition-all duration-700" />
                </div>

                <Button
                  type="submit"
                  className="px-10 py-8 rounded-full bg-zinc-900 text-white font-bold tracking-[2px] uppercase text-xs shadow-lg shadow-zinc-200 transition-all duration-500 whitespace-nowrap overflow-hidden relative group border-none outline-none"
                >
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-black transition-colors duration-300">
                    Subscribe <Send className="w-4 h-4" />
                  </span>

                  <motion.div className="absolute inset-0 bg-[#d4af37] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out" />
                </Button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 bg-white border border-[#d4af37]/30 p-6 rounded-[2rem] shadow-xl shadow-gray-100"
              >
                <div className="w-12 h-12 rounded-full bg-[#d4af37] flex items-center justify-center shadow-lg shadow-[#d4af37]/20">
                  <CheckCircle2 className="text-white w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-zinc-900 font-bold uppercase tracking-wider text-sm">
                    Welcome to the Club
                  </h4>
                  <p className="text-[#b8962d] text-xs font-medium">
                    Check your inbox for a surprise.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LuxuryNewsletter;
