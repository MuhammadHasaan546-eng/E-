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
import { fetchAllProducts, fetchProductDeatils } from "@/api/shop/product";
import { addProductReview, getProductReviews } from "@/api/shop/review";
import React, { useEffect, useState } from "react";

import { Skeleton } from "../ui/skeleton";

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetils,
  isDetailsLoading,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.shopReview);
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (productDetils?._id) {
      dispatch(getProductReviews(productDetils._id));
    }
  }, [productDetils, dispatch]);

  // Show skeleton if loading or no data yet
  if (isDetailsLoading || !productDetils) {
    return (
      <Dialog.Root
        open={open}
        onOpenChange={() => {
          if (!isDetailsLoading) {
            dispatch(setProductDetails(null));
            setOpen(false);
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
          <Dialog.Content
            className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white w-full h-full md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg md:p-6 md:max-w-[90vw] md:lg:max-w-[70vw] md:max-h-[90vh] grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto"
            aria-describedby={undefined}
          >
            <Dialog.Title asChild>
              <VisuallyHidden>Loading product details</VisuallyHidden>
            </Dialog.Title>
            {/* Left: image skeleton */}
            <div className="relative w-full h-[70vh] md:h-full bg-zinc-50 flex items-center justify-center p-12">
              <Skeleton className="w-full h-full max-w-[80%] max-h-[80%] rounded-none" />
            </div>
            {/* Right: content skeleton */}
            <div className="flex flex-col p-6 sm:p-8 gap-4">
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-10 w-1/2" />
              <Skeleton className="h-6 w-1/4 rounded-full" />
              <div className="border-t border-gray-100 my-2" />
              <Skeleton className="h-14 w-full rounded-2xl" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-4 w-1/3" />
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex gap-3 p-4 bg-gray-50 rounded-2xl"
                  >
                    <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3 w-1/3" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }

  const averageRating =
    reviews && reviews.length > 0
      ? (
          reviews.reduce((acc, rev) => acc + rev.reviewValue, 0) /
          reviews.length
        ).toFixed(1)
      : "0";

  function handleAddReview() {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }
    if (reviewMsg.trim() === "") {
      toast.error("Please enter a review message");
      return;
    }

    dispatch(
      addProductReview({
        productId: productDetils?._id,
        userId: user?.id,
        userName: user?.username,
        message: reviewMsg,
        reviewValue: rating,
      }),
    ).then((data) => {
      if (data?.payload?.success) {
        setReviewMsg("");
        setRating(0);
        dispatch(getProductReviews(productDetils._id));
        toast.success("Review added successfully!");
      } else {
        toast.error(data?.payload?.message || "Failed to add review");
      }
    });
  }

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
        // Refresh product list to update stock counts globally
        dispatch(
          fetchAllProducts({
            filterParams: {},
            sortParams: "price-lowtohigh",
          }),
        );
        toast.success(data.payload.message || "Item added to cart");
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
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />

        <Dialog.Content
          data-lenis-prevent
          className="fixed top-0 left-0 right-0 bottom-0 z-50 bg-white w-full h-full md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-lg md:p-4 md:sm:p-6 md:max-w-[90vw] md:sm:max-w-[80vw] md:lg:max-w-[70vw] md:max-h-[90vh] md:overflow-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 overflow-y-auto pr-2"
          aria-describedby={undefined}
          onCloseAutoFocus={(e) => e.preventDefault()}
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

          <div className="relative w-full h-[70vh] sm:h-[75vh] md:h-full md:min-h-[500px] bg-linear-to-br from-slate-100 via-gray-50 to-blue-50 flex items-center justify-center overflow-hidden">
            {/* Decor Circles */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-100 rounded-full opacity-50 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 w-56 h-56 bg-indigo-100 rounded-full opacity-40 blur-3xl" />

            {/* FIXED IMAGE: Full display without scale */}
            <img
              src={productDetils.image}
              alt={productDetils.title}
              className="relative z-10 w-full h-full object-cover transform-gpu will-change-transform"
              style={{
                filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))",
              }}
            />

            {discount && (
              <span className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-red-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 shadow-xl">
                <Tag size={12} className="mr-1" />
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

            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight pr-8">
              {productDetils.title}
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(Number(averageRating)) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                ({averageRating})
              </span>
              <span className="text-xs text-gray-400">
                · {reviews.length} reviews
              </span>
            </div>

            <p className="text-gray-500 mt-4 text-sm leading-relaxed line-clamp-3">
              {productDetils.description}
            </p>
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

            <div className="mt-4 flex items-center gap-2">
              <span
                className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                  productDetils.stock === 0
                    ? "bg-red-50 text-red-600"
                    : productDetils.stock <= 5
                      ? "bg-amber-50 text-amber-600"
                      : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {productDetils.stock === 0
                  ? "Out of Stock"
                  : `${productDetils.stock} items remaining`}
              </span>
            </div>

            <div className="my-5 border-t border-gray-100" />

            <Button
              className={`
              w-full py-6 text-base font-bold rounded-2xl
              text-white shadow-xl flex items-center justify-center gap-2
              transition-all duration-300
              ${
                productDetils.stock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]"
              }
            `}
              disabled={productDetils.stock === 0}
              onClick={() => handleAddToCart(productDetils._id)}
            >
              <ShoppingCart size={20} />
              {productDetils.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </Button>

            <div className="mt-8">
              <h2 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="inline-block w-1 h-5 bg-blue-500 rounded-full" />
                Customer Reviews
              </h2>

              <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
                {reviews && reviews.length > 0 ? (
                  reviews.map((rev) => (
                    <div
                      key={rev._id}
                      className="flex gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100"
                    >
                      <Avatar className="w-9 h-9 border-2 border-blue-100 shrink-0">
                        <AvatarFallback className="bg-blue-600 text-white text-sm font-bold">
                          {rev.userName ? rev.userName[0].toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900 text-sm">
                            {rev.userName}
                          </h3>
                          <span className="text-xs text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              className={`w-3.5 h-3.5 ${i < rev.reviewValue ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed mt-1.5">
                          {rev.message}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-400 text-center py-4">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>

              <div className="mt-6 p-4 border border-gray-100 rounded-2xl bg-white shadow-sm">
                <h3 className="text-sm font-bold text-gray-800 mb-3">
                  Rate this product
                </h3>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`p-1 transition-all duration-300 hover:scale-125 active:scale-95 ${
                        star <= rating
                          ? "text-amber-500"
                          : "text-gray-300 hover:text-amber-400"
                      }`}
                      onClick={() => setRating(star)}
                    >
                      <StarIcon
                        className={`w-7 h-7 drop-shadow-sm ${
                          star <= rating ? "fill-amber-500" : "fill-transparent"
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 items-center">
                  <Input
                    value={reviewMsg}
                    onChange={(e) => setReviewMsg(e.target.value)}
                    placeholder="Share your thoughts..."
                    className="flex-1 rounded-xl border-gray-200 bg-gray-50 focus:bg-white text-sm transition-all h-10"
                  />
                  <Button
                    onClick={handleAddReview}
                    size="icon"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 shrink-0 w-10 h-10"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default React.memo(ProductDetailsDialog);
