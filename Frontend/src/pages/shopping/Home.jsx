import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/api/shop/product";
import { fetchProductDeatils } from "@/api/shop/product";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import { filterOptions, brandOptionMap, categoryOptionMap } from "@/config";
import ProductDetailsDialog from "@/components/shopping/product-details";
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
  } = useSelector((state) => state.shopingProductSlice);
  const { featureImageList } = useSelector((state) => state.commonFeature);
  const { user } = useSelector((state) => state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  const heroSlides =
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
        ];

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

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDeatils(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      createCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id));
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  }

  function handleCategoryClick(categoryId) {
    sessionStorage.setItem(
      "filter",
      JSON.stringify({ categories: [categoryId] }),
    );
    navigate(`/shop/listing?categories=${categoryId}`);
  }

  function handleBrandClick(brandId) {
    sessionStorage.setItem("filter", JSON.stringify({ Brand: [brandId] }));
    navigate(`/shop/listing?Brand=${brandId}`);
  }

  const featuredProducts = productList?.slice(0, 8) || [];

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
            className={`absolute inset-0 bg-linear-to-br ${heroSlides[heroIndex].gradient} transition-all duration-1000`}
          />

          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] pointer-events-none" />

          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-20 -left-20 w-60 h-60 bg-white/5 rounded-full blur-2xl"
              style={{ animation: "pulse 3s ease-in-out infinite 1s" }}
            />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" />
          </div>

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
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Top Brands
                </h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Your favorite brands, all in one place
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-violet-600 hover:text-violet-700 font-semibold group"
              onClick={() => navigate("/shop/listing")}
            >
              All Brands
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
            {featuredBrandIds.map((brandId) => {
              const brandLabel = brandOptionMap[brandId];
              const gradient =
                brandColorMap[brandId] || "from-gray-600 to-gray-500";
              if (!brandLabel) return null;
              return (
                <div
                  key={brandId}
                  className="group cursor-pointer"
                  onClick={() => handleBrandClick(brandId)}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 p-4 hover:shadow-lg transition-all duration-500 hover:-translate-y-1 flex flex-col items-center justify-center text-center min-h-[90px]">
                    <div
                      className={`absolute inset-0 bg-linear-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <span className="relative text-sm font-bold text-gray-700 group-hover:text-white transition-colors duration-500 tracking-wide">
                      {brandLabel}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Second row of brands */}
          <div className="mt-3 grid grid-cols-5 sm:grid-cols-5 md:grid-cols-10 gap-2">
            {filterOptions.Brand.filter(
              (b) => !featuredBrandIds.includes(b.id),
            ).map((brand) => (
              <div
                key={brand.id}
                className="cursor-pointer text-center py-2 px-3 rounded-lg bg-white border border-gray-100 hover:border-violet-200 hover:bg-violet-50 transition-all duration-300 text-xs font-medium text-gray-600 hover:text-violet-700"
                onClick={() => handleBrandClick(brand.id)}
              >
                {brand.label}
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════ FEATURED PRODUCTS ═════════/══ */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-rose-500" />
                <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                  Trending Now
                </h2>
              </div>
              <p className="text-gray-500 text-sm mt-1">
                Discover what everyone's loving
              </p>
            </div>
            <Button
              variant="ghost"
              className="text-violet-600 hover:text-violet-700 font-semibold group"
              onClick={() => navigate("/shop/listing")}
            >
              View All
              <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white rounded-2xl border border-gray-100 overflow-hidden"
                >
                  <div className="w-full h-56 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="flex justify-between">
                      <div className="h-5 bg-gray-200 rounded w-1/4" />
                      <div className="h-8 w-8 bg-gray-200 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
                >
                  <div
                    className="relative overflow-hidden"
                    onClick={() => handleGetProductDetails(product._id)}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {product.salePrice > 0 && (
                      <Badge className="absolute top-3 left-3 bg-linear-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg px-3 py-1 text-xs font-bold">
                        SALE
                      </Badge>
                    )}

                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button
                        className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          toast.success("Added to Wishlist!");
                        }}
                      >
                        <Heart className="w-4 h-4 text-rose-500" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4">
                    <div onClick={() => handleGetProductDetails(product._id)}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1 group-hover:text-violet-700 transition-colors">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-3">
                        {product.category && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            {categoryOptionMap[product.category] ||
                              product.category}
                          </span>
                        )}
                        {product.brand && (
                          <span className="text-xs text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full font-medium">
                            {brandOptionMap[product.brand] || product.brand}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {product.salePrice > 0 ? (
                          <>
                            <span className="text-lg font-bold text-gray-900">
                              ${product.salePrice}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ${product.price}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="rounded-full bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all duration-300 w-9 h-9 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToCart(product._id);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium">No products available yet</p>
              <p className="text-sm mt-1">Check back soon!</p>
            </div>
          )}
        </section>

        {/* ═══════════ SPECIAL OFFERS ═══════════ */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 p-8 text-white shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2Mkg0MHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2MmgtMnY0aDJ2LTJoNHYyaDJWNmgtMlY0aDJ6bS0yIDI0di0ySDI4djJoNnptMC00aC-6djJoNnYtMnptMTIgMTJ2LTJoLTZ2Mmg2em0wLThoLTZ2Mmg2di0yem0wLThINDBWNGg2VjBoLTZ2Mmg0VjJIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-5 h-5 text-amber-300" />
                  <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                    Limited Time
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  Up to 50% Off
                </h3>
                <p className="text-white/70 mb-6 max-w-xs">
                  Incredible deals on premium fashion brands. Don't miss out!
                </p>
                <Button
                  className="bg-white text-violet-700 hover:bg-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                  onClick={() => navigate("/shop/listing")}
                >
                  Shop Deals
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-linear-to-br from-rose-500 via-pink-600 to-fuchsia-700 p-8 text-white shadow-xl group cursor-pointer hover:shadow-2xl transition-all duration-500">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnYtMmgtNHY2aDR2Mkg0MHYtMmgtNHptMC0zMFYwaC0ydjRoLTR2MmgtMnY0aDJ2LTJoNHYyaDJWNmgtMlY0aDJ6bS0yIDI0di0ySDI4djJoNnptMC00aC-6djJoNnYtMnptMTIgMTJ2LTJoLTZ2Mmg2em0wLThoLTZ2Mmg2di0yem0wLThINDBWNGg2VjBoLTZ2Mmg0VjJIMzZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-amber-300" />
                  <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                    New Arrivals
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-3">
                  Latest Collections
                </h3>
                <p className="text-white/70 mb-6 max-w-xs">
                  Explore the newest trends and stay ahead of the curve.
                </p>
                <Button
                  className="bg-white text-rose-700 hover:bg-gray-100 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 px-6"
                  onClick={() => navigate("/shop/listing")}
                >
                  Explore New
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ NEWSLETTER ═══════════ */}
        <section className="relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 p-8 sm:p-12 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-rose-500/10 rounded-full blur-2xl" />
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Stay in the Loop
              </h3>
              <p className="text-gray-400 text-base">
                Subscribe for exclusive offers, early access to sales, and the
                latest style updates delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <Input
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-5 py-6 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-gray-500 focus:border-violet-400 focus:ring-violet-400/20 backdrop-blur-sm"
              />
              <Button className="px-6 py-6 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 font-bold shadow-lg hover:shadow-xl transition-all duration-300 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </div>

      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetils={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingHome;
