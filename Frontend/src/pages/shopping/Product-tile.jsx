import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { brandOptionMap, categoryOptionMap } from "@/config";
import React from "react";

const ShopingProductTile = ({
  product,
  handleGetProductDeatils,
  handleAddToCard,
}) => {
  return (
    <Card className="group relative w-full max-w-sm mx-auto overflow-hidden rounded-[2rem] border-none bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 hover:shadow-[0_30px_60px_rgba(0,0,0,0.12)] hover:-translate-y-3 cursor-pointer">
      <div
        onClick={() => handleGetProductDeatils(product._id)}
        className="relative aspect-square overflow-hidden bg-muted/5 shadow-inner"
      >
        <img
          src={product.image}
          className="w-full h-full object-cover transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-105"
          alt={product.title}
        />

        {/* Cinematic Overlay on Hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <div className="translate-y-2 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-2xl">
              View
            </span>
          </div>
        </div>

        {product.salePrice > 0 ? (
          <div className="absolute top-3 left-3 z-10">
            <Badge className="bg-red-500 text-white border-none px-3 py-1 font-black text-[9px] uppercase tracking-widest rounded-full shadow-lg shadow-red-500/20">
              Sale
            </Badge>
          </div>
        ) : null}
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black text-primary/40 uppercase tracking-[0.2em]">
              {brandOptionMap[product.brand] || "Premium Brand"}
            </span>
            <h3 className="text-xl font-bold text-primary tracking-tight leading-tight group-hover:text-primary/70 transition-colors truncate">
              {product.title}
            </h3>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
            <span className="px-2 py-0.5 bg-muted/50 rounded-md">
              {categoryOptionMap[product.category]}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {product.salePrice > 0 ? (
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-black text-primary tracking-tight">
                ${product.salePrice}
              </span>
              <span className="text-sm font-bold text-muted-foreground/40 line-through">
                ${product.price}
              </span>
            </div>
          ) : (
            <span className="text-2xl font-black text-primary tracking-tight">
              ${product.price}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCard(product._id);
          }}
          className="w-full h-12 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/10 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 hover:scale-[1.02] active:scale-95"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ShopingProductTile;
