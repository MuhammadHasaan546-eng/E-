import { fetchAllProducts } from "@/api/shop/product";
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

const ShoppingListing = () => {
  const { productList } = useSelector((state) => state.shopingProductSlice);
  const [filter, setFilter] = useState({});
  const [sortOption, setSortOption] = useState(null);

  const dispatch = useDispatch();

  const handleSolt = (value) => {};
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
    console.log(cpyFilter);

    setFilter(cpyFilter);
    sessionStorage.setItem("filter", JSON.stringify(cpyFilter));
  }
  useEffect(() => {
    const savedFilter = sessionStorage.getItem("filter");
    if (savedFilter) setFilter(JSON.parse(savedFilter));

    setSortOption("price-lowtohigh");
  }, []);
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [filter]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6  ">
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
                <ShopingProductTile key={product.id} product={product} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListing;
