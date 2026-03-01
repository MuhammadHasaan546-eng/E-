import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { StarIcon, X } from "lucide-react"; // X icon
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "../ui/avatar";

const ProductDetailsDialog = ({ open, setOpen, productDetils }) => {
  if (!productDetils) return <div>Loading...</div>;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Overlay className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity" />

      <Dialog.Content
        className="
      fixed z-50 inset-0 bg-white overflow-y-auto
      md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2
      md:w-full md:max-w-4xl lg:max-w-5xl md:max-h-[85vh] 
      md:rounded-2xl md:grid md:grid-cols-2 md:overflow-hidden 
      md:shadow-2xl
    "
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="
        absolute top-4 right-4 z-50 p-2 
        bg-white/80 backdrop-blur text-gray-600 rounded-full 
        hover:bg-white hover:text-gray-900 transition-colors shadow-sm
        md:bg-gray-100 md:hover:bg-gray-200
      "
        >
          <X size={20} />
        </button>

        <Dialog.Title asChild>
          <VisuallyHidden>{productDetils.title}</VisuallyHidden>
        </Dialog.Title>

        {/* Product Image Section */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-full bg-gray-100 flex items-center justify-center p-4 md:p-8">
          <img
            src={productDetils.image}
            alt={productDetils.title}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Product Details & Reviews Section */}
        <div className="flex flex-col p-5 sm:p-8 md:overflow-y-auto">

          {/* Top Details */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold pr-10 text-gray-900">
              {productDetils.title}
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base leading-relaxed">
              {productDetils.description}
            </p>

            {/* Price */}
            <div className="flex flex-wrap items-end gap-3 mt-5">
              {productDetils.salePrice > 0 ? (
                <>
                  <p className="text-3xl font-bold text-blue-600">
                    ${productDetils.salePrice}
                  </p>
                  <p className="text-lg font-medium text-gray-400 line-through mb-1">
                    ${productDetils.price}
                  </p>
                </>
              ) : (
                <p className="text-3xl font-bold text-gray-900">
                  ${productDetils.price}
                </p>
              )}
            </div>

            {/* Add to Cart Container */}
            <div className="mt-6 space-y-4">
              <p className="text-sm text-gray-600">
                Available in sizes: <span className="font-semibold text-gray-900">XS, S, M, L, XL</span>
              </p>
              <Button className="w-full py-6 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/20 transition-all">
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sticky top-0 bg-white z-10 py-2">
              Reviews
            </h2>

            <div className="space-y-4">
              {/* Example Review */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                {/* Added shrink-0 to prevent avatar from stretching horizontally if text is long */}
                <Avatar className="w-10 h-10 border border-gray-200 shadow-sm shrink-0">
                  <AvatarFallback className="bg-white text-gray-700 font-medium">H</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <h3 className="font-semibold text-gray-900 text-sm">Muhammad Hasaan</h3>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-3.5 h-3.5 ${i < 4 ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mt-2 text-pretty">
                    This is an awesome product. Lorem ipsum, dolor sit amet
                    consectetur adipisicing elit. Impedit aut aperiam obcaecati
                    maiores officia.
                  </p>
                </div>
              </div>

              {/* Additional reviews render here... */}
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>

  );
};

export default ProductDetailsDialog;
