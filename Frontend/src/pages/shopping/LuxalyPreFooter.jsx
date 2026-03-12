import React from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles, ShieldCheck, Globe } from "lucide-react";

const LuxuryPreFooter = () => {
  return (
    <section className="relative w-full py-24 bg-white overflow-hidden border-t border-gray-100">
      {/* Background Decorative Blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-gray-100 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-[#d4af37]/20 bg-[#d4af37]/5 rounded-full">
            <Crown className="w-3.5 h-3.5 text-[#d4af37] mr-2" />
            <span className="text-[10px] font-bold tracking-[3px] uppercase text-[#d4af37]">
              Premium Experience
            </span>
          </div>

          {/* Luxury Heading */}
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight uppercase leading-tight">
            Where Quality Meets <br />
            <span className="italic font-serif text-[#d4af37]">
              Craftsmanship
            </span>
          </h2>

          <p className="max-w-2xl mx-auto text-gray-500 text-lg font-light leading-relaxed">
            KoKhaN is more than just a brand; it's a statement of elegance.
            Every piece is curated to ensure you stand out in every room you
            enter.
          </p>
        </motion.div>

        {/* Feature Grid with Hover Effects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16">
          {[
            {
              icon: ShieldCheck,
              label: "Secure Payments",
              desc: "100% Encrypted",
            },
            {
              icon: Globe,
              label: "World-wide Shipping",
              desc: "Fast & Reliable",
            },
            { icon: Sparkles, label: "New Arrivals", desc: "Weekly Drops" },
            { icon: Crown, label: "VIP Service", desc: "24/7 Support" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-[#d4af37] transition-colors duration-500">
                <item.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-500" />
              </div>
              <h4 className="text-[11px] font-bold tracking-[2px] uppercase text-gray-900 mb-1">
                {item.label}
              </h4>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Elegant Divider Line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-[1px] bg-linear-to-r from-transparent via-gray-200 to-transparent mt-20"
        />
      </div>
    </section>
  );
};

export default LuxuryPreFooter;
