import { fetchAllProducts, fetchProductDeatils } from "@/api/shop/product";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon, Filter, Search } from "lucide-react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "@/components/product/filter";
import ProductSkeleton from "@/components/shopping/ProductSkeleton";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import { updateProductStock } from "@/store/shop/product-slice";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ShopingProductTile from "./Product-tile";

const ShoppingListing = () => {
  const { productList, productDeatils, isLoading, isDetailsLoading } =
    useSelector((state) => state.shopingProductSlice);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const [sortOption, setSortOption] = useState(null);
  const [searchParms, SetsearchParms] = useSearchParams();
  const [openDetilsDialog, setOpenDetilsDialog] = useState(false);

  const createSearchParamsHelper = useCallback((filterParms) => {
    const quaryPrams = [];

    for (const [key, value] of Object.entries(filterParms)) {
      if (Array.isArray(value) && value.length > 0) {
        const parmsValue = value.join(",");
        quaryPrams.push(`${key}=${encodeURIComponent(parmsValue)}`);
      }
    }
    return quaryPrams.join("&");
  }, []);

  const handleSolt = useCallback((value) => {
    setSortOption(value);
  }, []);
  const handleFilter = useCallback((sectionId, optionId) => {
    setFilter((prevFilter) => {
      let cpyFilter = { ...prevFilter };

      if (cpyFilter[sectionId]) {
        const index = cpyFilter[sectionId].indexOf(optionId);

        if (index > -1) {
          cpyFilter[sectionId] = cpyFilter[sectionId].filter(
            (i) => i !== optionId,
          );

          if (cpyFilter[sectionId].length === 0) delete cpyFilter[sectionId];
        } else {
          cpyFilter[sectionId] = [...cpyFilter[sectionId], optionId];
        }
      } else {
        cpyFilter[sectionId] = [optionId];
      }

      sessionStorage.setItem("filter", JSON.stringify(cpyFilter));
      return cpyFilter;
    });
  }, []);
  // getProductDeatils
  const handleGetProductDeatils = useCallback((getCurrentProductId) => {
    if (getCurrentProductId) {
      setOpenDetilsDialog(true);
      dispatch(fetchProductDeatils(getCurrentProductId));
    }
  }, [dispatch]);

  // get add to cart
  const handleAddToCard = useCallback((getCurrentProductId) => {
    dispatch(
      createCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        dispatch(
          updateProductStock({
            productId: getCurrentProductId,
            quantity: -1,
          }),
        );
        toast.success(data.payload.message);
      } else {
        toast.error(data.payload.message);
      }
    });
  }, [dispatch, user?.id]);

  useEffect(() => {
    setSortOption("price-lowtohigh");
    const savedFilter = sessionStorage.getItem("filter");
    if (savedFilter) setFilter(JSON.parse(savedFilter));
  }, []);

  useEffect(() => {
    const savedFilter = sessionStorage.getItem("filter");
    if (savedFilter) {
      setFilter((prev) => {
        const parsed = JSON.parse(savedFilter);
        return JSON.stringify(prev) !== JSON.stringify(parsed) ? parsed : prev;
      });
    } else {
      setFilter((prev) => (Object.keys(prev).length > 0 ? {} : prev));
    }
  }, [searchParms]);
  useEffect(() => {
    if (filter !== null && sortOption !== null)
      dispatch(
        fetchAllProducts({ filterParams: filter, sortParams: sortOption }),
      );
  }, [dispatch, filter, sortOption]);

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const crateQuaryString = createSearchParamsHelper(filter);
      SetsearchParms(new URLSearchParams(crateQuaryString));
    }
  }, [filter, createSearchParamsHelper, SetsearchParms]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-10 max-w-screen-2xl mx-auto w-full bg-[#fcfcfc] ">
      {/* ═══════════ MAIN CONTAINER ═══════════ */}
      <div className="bg-white w-full border border-zinc-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col">
        {/* ═══════════ HEADER SECTION ═══════════ */}
        <div className="p-6 md:p-10 border-b border-zinc-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="h-[1px] w-8 bg-[#D4AF37]" />
              <span className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em]">
                Prêt-à-Porter
              </span>
            </div>
            <h2 className="text-4xl font-black text-zinc-900 tracking-tighter uppercase">
              Collections<span className="text-[#D4AF37]">.</span>
            </h2>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
              {productList.length} Exceptional Masterpieces Found
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* FILTER BUTTON */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-none border-zinc-200 flex items-center gap-3 hover:bg-zinc-900 hover:text-white transition-all duration-500 group"
                >
                  <Filter className="h-4 w-4 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Refine
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-xs p-0 border-r border-zinc-100"
              >
                <SheetHeader className="p-8 border-b border-zinc-100 bg-zinc-50/50">
                  <SheetTitle className="text-left flex items-center gap-3">
                    <span className="font-black text-xl uppercase tracking-tighter">
                      Refine Search
                    </span>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-full pb-20 p-6">
                  <ProductFilter filter={filter} handleFilter={handleFilter} />
                </div>
              </SheetContent>
            </Sheet>

            {/* SORT DROPDOWN */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-12 px-6 rounded-none border-zinc-200 flex items-center gap-3 hover:bg-zinc-900 hover:text-white transition-all duration-500"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    Sort
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[220px] rounded-none p-2 border-zinc-100 shadow-2xl"
              >
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={handleSolt}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      value={option.id}
                      key={option.id}
                      className="px-4 py-3 cursor-pointer transition-colors focus:bg-zinc-50 text-[11px] font-bold uppercase tracking-tight"
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* ═══════════ PRODUCT GRID ═══════════ */}
        <motion.div 
          layout
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border-l border-zinc-100"
        >
          <AnimatePresence mode="popLayout">
            {isLoading ? (
              [...Array(8)].map((_, i) => (
                <motion.div 
                  layout
                  variants={{
                    hidden: { opacity: 0, scale: 0.95, filter: "blur(10px)" },
                    show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4 } },
                    exit: { opacity: 0, scale: 0.95, filter: "blur(10px)" }
                  }}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  key={`skeleton-${i}`} 
                  className="border-r border-b border-zinc-100 p-4 transform-gpu"
                >
                  <ProductSkeleton />
                </motion.div>
              ))
            ) : productList.length > 0 ? (
              productList.map((product) => (
                <motion.div
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
                  key={`product-${product._id || product.id}`}
                  className="border-r border-b border-zinc-100 transform-gpu bg-white"
                >
                  <ShopingProductTile
                    product={product}
                    handleGetProductDeatils={handleGetProductDeatils}
                    handleAddToCard={handleAddToCard}
                  />
                </motion.div>
              ))
            ) : (
              /* NO MATCHES FOUND SECTION */
              <motion.div 
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="col-span-full flex flex-col items-center justify-center py-40 text-center bg-zinc-50/30"
              >
                <div className="relative mb-8">
                  <div className="h-20 w-20 rounded-none border border-[#D4AF37]/30 flex items-center justify-center rotate-45">
                    <Search className="h-8 w-8 text-[#D4AF37] -rotate-45" />
                  </div>
                </div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tighter uppercase mb-2">
                  Selection Unavailable
                </h2>
                <p className="text-[11px] text-zinc-400 font-bold uppercase tracking-[0.2em] max-w-xs mx-auto leading-relaxed">
                  The requested filter combination yielded no results. Please
                  refine your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setFilter({})}
                  className="mt-10 h-12 px-10 rounded-none border-zinc-900 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-zinc-900 hover:text-white transition-all"
                >
                  Reset All Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <ProductDetailsDialog
        open={openDetilsDialog}
        setOpen={setOpenDetilsDialog}
        productDetils={productDeatils}
        isDetailsLoading={isDetailsLoading}
        handleAddToCard={handleAddToCard}
      />
    </div>
  );
};

export default ShoppingListing;
