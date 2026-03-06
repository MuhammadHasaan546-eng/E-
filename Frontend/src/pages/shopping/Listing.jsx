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
import { ArrowUpDownIcon, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopingProductTile from "./Product-tile";
import ProductFilter from "@/components/product/filter";
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

const ShoppingListing = () => {
  const { productList, productDeatils, isLoading } = useSelector(
    (state) => state.shopingProductSlice,
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({});
  const [sortOption, setSortOption] = useState(null);
  const [searchParms, SetsearchParms] = useSearchParams();
  const [openDetilsDialog, setOpenDetilsDialog] = useState(false);

  function createSearchParamsHelper(filterParms) {
    const quaryPrams = [];

    for (const [key, value] of Object.entries(filterParms)) {
      if (Array.isArray(value) && value.length > 0) {
        const parmsValue = value.join(",");
        quaryPrams.push(`${key}=${encodeURIComponent(parmsValue)}`);
      }
    }
    return quaryPrams.join("&");
  }

  const handleSolt = (value) => {
    setSortOption(value);
  };
  function handleFilter(sectionId, optionId) {
    let cpyFilter = { ...filter };

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

    setFilter(cpyFilter);
    sessionStorage.setItem("filter", JSON.stringify(cpyFilter));
  }
  // getProductDeatils
  function handleGetProductDeatils(getCurrentProductId) {
    dispatch(fetchProductDeatils(getCurrentProductId));
  }

  // get add to cart
  function handleAddToCard(getCurrentProductId) {
    // let getCartItem = cartItems.items || [];
    // if (getCartItem.length) {
    //   const indexOfCurrentItem = getCartItem.findIndex(
    //     (item) => item.product._id === getCurrentProductId,
    //   );
    //   const getQuantity = getCartItem[indexOfCurrentItem].quantity;
    //   if (indexOfCurrentItem !== -1) {
    //     if (getQuantity >= productList[getCurrentProductId].stock) {
    //       toast.error("Product is out of stock");
    //       return;
    //     }
    //   }
    // }
    dispatch(
      createCart({
        userId: user.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data.payload.success) {
        dispatch(fetchCartItems(user.id));
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
  }

  useEffect(() => {
    if (productDeatils !== null) {
      setOpenDetilsDialog(true);
    }
  }, [productDeatils]);

  useEffect(() => {
    setSortOption("price-lowtohigh");
    const savedFilter = sessionStorage.getItem("filter");
    if (savedFilter) setFilter(JSON.parse(savedFilter));
  }, []);

  // Re-sync filter from session storage if the URL search parameters change
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
  }, [filter]);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-10 max-w-screen-2xl mx-auto w-full">
      <div className="bg-background w-full rounded-3xl border border-primary/5 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-primary/5 flex items-center justify-between gap-6 bg-linear-to-b from-muted/20 to-transparent">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-primary tracking-tighter">
              Collections
            </h2>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
              {productList.length} Exceptional items found
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-xl border-primary/10 flex items-center gap-2 hover:bg-primary/5 hover:text-primary transition-all active:scale-95"
                >
                  <Filter className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Filters
                  </span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-full max-w-xs p-0 border-r border-primary/5"
                aria-describedby={undefined}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                <SheetHeader className="p-6 border-b border-primary/5">
                  <SheetTitle className="text-left flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Filter className="h-4 w-4" />
                    </div>
                    <span className="font-bold text-lg">Filters</span>
                  </SheetTitle>
                </SheetHeader>
                <div className="overflow-y-auto h-full pb-20">
                  <ProductFilter filter={filter} handleFilter={handleFilter} />
                </div>
              </SheetContent>
            </Sheet>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 px-4 rounded-xl border-primary/10 flex items-center gap-2 hover:bg-primary/5 hover:text-primary transition-all active:scale-95"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider md:w-[80px]  ">
                    Sort By
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] rounded-2xl p-2 border-primary/5 shadow-2xl"
              >
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={handleSolt}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      value={option.id}
                      key={option.id}
                      className="rounded-xl px-3 py-2 cursor-pointer transition-colors focus:bg-primary/10 focus:text-primary"
                    >
                      <span className="text-sm font-medium">
                        {option.label}
                      </span>
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-700 ">
          {isLoading ? (
            [...Array(10)].map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-primary/5 bg-card shadow-sm overflow-hidden"
              >
                <Skeleton className="w-full aspect-square rounded-none" />
                <div className="p-5 space-y-4">
                  <Skeleton className="h-6 w-3/4 rounded-lg" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                    <Skeleton className="h-4 w-1/4 rounded-md" />
                  </div>
                  <Skeleton className="h-8 w-1/3 rounded-lg" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              </div>
            ))
          ) : productList.length > 0 ? (
            productList.map((product) => (
              <ShopingProductTile
                key={product.id}
                product={product}
                handleGetProductDeatils={handleGetProductDeatils}
                handleAddToCard={handleAddToCard}
              />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-40 sm:py-60 text-center animate-in fade-in zoom-in-95 duration-1000">
              <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150 animate-pulse" />
                <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-[2.5rem] bg-linear-to-br from-muted to-white border border-primary/5 flex items-center justify-center shadow-2xl">
                  <ArrowUpDownIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary/10" />
                </div>
              </div>

              <div className="space-y-3 max-w-md px-6">
                <h2 className="text-3xl sm:text-4xl font-black text-primary tracking-tighter">
                  No matches found
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground/60 font-medium leading-relaxed">
                  We couldn't find any products matching your specific
                  selection. Try broadening your scope or clearing all filters
                  to start fresh.
                </p>
              </div>

              <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setFilter({})}
                  className="h-12 px-8 rounded-2xl border-primary/10 font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all duration-500 active:scale-95"
                >
                  Clear all filters
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => window.location.reload()}
                  className="h-12 px-8 rounded-2xl font-bold text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  Refresh Page
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <ProductDetailsDialog
        open={openDetilsDialog}
        setOpen={setOpenDetilsDialog}
        productDetils={productDeatils}
        handleAddToCard={handleAddToCard}
      />
    </div>
  );
};

export default ShoppingListing;
