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
    <Card className="w-full max-w-md mx-auto hover:scale-105 transition-transform duration-300 ">
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h[300px] object-cover rounded-t-lg "
        />
      </div>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2 ">{product.title}</h3>
        <div className="flex justify-between items-center mb-2">
          <span
            className={` ${product.salePrice > 0 ? "line-through" : ""} text-md font-semibold text-primary`}
          >
            ${product.price}
          </span>
          {product.salePrice > 0 ? (
            <span className="text-md font-bold  ">${product.salePrice}</span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Button
          onClick={() => {
            setOpenCurentProductDialog(true);
            setCurrentEditId(product._id);
            setFromData(product);
          }}
          variant="outline"
        >
          Edit
        </Button>
        <Button variant="destructive" onClick={() => handleDelete(product._id)}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminProductTile;
