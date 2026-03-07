import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDeatils } from "@/api/shop/product";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import ProductDetailsDialog from "@/components/shopping/product-details";
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingCart,
  X,
  ChevronDown,
  ChevronUp,
  Loader2,
  PackageSearch,
  Sparkles,
  Filter,
  Tag,
  Handbag,
  ShoppingBag,
  Watch,
  Shirt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { brandOptionMap, categoryOptionMap } from "@/config";
import { searchProducts } from "@/api/shop/search/search";

const CATEGORIES = [
  { id: "mens_clothing", label: "Men's Clothing" },
  { id: "womens_clothing", label: "Women's Clothing" },
  { id: "kids_clothing", label: "Kids' Clothing" },
  { id: "shoes", label: "Shoes" },
  { id: "accessories", label: "Accessories" },
  { id: "bags", label: "Bags" },
  { id: "watches", label: "Watches" },
];

const BRANDS = [
  { id: "nike", label: "Nike" },
  { id: "adidas", label: "Adidas" },
  { id: "gucci", label: "Gucci" },
  { id: "prada", label: "Prada" },
  { id: "louis_vuitton", label: "Louis Vuitton" },
  { id: "balenciaga", label: "Balenciaga" },
  { id: "zara", label: "Zara" },
  { id: "levis", label: "Levi's" },
  { id: "puma", label: "Puma" },
  { id: "converse", label: "Converse" },
];

const SORT_OPTIONS = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

const MAX_PRICE = 2000;

const StarRating = ({ rating = 4, size = 13 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={size}
        className={
          s <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-muted text-muted"
        }
      />
    ))}
  </div>
);

