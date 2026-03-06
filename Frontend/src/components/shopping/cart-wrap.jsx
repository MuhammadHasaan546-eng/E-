import React from "react";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "../ui/sheet";
import { Button } from "../ui/button";
import UserCartItemsContent from "./cart-items-content";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserCartWarp({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  const totalCartAmount =
    cartItems && cartItems.length > 0
      ? cartItems.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0,
        )
      : 0;

  return (
    <SheetContent
      className="sm:max-w-md flex flex-col p-0 border-l border-border/40 bg-background/95 backdrop-blur-xl"
      aria-describedby={undefined}
      onCloseAutoFocus={(e) => e.preventDefault()}
    >
      <SheetHeader className="p-6 border-b border-border/40 bg-muted/20">
        <SheetTitle className="flex items-center gap-3 text-2xl font-extrabold tracking-tight">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShoppingBag className="h-5 w-5" />
          </div>
          Your Cart
          {cartItems.length > 0 && (
            <span className="ml-auto text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
              {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
            </span>
          )}
        </SheetTitle>
      </SheetHeader>

      <div className="flex-1 overflow-y-auto px-6">
        {cartItems && cartItems.length > 0 ? (
          <div className="divide-y divide-border/30">
            {cartItems.map((item) => (
              <UserCartItemsContent key={item.productId} cartItem={item} />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center space-y-4 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="h-20 w-20 rounded-3xl bg-muted/50 flex items-center justify-center mb-2">
              <ShoppingBag className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground max-w-[220px]">
                Looks like you haven't added anything to your cart yet.
              </p>
            </div>
            <Button
              onClick={() => setOpenCartSheet(false)}
              variant="outline"
              className="mt-4 rounded-full px-8 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>

      {cartItems && cartItems.length > 0 && (
        <SheetFooter className="p-6 border-t border-border/40 bg-muted/20 mt-auto flex-col sm:flex-col space-y-4">
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center px-1">
              <span className="text-sm text-muted-foreground font-medium">
                Subtotal
              </span>
              <span className="text-sm font-bold tabular-nums">
                ${totalCartAmount.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center px-1">
              <span className="text-sm text-muted-foreground font-medium">
                Shipping
              </span>
              <span className="text-sm font-bold text-green-600 uppercase tracking-wider">
                Free
              </span>
            </div>
            <div className="h-px w-full bg-border/40 my-2" />
            <div className="flex justify-between items-center px-1">
              <span className="text-lg font-black tracking-tight">Total</span>
              <span className="text-xl font-black text-primary tabular-nums tracking-tight">
                ${totalCartAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <Button
            className="w-full h-12 rounded-xl text-md font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 group"
            onClick={() => {
              navigate("/shop/checkout");
              setOpenCartSheet(false);
            }}
          >
            Checkout
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </SheetFooter>
      )}
    </SheetContent>
  );
}

export default UserCartWarp;
