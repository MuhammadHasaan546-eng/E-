import React from "react";
import { Outlet } from "react-router-dom";
import ShoppinHeader from "./Header";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden">
      {/* Common Header  */}
      <ShoppinHeader />
      <div className="flex flex-col w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default ShoppingLayout;
