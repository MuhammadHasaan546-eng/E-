import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionMap, categoryOptionMap } from "@/config";
import React from "react";

const ShopingProductTile = ({ product }) => {
  return (
    <Card className="w-full max-w-sm  mx-auto mb-6">
      <div>
        <div className="relative">
          <img
            src={product.image}
            className="w-full h-64 object-cover rounded-t-lg"
            alt={product.title}
          />
          {product.salePrice > 0 ? (
            <Badge className="absolute top-2 left-2 bg-red-500 text-white hover:bg-red-600">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <div className="flex justify-between items-center mb-2 ">
            <span className="text-[16px] text-muted-foreground">
              {categoryOptionMap[product.category]}
            </span>
            <span className="text-[16px] text-muted-foreground">
              {brandOptionMap[product.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2 ">
            <span
              className={` ${product.salePrice > 0 ? "line-through" : ""} font-semibold text-primary text-[17px]`}
            >
              ${product.price}
            </span>
            {product.salePrice > 0 ? (
              <span className="font-semibold text-primary text-[17px]">
                ${product.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Add to Cart</Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ShopingProductTile;
