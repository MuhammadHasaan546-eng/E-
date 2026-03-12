import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  return (
    <footer
      className="relative w-full"
      style={{ clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="relative md:fixed bottom-0 left-0 w-full min-h-[600px] bg-slate-900 text-white flex flex-col justify-between overflow-hidden">
        <motion.div
          animate={{ x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-0 right-0 text-center text-[15vw] font-black text-white/[0.03] pointer-events-none select-none uppercase tracking-tighter"
        >
          KOKHAN
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-16 lg:py-20">
          {/* 1. TOP FEATURES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 border-b border-white/5 pb-16">
            {[
              {
                icon: Truck,
                title: "Fast Delivery",
                desc: "Global shipping on all orders",
                color: "text-blue-400",
              },
              {
                icon: RotateCcw,
                title: "Easy Returns",
                desc: "30-day premium protection",
                color: "text-[#D4AF37]",
              },
              {
                icon: ShieldCheck,
                title: "Secure Payment",
                desc: "End-to-end encrypted",
                color: "text-emerald-400",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-5 group cursor-default"
              >
                <div
                  className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${item.color} group-hover:bg-white group-hover:text-slate-900 transition-all duration-500 shadow-xl`}
                >
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-widest text-sm">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <motion.div {...fadeInUp} className="space-y-6">
              <h2 className="text-4xl font-black tracking-tighter text-[#D4AF37]">
                KOKHAN<span className="text-white">.</span>
              </h2>
              <p className="text-slate-400 leading-relaxed text-sm font-medium">
                Redefining the digital shopping experience with curated luxury
                and executive precision.
              </p>
              <div className="flex items-center gap-4">
                {[
                  { Icon: Facebook, href: "#" },
                  { Icon: Instagram, href: "#" },
                  { Icon: Twitter, href: "#" },
                  { Icon: Youtube, href: "#" },
                  {
                    Icon: Linkedin,
                    href: "https://www.linkedin.com/in/muhammad-hasaan-609a282a6/",
                  },
                ].map(({ Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-[#D4AF37] hover:border-[#D4AF37] hover:scale-110 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </motion.div>

            {[
              {
                title: "Collections",
                links: [
                  {
                    label: "Men's Exclusive",
                    path: "/shop/listing?categories=mens_clothing",
                  },
                  {
                    label: "Women's Couture",
                    path: "/shop/listing?categories=womens_clothing",
                  },
                  {
                    label: "Bespoke Accessories",
                    path: "/shop/listing?categories=accessories",
                  },
                  { label: "New Arrivals", path: "/shop/listing" },
                ],
              },
              {
                title: "Concierge",
                links: [
                  { label: "Track Order", path: "/shop/account" },
                  { label: "Privacy Policy", path: "/shop/privacy" },
                  { label: "Terms of Service", path: "/shop/terms" },
                  { label: "Global FAQs", path: "/shop/faq" },
                ],
              },
            ].map((col, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <h4 className="font-black text-[#D4AF37] mb-8 uppercase tracking-[0.3em] text-[10px]">
                  {col.title}
                </h4>
                <ul className="space-y-4">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNavigation(link.path)}
                        className="text-slate-400 hover:text-white text-sm font-bold transition-all flex items-center group"
                      >
                        <ArrowRight
                          size={14}
                          className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                        />
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact Column */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="space-y-8"
            >
              <h4 className="font-black text-[#D4AF37] mb-8 uppercase tracking-[0.3em] text-[10px]">
                Contact Suite
              </h4>
              <div className="space-y-5 text-sm font-bold text-slate-400">
                <div className="flex items-start gap-4">
                  <MapPin size={20} className="text-slate-600 mt-1" />
                  <p className="leading-relaxed">
                    123 Fashion Street, <br />
                    Charsadda, PK 2032
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Phone size={20} className="text-slate-600" />
                  <p>+92 (037) 05794645</p>
                </div>
                <div className="flex items-center gap-4">
                  <Mail size={20} className="text-slate-600" />
                  <p>support@kokhan.com</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 3. BOTTOM BAR */}
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                © {currentYear} KOKHAN LUXURY GROUP.
              </p>
            </div>

            <div className="flex items-center gap-8">
              <span className="text-[10px] font-black text-white/20 tracking-[0.5em] uppercase hidden lg:block">
                Designed for Excellence
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors"
              >
                Back to top{" "}
                <ArrowUpRight
                  size={14}
                  className="group-hover:-translate-y-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block h-[700px] pointer-events-none" />
      {/* ═══════════ PAYMENT GATEWAY CARDS ═══════════ */}
      <div className="flex flex-col items-center gap-5 py-8 mt-12 border-t border-white/10">
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-[4px]">
          Secure Checkout
        </span>

        <div
          className="flex items-center gap-8 md:gap-10 
  bg-white/5 backdrop-blur-md 
  px-6 py-4 rounded-2xl 
  border border-white/10
  shadow-lg
  transition-all duration-500"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            className="h-5 md:h-6 w-auto object-contain 
     hover:grayscale-0 hover:opacity-100 
      hover:scale-110 transition-all duration-500"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="Mastercard"
            className="h-6 md:h-8 w-auto object-contain 
     hover:grayscale-0 hover:opacity-100 
      hover:scale-110 transition-all duration-500"
          />

          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
            alt="Google Pay"
            className="h-5 md:h-6 w-auto object-contain 
     hover:grayscale-0 hover:opacity-100 
      hover:scale-110 transition-all duration-500"
          />
        </div>

        <p className="text-[10px] text-gray-500 tracking-widest">
          🔒 100% ENCRYPTED & SECURE PAYMENTS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