const FilterSection = ({ title, children, defaultOpen = true }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border/40 pb-5 last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-1 text-left group"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground group-hover:text-primary transition-colors">
          {title}
        </span>
        {open ? (
          <ChevronUp
            size={13}
            className="text-muted-foreground/50 group-hover:text-primary transition-colors"
          />
        ) : (
          <ChevronDown
            size={13}
            className="text-muted-foreground/50 group-hover:text-primary transition-colors"
          />
        )}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "mt-4 max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const FilterPanel = ({
  filters,
  setFilters,
  priceRange,
  setPriceRange,
  onClear,
}) => {
  const activeCount =
    filters.categories.length +
    filters.brands.length +
    (priceRange[1] < MAX_PRICE ? 1 : 0);

  const toggle = (key, id) =>
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(id)
        ? prev[key].filter((x) => x !== id)
        : [...prev[key], id],
    }));

  return (
    <aside className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-primary/10 flex items-center justify-center">
            <Filter size={13} className="text-primary" />
          </div>
          <span className="text-sm font-bold text-primary">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-5">
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <input
              type="range"
              min={0}
              max={MAX_PRICE}
              step={10}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-muted accent-primary"
              style={{
                background: `linear-gradient(to right, hsl(var(--primary)) ${(priceRange[1] / MAX_PRICE) * 100}%, hsl(var(--muted)) ${(priceRange[1] / MAX_PRICE) * 100}%)`,
              }}
            />
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground">
                $0
              </span>
              <span className="text-xs font-bold text-primary">
                ${priceRange[1]}
              </span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Category">
          <div className="flex flex-col gap-2.5">
            {CATEGORIES.map((cat) => (
              <label
                key={cat.id}
                className="group flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={filters.categories.includes(cat.id)}
                  onCheckedChange={() => toggle("categories", cat.id)}
                  className="h-4 w-4 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {cat.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        <FilterSection title="Brand" defaultOpen={false}>
          <div className="flex flex-col gap-2.5">
            {BRANDS.map((brand) => (
              <label
                key={brand.id}
                className="group flex cursor-pointer items-center gap-3"
              >
                <Checkbox
                  checked={filters.brands.includes(brand.id)}
                  onCheckedChange={() => toggle("brands", brand.id)}
                  className="h-4 w-4 rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  {brand.label}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>
      </div>
    </aside>
  );
};

const ProductCard = ({
  product,
  onAddToCart,
  addingId,
  handleGetProductDeatils,
}) => {
  const isAdding = addingId === product._id;
  const outOfStock = product.totalStock === 0;
  const hasDiscount =
    product.salePrice &&
    product.salePrice > 0 &&
    product.salePrice < product.price;
  const discountPct = hasDiscount
    ? Math.round(((product.price - product.salePrice) / product.price) * 100)
    : 0;
  const displayPrice = hasDiscount ? product.salePrice : product.price;

  return (
    <Card
      onClick={() => handleGetProductDeatils(product?._id)}
      className="group relative w-full mx-auto overflow-hidden rounded-[2rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative aspect-3/2 overflow-hidden bg-muted/5">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted/30">
            <PackageSearch size={40} className="text-muted-foreground/30" />
          </div>
        )}

        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <div className="translate-y-2 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
              Quick Look
            </span>
          </div>
        </div>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {outOfStock ? (
            <Badge className="bg-red-500 text-white border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20">
              Out of Stock
            </Badge>
          ) : product.totalStock <= 10 && product.totalStock > 0 ? (
            <Badge className="bg-amber-500 text-white border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/20">
              Only {product.totalStock} left
            </Badge>
          ) : hasDiscount ? (
            <Badge className="bg-green-500 text-white border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-full shadow-lg shadow-green-500/20">
              -{discountPct}% OFF
            </Badge>
          ) : null}
        </div>
      </div>

      <CardContent className="p-4 space-y-2">
        <div className="space-y-1">
          <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
            {brandOptionMap[product.brand] || product.brand || ""}
          </span>
          <h3 className="text-base font-bold text-primary tracking-tight leading-tight group-hover:text-primary/70 transition-colors line-clamp-2">
            {product.title}
          </h3>
          {product.category && (
            <span className="inline-block px-2 py-0.5 bg-muted/50 rounded-md text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
              {categoryOptionMap[product.category] || product.category}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <StarRating rating={product.averageRating || 0} size={12} />
          <span className="text-[10px] text-muted-foreground/50 font-medium">
            ({product.totalReviews || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2.5 pt-1">
          {hasDiscount ? (
            <>
              <span className="text-xl font-black text-primary tracking-tight">
                ${displayPrice?.toFixed(2)}
              </span>
              <span className="text-sm font-bold text-muted-foreground/40 line-through">
                ${product.price?.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-xl font-black text-primary tracking-tight">
              ${displayPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {outOfStock ? (
          <Button
            disabled
            className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10 opacity-40 cursor-not-allowed"
          >
            Out of Stock
          </Button>
        ) : (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            disabled={isAdding}
            className="w-full h-11 rounded-2xl bg-primary text-primary-foreground font-black text-[10px] uppercase tracking-widest shadow-lg shadow-primary/10 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95 gap-2"
          >
            {isAdding ? (
              <>
                <Loader2 size={13} className="animate-spin" />
                Adding…
              </>
            ) : (
              <>
                <ShoppingCart size={13} />
                Add to Cart
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const SkeletonCard = () => (
  <div className="flex flex-col rounded-[2rem] bg-white overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] animate-pulse">
    <div className="aspect-3/2 bg-muted/30" />
    <div className="p-4 space-y-3">
      <div className="h-3 w-1/3 rounded-full bg-muted/40" />
      <div className="h-5 w-4/5 rounded-full bg-muted/40" />
      <div className="h-3 w-1/2 rounded-full bg-muted/30" />
      <div className="h-6 w-1/3 rounded-full bg-muted/40 mt-1" />
      <div className="h-11 w-full rounded-2xl bg-muted/30 mt-2" />
    </div>
  </div>
);

const EmptyState = ({ keyword }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center px-6">
    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-muted/40 shadow-inner">
      <PackageSearch size={40} className="text-muted-foreground/30" />
    </div>
    <h3 className="mb-2 text-xl font-bold text-primary">No results found</h3>
    <p className="max-w-xs text-sm text-muted-foreground">
      {keyword
        ? `We couldn't find anything for "${keyword}". Try different keywords or adjust your filters.`
        : "Start typing to search our curated collection."}
    </p>
  </div>
);

const SearchPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { searchResult, isLoading } = useSelector((s) => s.shopSearch);
  const { productDeatils } = useSelector((s) => s.shopingProductSlice);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [filters, setFilters] = useState({ categories: [], brands: [] });
  const [priceRange, setPriceRange] = useState([0, MAX_PRICE]);
  const [sortBy, setSortBy] = useState("price-lowtohigh");
  const [addingId, setAddingId] = useState(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [openDetilsDialog, setOpenDetilsDialog] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedKeyword(keyword.trim()), 200);
    return () => clearTimeout(t);
  }, [keyword]);

  useEffect(() => {
    if (debouncedKeyword.length > 0) {
      dispatch(searchProducts({ keyword: debouncedKeyword }));
    }
  }, [debouncedKeyword, dispatch]);

  function handleGetProductDeatils(getCurrentProductId) {
    dispatch(fetchProductDeatils(getCurrentProductId));
  }

  useEffect(() => {
    if (productDeatils !== null) {
      setOpenDetilsDialog(true);
    }
  }, [productDeatils]);

  const handleAddToCart = useCallback(
    async (product) => {
      if (!user?.id) return;
      setAddingId(product._id);
      dispatch(
        createCart({ userId: user.id, productId: product._id, quantity: 1 }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user.id));
          toast.success(data.payload.message || "Item added to cart!");
        } else {
          toast.error(data?.payload?.message || "Failed to add to cart.");
        }
        setAddingId(null);
      });
    },
    [dispatch, user],
  );

  const filteredProducts = useMemo(() => {
    if (!searchResult) return [];
    let result = [...searchResult];

    if (filters.categories.length > 0)
      result = result.filter((p) => filters.categories.includes(p.category));
    if (filters.brands.length > 0)
      result = result.filter((p) => filters.brands.includes(p.brand));

    result = result.filter((p) => {
      const price = p.salePrice > 0 ? p.salePrice : (p.price ?? 0);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case "price-lowtohigh":
        result.sort(
          (a, b) =>
            (a.salePrice > 0 ? a.salePrice : a.price) -
            (b.salePrice > 0 ? b.salePrice : b.price),
        );
        break;
      case "price-hightolow":
        result.sort(
          (a, b) =>
            (b.salePrice > 0 ? b.salePrice : b.price) -
            (a.salePrice > 0 ? a.salePrice : a.price),
        );
        break;
      case "title-atoz":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-ztoa":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    return result;
  }, [searchResult, filters, priceRange, sortBy]);

  const clearFilters = () => {
    setFilters({ categories: [], brands: [] });
    setPriceRange([0, MAX_PRICE]);
  };

  const activeFilterCount =
    filters.categories.length +
    filters.brands.length +
    (priceRange[1] < MAX_PRICE ? 1 : 0);

  const showGrid = debouncedKeyword.length > 0;

  return (
    <div className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border/40 bg-background py-14 md:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 60%, hsl(var(--primary)/0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(var(--primary)/0.04) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          {/* Label */}
          <div className="mb-5 flex items-center justify-center gap-2">
            <Sparkles size={13} className="text-primary/40" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">
              Find your favorite products{" "}
            </span>
            <Sparkles size={13} className="text-primary/40" />
          </div>

          <h1 className="mb-8 text-center text-4xl font-black tracking-tighter text-primary md:text-6xl">
            Find Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-amber-900  ">
                Perfect Style
              </span>
              <span className="absolute inset-x-0 bottom-1 h-3 z-0 rounded-full opacity-20 bg-primary" />
            </span>
          </h1>

          <div className="relative group">
            <div className="flex items-center overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 focus-within:border-primary/30 focus-within:shadow-[0_20px_60px_rgb(0,0,0,0.08)]">
              <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center text-muted-foreground/40 group-focus-within:text-primary transition-colors duration-300">
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin text-primary" />
                ) : (
                  <Search size={20} />
                )}
              </div>

              <input
                ref={inputRef}
                id="search-input"
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search products, brands, categories…"
                className="h-[60px] flex-1 bg-transparent text-base font-semibold text-primary placeholder:text-muted-foreground/30 outline-none pr-4"
                autoComplete="off"
              />

              {keyword && (
                <button
                  onClick={() => {
                    setKeyword("");
                    inputRef.current?.focus();
                  }}
                  className="mr-3 flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground/40 hover:bg-muted hover:text-primary transition-all duration-200"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="absolute inset-x-0 -bottom-px h-px bg-linear-to-r from-transparent via-primary/30 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          </div>

          {!showGrid && (
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {["Watches", "Gucci", "Sneakers", "Women Dress", "Bags"].map(
                (tip) => (
                  <button
                    key={tip}
                    onClick={() => setKeyword(tip)}
                    className="rounded-full border border-border/50 bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all duration-200"
                  >
                    {tip}
                  </button>
                ),
              )}
            </div>
          )}
        </div>
      </section>

      {showGrid && (
        <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-sm font-semibold text-muted-foreground">
                {isLoading ? (
                  <span>Searching…</span>
                ) : (
                  <>
                    <span className="text-primary font-black">
                      {filteredProducts.length}
                    </span>{" "}
                    result{filteredProducts.length !== 1 ? "s" : ""} for{" "}
                    <span className="text-primary font-black">
                      "{debouncedKeyword}"
                    </span>
                  </>
                )}
              </p>

              {filters.categories.map((c) => {
                const cat = CATEGORIES.find((x) => x.id === c);
                return (
                  <Badge
                    key={c}
                    variant="outline"
                    className="gap-1.5 rounded-full border-primary/20 bg-primary/5 text-primary font-semibold text-xs pr-1"
                  >
                    {cat?.label}
                    <button
                      onClick={() =>
                        setFilters((f) => ({
                          ...f,
                          categories: f.categories.filter((x) => x !== c),
                        }))
                      }
                      className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <X size={9} />
                    </button>
                  </Badge>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Sheet
                open={mobileFiltersOpen}
                onOpenChange={setMobileFiltersOpen}
              >
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="lg:hidden relative gap-2 rounded-xl border-border/60 text-xs font-semibold hover:bg-primary/5 hover:text-primary hover:border-primary/30"
                  >
                    <SlidersHorizontal size={13} />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="w-80 overflow-y-auto p-6 bg-background border-r border-border/40"
                  aria-describedby={undefined}
                >
                  <SheetHeader className="mb-6">
                    <SheetTitle className="text-sm font-bold text-primary flex items-center gap-2">
                      <Filter size={14} className="text-primary/60" />
                      Refine Results
                    </SheetTitle>
                  </SheetHeader>
                  <FilterPanel
                    filters={filters}
                    setFilters={setFilters}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    onClear={clearFilters}
                  />
                </SheetContent>
              </Sheet>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none h-9 rounded-xl border border-border/60 bg-card pl-3 pr-8 text-xs font-semibold text-primary shadow-sm outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer transition-all hover:border-primary/30"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={12}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/50"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="sticky top-24 rounded-[1.5rem] bg-card border border-border/40 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <FilterPanel
                  filters={filters}
                  setFilters={setFilters}
                  priceRange={priceRange}
                  setPriceRange={setPriceRange}
                  onClear={clearFilters}
                />
              </div>
            </aside>

            <div className="flex-1 min-w-0">
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <EmptyState keyword={debouncedKeyword} />
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      addingId={addingId}
                      handleGetProductDeatils={handleGetProductDeatils}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {!showGrid && (
        <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          {/* Category quick-browse */}
          <div className="mb-4">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground/50 text-center mb-6">
              Browse Collections
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                emoji: <Shirt />,
                label: "Men's Fashion",
                sub: "2,400+ items",
                query: "men",
              },
              {
                emoji: <Sparkles />,
                label: "Women's Style",
                sub: "3,100+ items",
                query: "women",
              },
              {
                emoji: <Watch />,
                label: "Luxury Watches",
                sub: "580+ items",
                query: "watches",
              },
              {
                emoji: <ShoppingBag />,
                label: "Designer Bags",
                sub: "1,200+ items",
                query: "bags",
              },
            ].map((cat) => (
              <button
                key={cat.label}
                onClick={() => setKeyword(cat.query)}
                className="group flex flex-col items-center justify-center gap-3 rounded-[2rem] bg-card border border-border/40 p-6 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-primary/20 hover:bg-primary/5 transition-all duration-500 hover:-translate-y-1"
              >
                <span className="text-3xl sm:text-4xl">{cat.emoji}</span>
                <div>
                  <p className="text-sm font-bold text-primary group-hover:text-primary/70 transition-colors">
                    {cat.label}
                  </p>
                  <p className="text-[10px] text-muted-foreground/50 mt-0.5 font-medium">
                    {cat.sub}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-primary px-8 py-7 shadow-xl shadow-primary/20">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-foreground/50">
                  Members Exclusive
                </p>
                <p className="mt-1.5 text-xl font-black text-primary-foreground tracking-tight">
                  Free Shipping on Orders Over $150
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-primary-foreground">
                    24/7
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-0.5 font-bold">
                    Support
                  </span>
                </div>
                <div className="h-10 w-px bg-primary-foreground/10" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-primary-foreground">
                    30
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-0.5 font-bold">
                    Day Returns
                  </span>
                </div>
                <div className="h-10 w-px bg-primary-foreground/10" />
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-black text-primary-foreground">
                    100%
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-primary-foreground/50 mt-0.5 font-bold">
                    Authentic
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <ProductDetailsDialog
        open={openDetilsDialog}
        setOpen={setOpenDetilsDialog}
        productDetils={productDeatils}
        handleAddToCard={handleAddToCart}
      />
    </div>
  );
};

export default SearchPage;
