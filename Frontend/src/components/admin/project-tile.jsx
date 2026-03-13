import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit3, Trash2, Box } from "lucide-react";

const AdminProductTile = ({
  product,
  setFromData,
  setOpenCurentProductDialog,
  setCurrentEditId,
  handleDelete,
}) => {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden border-0 bg-white shadow-sm hover:shadow-xl transition-all duration-500 group rounded-2xl">
      {/* Image Section */}
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={product?.image}
          alt={product?.title}
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 transform-gpu will-change-transform"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product?.salePrice > 0 && (
            <Badge className="bg-rose-500 hover:bg-rose-600 border-0 text-white font-bold">
              SALE
            </Badge>
          )}
          {product?.totalStock <= 5 && (
            <Badge className="bg-amber-500 border-0 text-white font-bold">
              Low Stock: {product?.totalStock}
            </Badge>
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Section */}
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest bg-violet-50 px-2 py-1 rounded">
            {product?.category}
          </span>
          <div className="flex items-center text-gray-400 text-xs">
            <Box size={12} className="mr-1" />
            Stock: {product?.totalStock}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-1 group-hover:text-violet-600 transition-colors">
          {product?.title}
        </h3>

        <div className="flex items-center gap-2">
          {product?.salePrice > 0 ? (
            <>
              <span className="text-xl font-black text-gray-900">
                ${product?.salePrice}
              </span>
              <span className="text-sm font-medium text-gray-400 line-through">
                ${product?.price}
              </span>
            </>
          ) : (
            <span className="text-xl font-black text-gray-900">
              ${product?.price}
            </span>
          )}
        </div>
      </CardContent>

      {/* Actions Section */}
      <CardFooter className="flex justify-between items-center px-5 pb-5 pt-0 gap-3">
        <Button
          onClick={() => {
            setOpenCurentProductDialog(true);
            setCurrentEditId(product?._id);
            setFromData(product);
          }}
          variant="outline"
          className="flex-1 rounded-xl border-gray-200 hover:border-violet-600 hover:bg-violet-50 hover:text-violet-700 transition-all duration-300 gap-2"
        >
          <Edit3 size={16} />
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDelete(product?._id)}
          className="rounded-xl px-4 shadow-sm hover:shadow-rose-200 transition-all duration-300"
        >
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default React.memo(AdminProductTile);
