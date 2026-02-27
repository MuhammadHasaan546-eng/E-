import ProductFilter from "@/components/product/filter";
import React from "react";

const ShoppingListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6  ">
      <ProductFilter />
    </div>
  );
};

export default ShoppingListing;
