import { fetchAllProducts, fetchProductDeatils } from "@/api/shop/product";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ShopingProductTile from "./Product-tile";
import ProductFilter from "@/components/product/filter";
import { useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "@/components/shopping/product-details";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import { toast } from "sonner";

const ShoppingListing = () => {
  const { productList, productDeatils } = useSelector(
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
    console.log(getCurrentProductId);
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

    // dispatch(createCart(getCurrentProductId));
  }

  useEffect(() => {
    if (productDeatils !== null) {
      setOpenDetilsDialog(true);
    }
  }, [productDeatils]);

  useEffect(() => {
    const savedFilter = sessionStorage.getItem("filter");
    if (savedFilter) setFilter(JSON.parse(savedFilter));

    setSortOption("price-lowtohigh");
  }, []);
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
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6  ">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold">Products</h2>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm">
              {productList.length} Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1  "
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-xs">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px]">
                <DropdownMenuRadioGroup
                  value={sortOption}
                  onValueChange={handleSolt}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem value={option.id} key={option.id}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 ">
          {productList.length > 0
            ? productList.map((product) => (
                <ShopingProductTile
                  key={product.id}
                  product={product}
                  handleGetProductDeatils={handleGetProductDeatils}
                  handleAddToCard={handleAddToCard}
                />
              ))
            : null}
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
