import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart, ShoppingCart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrendingNowTemplate = () => {
  // --- TEMPLATE DATA (For Preview) ---
  const templateProducts = [
    {
      _id: "1",
      title: "Royal Chronograph Gold Edition",
      brand: "KoKhaN Luxe",
      price: 1200,
      salePrice: 850,
      image:
        "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=1000&auto=format&fit=crop", // Watch
    },
    {
      _id: "2",
      title: "Midnight Velvet Dinner Jacket",
      brand: "KoKhaN Couture",
      price: 450,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1594932224456-802d92427a92?q=80&w=1000&auto=format&fit=crop", // Suit
    },
    {
      _id: "3",
      title: "Handcrafted Italian Leather Loafers",
      brand: "KoKhaN Footwear",
      price: 320,
      salePrice: 280,
      image:
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop", // Shoes
    },
    {
      _id: "4",
      title: "Classic Aviator - Dark Tint",
      brand: "KoKhaN Vision",
      price: 180,
      salePrice: 0,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1000&auto=format&fit=crop", // Shades
    },
  ];

  // Loading state simulation (set to false to see template)
  const isLoading = false;

  return (
    <section className="py-20 bg-black">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 px-4 md:px-10 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-[1px] bg-[#d4af37]" />
            <span className="text-[10px] font-bold text-[#d4af37] uppercase tracking-[5px]">
              Most Wanted
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tighter uppercase">
            Trending{" "}
            <span className="font-serif italic text-[#d4af37]">Now</span>
          </h2>
        </div>

        <Button
          variant="ghost"
          className="text-white/60 hover:text-[#d4af37] hover:bg-transparent font-medium tracking-[2px] uppercase text-[10px] group transition-all"
        >
          View All Collections
          <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="w-full aspect-[4/5] bg-white/5 rounded-[2.5rem]" />
              <div className="h-4 bg-white/5 rounded w-3/4 mx-auto" />
            </div>
          ))}
        </div>
      ) : templateProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-10">
          {templateProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/5 cursor-pointer">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {product.salePrice > 0 && (
                  <div className="absolute top-5 left-5 bg-[#d4af37] text-black text-[9px] font-bold px-3 py-1 rounded-full tracking-[2px] uppercase shadow-2xl">
                    Offer
                  </div>
                )}

                <div className="absolute top-5 right-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <button className="w-10 h-10 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#d4af37] hover:text-black transition-all">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[85%] translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <Button className="w-full bg-white text-black hover:bg-[#d4af37] hover:text-black rounded-full py-6 font-bold text-[10px] tracking-[2px] uppercase shadow-2xl border-none">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Quick Add
                  </Button>
                </div>
              </div>

              {/* Product Info */}
              <div className="mt-6 text-center">
                <div className="flex flex-col items-center gap-1 mb-2">
                  <span className="text-[10px] text-[#d4af37] uppercase tracking-[4px] font-medium">
                    {product.brand}
                  </span>
                  <h3 className="text-white text-lg font-light tracking-tight group-hover:text-[#d4af37] transition-colors">
                    {product.title}
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {product.salePrice > 0 ? (
                    <>
                      <span className="text-[#d4af37] font-medium">
                        ${product.salePrice}
                      </span>
                      <span className="text-gray-600 line-through text-sm font-light">
                        ${product.price}
                      </span>
                    </>
                  ) : (
                    <span className="text-white font-medium">
                      ${product.price}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-600">
          <ShoppingBag className="w-10 h-10 mx-auto mb-4 opacity-20" />
          <p className="tracking-[3px] uppercase text-[10px]">
            No Collections Found
          </p>
        </div>
      )}
    </section>
  );
};

export default TrendingNowTemplate;
