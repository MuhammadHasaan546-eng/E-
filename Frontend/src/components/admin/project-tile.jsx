import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";

const AdminProductTile = ({
  product,
  setFromData,
  setOpenCurentProductDialog,
  setCurrentEditId,
  handleDelete,
}) => {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden border-0 bg-white shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-[0_20px_40px_-10px_rgba(6,81,237,0.15)] hover:-translate-y-2 transition-all duration-500 group">
      <div className="relative overflow-hidden aspect-4/3">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <CardContent className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary transition-colors">
          {product.title}
        </h3>
        <div className="flex justify-between items-center mb-1">
          <div className="flex items-center gap-2">
            {product.salePrice > 0 ? (
              <>
                <span className="text-lg font-extrabold text-primary">
                  ${product.salePrice}
                </span>
                <span className="text-sm font-medium text-gray-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-extrabold text-primary">
                ${product.price}
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center px-5 pb-5 pt-0">
        <Button
          onClick={() => {
            setOpenCurentProductDialog(true);
            setCurrentEditId(product._id);
            setFromData(product);
          }}
          variant="outline"
          className="rounded-full px-6 border-gray-200 hover:bg-primary hover:text-white transition-colors duration-300"
        >
          Edit
        </Button>
        <Button
          variant="destructive"
          onClick={() => handleDelete(product._id)}
          className="rounded-full px-6 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
