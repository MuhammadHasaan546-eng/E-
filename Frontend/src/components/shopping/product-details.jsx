import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { StarIcon, X, ShoppingCart, Tag, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { createCart, fetchCartItems } from "@/api/shop/cart";
import { toast } from "sonner";
import { setProductDetails } from "@/store/shop/product-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetils }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  if (!productDetils) return null;

  const discount =
    productDetils.salePrice > 0
      ? Math.round(
          ((productDetils.price - productDetils.salePrice) /
            productDetils.price) *
            100,
        )
      : null;

  function handleAddToCart(getCurrentProductId) {
    dispatch(
      createCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast.success(data.payload.message);
      } else {
        toast.error(data?.payload?.message || "Failed to add to cart");
      }
    });
  }

  function handleDialogClose() {
    dispatch(setProductDetails(null));
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleDialogClose}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md transition-all duration-300" />

      <Dialog.Content
        className="
          fixed z-50 inset-0 bg-white overflow-y-auto
          md:inset-auto md:top-1/2 md:left-1/2
          md:-translate-x-1/2 md:-translate-y-1/2
          md:w-full md:max-w-5xl md:max-h-[88vh]
          md:rounded-3xl md:grid md:grid-cols-2 md:overflow-hidden
          md:shadow-[0_32px_80px_rgba(0,0,0,0.25)]
          focus:outline-none
        "
      >
        <button
          onClick={handleDialogClose}
          className="
            absolute top-4 right-4 z-50 p-2
            bg-white/80 backdrop-blur text-gray-500 rounded-full
            hover:bg-red-50 hover:text-red-500
            transition-all duration-200 shadow-md border border-gray-100
          "
        >
          <X size={18} />
        </button>

        <Dialog.Title asChild>
          <VisuallyHidden>{productDetils.title}</VisuallyHidden>
        </Dialog.Title>

        <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-full md:min-h-[500px] bg-gradient-to-br from-slate-100 via-gray-50 to-blue-50 flex items-center justify-center p-6 sm:p-10 md:p-12 overflow-hidden">
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-indigo-100 rounded-full opacity-40 blur-3xl" />

          <img
            src={productDetils.image}
            alt={productDetils.title}
            className="relative z-10 w-full h-full max-w-[90%] max-h-[90%] object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-105"
          />

          {discount && (
            <span className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/30">
              <Tag size={11} />
              {discount}% OFF
            </span>
          )}
        </div>

        <div className="flex flex-col p-6 sm:p-8 md:overflow-y-auto">
          {productDetils.category && (
            <span className="inline-block self-start text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-3">
              {productDetils.category}
            </span>
          )}

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
            {productDetils.title}
          </h1>

          {/* Star Rating Row */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 h-4 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 font-medium">(4.0)</span>
            <span className="text-xs text-gray-400">· 128 reviews</span>
          </div>

          {/* Description */}
          <p className="text-gray-500 mt-4 text-sm leading-relaxed line-clamp-3">
            {productDetils.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mt-5">
            {productDetils.salePrice > 0 ? (
              <>
                <span className="text-3xl font-black text-blue-600">
                  ${productDetils.salePrice}
                </span>
                <span className="text-lg font-medium text-gray-400 line-through">
                  ${productDetils.price}
                </span>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  Save $
                  {(productDetils.price - productDetils.salePrice).toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-3xl font-black text-gray-900">
                ${productDetils.price}
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="my-5 border-t border-gray-100" />

          <Button
            className="
              w-full py-6 text-base font-bold rounded-2xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white shadow-xl shadow-blue-500/30
              flex items-center justify-center gap-2
              transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]
            "
            onClick={() => handleAddToCart(productDetils._id)}
          >
            <ShoppingCart size={20} />
            Add to Cart
          </Button>

          {/* ── Reviews Section ── */}
          <div className="mt-8">
            <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="inline-block w-1 h-5 bg-blue-500 rounded-full" />
              Customer Reviews
            </h2>

            {/* Existing review */}
            <div className="flex gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <Avatar className="w-9 h-9 border-2 border-blue-100 shrink-0">
                <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                  H
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    Muhammad Hasaan
                  </h3>
                  <span className="text-xs text-gray-400">2 days ago</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-3.5 h-3.5 ${i < 4 ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mt-1.5">
                  Amazing quality and fast delivery. Highly recommend this
                  product to everyone!
                </p>
              </div>
            </div>

            {/* Write a Review */}
            <div className="flex gap-2 mt-4 items-center">
              <Input
                placeholder="Write your review..."
                className="flex-1 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm transition-all"
              />
              <Button
                size="icon"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 shrink-0 w-10 h-10"
              >
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProductDetailsDialog;
