import React from "react";
import { Button } from "../ui/button";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/api/shop/cart";
import { toast } from "sonner";

function UserCartItemsContent({ cartItem }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleUpdateQuantity = (type) => {
    let newQuantity = cartItem.quantity;
    if (type === "plus") {
      newQuantity += 1;
    } else {
      if (newQuantity > 1) {
        newQuantity -= 1;
      }
    }

    dispatch(
      updateCartItem({
        userId: user.id,
        productId: cartItem.productId,
        quantity: newQuantity,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast("Cart updated");
      }
    });
  };

  const handleCartDelete = (getCartItem) => {
    dispatch(
      deleteCartItem({ userId: user.id, productId: getCartItem.productId }),
    ).then((data) => {
      if (data?.payload?.success) {
        toast.error("Item removed from cart");
      }
    });
  };

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-border/50 last:border-0 group">
      <div className="relative overflow-hidden rounded-xl border border-border/50 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-md">
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="w-20 h-20 object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        {cartItem.salePrice > 0 && (
          <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            Sale
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-bold leading-tight line-clamp-1 text-foreground transition-colors group-hover:text-primary">
          {cartItem.title}
        </h3>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border/60 rounded-lg p-0.5 bg-muted/30">
            <Button
              onClick={() => handleUpdateQuantity("minus")}
              disabled={cartItem.quantity <= 1}
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-md hover:bg-background hover:text-primary disabled:opacity-30"
            >
              <MinusIcon className="h-3 w-3" />
            </Button>

            <span className="w-8 text-center text-xs font-bold tabular-nums">
              {cartItem.quantity}
            </span>

            <Button
              onClick={() => handleUpdateQuantity("plus")}
              size="icon"
              variant="ghost"
              className="h-7 w-7 rounded-md hover:bg-background hover:text-primary"
            >
              <PlusIcon className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="text-right">
          <p className="font-bold text-sm text-primary">
            $
            {(
              (cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) *
              cartItem.quantity
            ).toFixed(2)}
          </p>
          {cartItem.salePrice > 0 && (
            <p className="text-[10px] text-muted-foreground line-through decoration-destructive/50">
              ${(cartItem.price * cartItem.quantity).toFixed(2)}
            </p>
          )}
        </div>

        <Button
          onClick={() => handleCartDelete(cartItem)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-all duration-300 transform active:scale-90"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default UserCartItemsContent;
