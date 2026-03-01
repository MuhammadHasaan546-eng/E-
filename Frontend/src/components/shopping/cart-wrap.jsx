import React from "react";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { Button } from "../ui/button";

function UserCartWarp() {
  return (
    <SheetContent className=" sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="mt-8 space-y-4"></div>
      <div className="mt-8 space-y-4">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-lg font-semibold">$19.99</span>
        </div>
        <Button className="w-full ">Checkout</Button>
      </div>
    </SheetContent>
  );
}

export default UserCartWarp;
