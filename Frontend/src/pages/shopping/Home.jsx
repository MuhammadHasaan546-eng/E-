import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/api/shop/product";
import { fetchProductDeatils } from "@/api/shop/product";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import { filterOptions, brandOptionMap, categoryOptionMap } from "@/config";
import ProductDetailsDialog from "@/components/shopping/product-details";
import ProductSkeleton from "@/components/shopping/ProductSkeleton";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { getFeatureImages } from "@/api/common/feature";
import { brandColorMap } from "@/config/index";
import { featuredBrandIds } from "@/config/index";
import banner from "@/assets/banner.jpg";

import {
  ShoppingCart,
  Shirt,
  ShoppingBag,
  Watch,
  Footprints,
  Gem,
  Baby,
  Sparkles,
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Zap,
  Heart,
  Crown,
} from "lucide-react";
import LuxuryPreFooter from "./LuxalyPreFooter";
import UniqueReveal from "@/components/shopping/UniqueReveal";
import LuxuryNewsletter from "@/components/shopping/LuxuryNewsletter";
import LuxuryPromoSection from "@/components/shopping/LuxuryPromoSection";

const categoryIconMap = {
  mens_clothing: Shirt,
  womens_clothing: Sparkles,
  kids_clothing: Baby,
  shoes: Footprints,
  accessories: Gem,
  bags: ShoppingBag,
  watches: Watch,
};

const ShoppingHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    productList,
    productDeatils: productDetails,
    isLoading,
    isDetailsLoading,
  } = useSelector((state) => state.shopingProductSlice);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides = useMemo(() => 
    featureImageList && featureImageList.length > 0
      ? featureImageList.map((item) => ({
          title: item.title,
          subtitle:
            item.subtitle ||
            "Exclusive drops and premium fashion tailored for you",
          image: item.image,
          gradient: "from-gray-900/40 via-gray-900/20 to-transparent",
        }))
      : [
          {
            title: "Welcome to KoKhaN",
            subtitle: "Exclusive drops and premium fashion tailored for you",
            image: banner,
            gradient: "from-gray-900/40 via-gray-900/20 to-transparent",
          },
        ],
    [featureImageList]
  );

  // Auto-rotate hero
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  useEffect(() => {
    dispatch(
      fetchAllProducts({ filterParams: {}, sortParams: "price-lowtohigh" }),
    );
    dispatch(getFeatureImages());
  }, [dispatch]);

  const handleGetProductDetails = useCallback((getCurrentProductId) => {
    if (getCurrentProductId) {
      setOpenDetailsDialog(true);
      dispatch(fetchProductDeatils(getCurrentProductId));
    }
  }, [dispatch]);

  const handleAddToCart = useCallback((getCurrentProductId) => {
    dispatch(
      createCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  }, [dispatch, user?.id]);

  const handleCategoryClick = useCallback((categoryId) => {
    sessionStorage.setItem(
      "filter",
      JSON.stringify({ categories: [categoryId] }),
    );
    navigate(`/shop/listing?categories=${categoryId}`);
  }, [navigate]);

  const handleBrandClick = useCallback((brandId) => {
    sessionStorage.setItem("filter", JSON.stringify({ Brand: [brandId] }));
    navigate(`/shop/listing?Brand=${brandId}`);
  }, [navigate]);

  const featuredProducts = useMemo(() => productList?.slice(0, 8) || [], [productList]);

  const backgroundAnimations = useMemo(
    () => (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"
          style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
        />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
      </div>
    ),
    []
  );

  return (
    <div className="flex flex-col gap-0 min-h-screen bg-gray-50/50   ">
      <div className="relative overflow-hidden p-4 md:p-6 lg:p-8">
        <div className="relative min-h-[500px] sm:min-h-[600px] md:min-h-[700px] transition-all duration-1000 ease-in-out rounded-[2rem] overflow-hidden shadow-2xl">
          <div
            className="absolute inset-0 transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${heroSlides[heroIndex].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundRepeat: "no-repeat",
              transform: "scale(1.05)",
              width: "100%",
              height: "100%",
            }}
          />
            <div
              className="absolute inset-0 bg-linear-to-br transition-all duration-1000 transform-gpu"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
                "--tw-gradient-from": `${heroSlides[heroIndex].gradient.split(" ")[0].replace("from-", "")}`,
                "--tw-gradient-to": `${heroSlides[heroIndex].gradient.split(" ")[2].replace("to-", "")}`,
                "--tw-gradient-stops": `var(--tw-gradient-from), var(--tw-gradient-to)`
              }}
            />

          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />

          {backgroundAnimations}

          <div className="relative px-6 py-20 sm:px-10 sm:py-28 md:py-36 max-w-7xl mx-auto">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6 border border-white/10">
                <Zap className="w-4 h-4" />
                <span>Hot Deals Available Now</span>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  key={`title-${heroIndex}`}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight tracking-tight"
                  style={{
                    textShadow: "0 2px 30px rgba(0,0,0,0.15)",
                  }}
                >
                  {heroSlides[heroIndex].title}
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.p
                  key={`subtitle-${heroIndex}`}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  className="text-white/80 text-lg sm:text-xl mb-10 max-w-2xl leading-relaxed"
                >
                  {heroSlides[heroIndex].subtitle}
                </motion.p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="px-8 py-6 text-lg font-bold cursor-pointer  bg-red-500 text-gray-900 hover:bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  onClick={() => navigate("/shop/listing")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2  " />
                  Shop Now
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-6 text-lg font-bold text-white border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-300"
                  onClick={() => navigate("/shop/listing")}
                >
                  Explore Collections
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>

            {/* Hero dots */}
            <div className="flex gap-2 mt-12">
              {heroSlides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    i === heroIndex
                      ? "w-8 bg-white"
                      : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex flex-col gap-10">
        {/* ═══════════ CATEGORIES SECTION ═══════════ */}
        <section className="py-12">
          <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
            <div>
              <span className="text-[#d4af37] text-[10px] font-bold tracking-[4px] uppercase block mb-2">
                Curated Selections
              </span>
              <h2 className="text-3xl font-light text-gray-900 tracking-tight uppercase">
                Shop by Category
              </h2>
            </div>
            <Button
              variant="link"
              className="text-gray-400 hover:text-[#d4af37] p-0 h-auto font-light tracking-widest text-xs uppercase transition-colors group"
              onClick={() => navigate("/shop/listing")}
            >
              View All Collections
              <ChevronRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-6">
            {filterOptions.categories.map((category) => {
              const IconComponent = categoryIconMap[category.id] || ShoppingBag;
              return (
                <motion.div
                  key={category.id}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <div className="relative flex flex-col items-center justify-center bg-white border border-gray-50 p-8 transition-all duration-500 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] group-hover:border-[#d4af37]/20">
                    <div className="relative w-16 h-16 flex items-center justify-center mb-5">
                      <div className="absolute inset-0 bg-[#d4af37]/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out" />

                      <IconComponent className="w-7 h-7 text-gray-400 group-hover:text-[#d4af37] transition-colors duration-500 relative z-10 font-light" />
                    </div>

                    <h3 className="text-[10px] font-bold text-gray-500 group-hover:text-gray-900 tracking-[2px] uppercase text-center transition-colors">
                      {category.label}
                    </h3>

                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#d4af37] group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ══════ BRANDS SECTION ═══════════ */}
        <section className="py-12 border-t border-gray-100">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-[#D4AF37]" />
                <span className="text-[10px] font-black tracking-[0.4em] text-[#D4AF37] uppercase">
                  Curated Selection
                </span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mt-2">
                Top Brands<span className="text-[#D4AF37]">.</span>
              </h2>
              <p className="text-slate-400 text-xs mt-2 font-medium tracking-wide">
                Elevating your lifestyle with world-renowned craftsmanship.
              </p>
            </div>

            <Button
              variant="ghost"
              className="text-slate-900 hover:bg-slate-900 hover:text-white border border-slate-200 px-6 rounded-none font-bold text-[10px] uppercase tracking-widest group transition-all duration-500"
              onClick={() => navigate("/shop/listing")}
            >
              Explore All
              <ChevronRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* FEATURED BRANDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {featuredBrandIds.map((brandId) => {
              const brandLabel = brandOptionMap[brandId];
              // Luxury gradient: Deep Zinc to Black
              const gradient =
                brandColorMap[brandId] || "from-slate-800 to-black";

              if (!brandLabel) return null;

              return (
                <div
                  key={brandId}
                  className="group cursor-pointer"
                  onClick={() => handleBrandClick(brandId)}
                >
                  <div className="relative overflow-hidden border border-slate-100 bg-white p-8 transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex items-center justify-center min-h-[120px]">
                    {/* Background Reveal Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${gradient} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-expo`}
                    />

                    <span className="relative text-[11px] font-black text-slate-800 group-hover:text-white transition-colors duration-500 uppercase tracking-[0.3em]">
                      {brandLabel}
                    </span>

                    {/* Subtle bottom line indicator */}
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] group-hover:w-full transition-all duration-700" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* SECONDARY MINIMALIST BRANDS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {filterOptions.Brand.filter(
              (b) => !featuredBrandIds.includes(b.id),
            ).map((brand) => (
              <div
                key={brand.id}
                className="cursor-pointer text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-[#D4AF37] border-b border-transparent hover:border-[#D4AF37] py-1 transition-all duration-300"
                onClick={() => handleBrandClick(brand.id)}
              >
                {brand.label}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ FEATURED PRODUCTS ═════════/══ */}
        <section className="py-16">
          {/* ═══════════ HEADER ═══════════ */}
          <div className="flex items-end justify-between mb-10 border-b border-gray-100 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                <span className="text-[10px] font-black tracking-[0.3em] text-[#D4AF37] uppercase">
                  Curated Trends
                </span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">
                Trending Now<span className="text-[#D4AF37]">.</span>
              </h2>
            </div>
            <Button
              variant="ghost"
              className="text-slate-900 hover:text-[#D4AF37] font-black text-[11px] uppercase tracking-widest group transition-all"
              onClick={() => navigate("/shop/listing")}
            >
              View Collection
              <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {/* ═══════════ PRODUCT GRID ═══════════ */}
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="show"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
          >
            <AnimatePresence mode="popLayout">
              {isLoading ? (
                [...Array(4)].map((_, i) => (
                  <motion.div 
                    key={`skeleton-${i}`}
                    layout
                    variants={{
                      hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                      show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4 } },
                      exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
                    }}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="transform-gpu"
                  >
                    <ProductSkeleton />
                  </motion.div>
                ))
              ) : featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <motion.div
                    key={`product-${product._id || product.id}`}
                    layout
                    variants={{
                      hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                      show: { 
                        opacity: 1, y: 0, filter: "blur(0px)",
                        transition: { type: "spring", stiffness: 260, damping: 25, mass: 0.5 }
                      },
                      exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
                    }}
                    viewport={{ once: true, margin: "0px 0px 50px 0px" }}
                    whileInView="show"
                    initial="hidden"
                    exit="exit"
                    className="group relative bg-white flex flex-col transition-all duration-500 transform-gpu"
                  >
                    {/* Image Container */}
                    <div
                      className="relative aspect-3/4 overflow-hidden bg-gray-50 cursor-pointer"
                      onClick={() => handleGetProductDetails(product._id)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 transform-gpu will-change-transform"
                      />

                      {/* Minimal Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Luxury Badge */}
                      {product.salePrice > 0 && (
                        <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest shadow-2xl">
                          OFFER
                        </div>
                      )}

                      {/* Quick Action: Wishlist */}
                      <button
                        className="absolute top-4 right-4 w-10 h-10 bg-white opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 flex items-center justify-center hover:bg-[#D4AF37] hover:text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Added to Wishlist");
                        }}
                      >
                        <Heart className="w-4 h-4" />
                      </button>

                      {/* Hover Bottom Action (Add to Cart) */}
                      <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                        <Button
                          className="w-full rounded-none bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] py-6 hover:bg-[#D4AF37] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product._id);
                          }}
                        >
                          Add to Bag
                        </Button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="py-5 space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div
                          className="cursor-pointer group/title"
                          onClick={() => handleGetProductDetails(product._id)}
                        >
                          <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-widest mb-1">
                            {brandOptionMap[product.brand] || "Exclusive"}
                          </p>
                          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight line-clamp-1 group-hover/title:text-[#D4AF37] transition-colors">
                            {product.title}
                          </h3>
                        </div>

                        <div className="flex flex-col items-end">
                          {product.salePrice > 0 ? (
                            <>
                              <span className="text-sm font-black text-slate-900">
                                ${product.salePrice}
                              </span>
                              <span className="text-[10px] text-slate-400 line-through">
                                ${product.price}
                              </span>
                            </>
                          ) : (
                            <span className="text-sm font-black text-slate-900">
                              ${product.price}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div 
                  key="empty-state"
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full text-center py-20 bg-slate-50 border border-dashed border-slate-200 w-full"
                >
                  <ShoppingBag className="w-10 h-10 mx-auto mb-4 text-slate-300" />
                  <p className="font-black text-xs uppercase tracking-widest text-slate-400">
                    Inventory Empty
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ═══════════ SPECIAL OFFERS ═══════════ */}
        <LuxuryPromoSection />

        {/* ═══════════ NEWSLETTER ═══════════ */}
        <section>
          <UniqueReveal />
        </section>

        <section className="">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <LuxuryPreFooter />
          </div>
        </section>

        <section>
          <LuxuryNewsletter />
        </section>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetils={productDetails}
        isDetailsLoading={isDetailsLoading}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;
