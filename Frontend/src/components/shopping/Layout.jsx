import React from "react";
import { Outlet } from "react-router-dom";
import ShoppinHeader from "./Header";
import Footer from "./Footer";

const ShoppingLayout = () => {
  return (
    <div className="flex flex-col bg-white min-h-screen">
      <ShoppinHeader />
      <div className="flex flex-col w-full grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingLayout;
