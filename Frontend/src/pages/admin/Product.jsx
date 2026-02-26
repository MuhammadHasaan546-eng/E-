import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormControls } from "@/config";
// import CommonFrom from "@/components/common/From";
import { createProduct, fetchProducts } from "@/api/auth/admin/products";
import { useDispatch, useSelector } from "react-redux";
import CommonFrom from "@/components/common/From";
import ProductImageUpload from "@/components/admin/ImageUpload";

const installFromData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
};

const AdminProduct = () => {
  const [fromData, setFromData] = useState(installFromData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [openCreateProduct, setCreateProductOpen] = useState(false);

  const onSubmit = async (data) => {};
  console.log(fromData);

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setCreateProductOpen(true)}>
          Add New Product
        </Button>
      </div>

      {/* <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <div
            key={product._id}
            className="rounded-lg border bg-background p-3 shadow-sm"
          >
            <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              ) : null}
            </div>
            <div className="mt-3">
              <div className="text-sm font-semibold">{product.title}</div>
              <div className="text-xs text-muted-foreground">
                {product.category}
                {product.brand ? ` • ${product.brand}` : ""}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="text-sm font-bold">${product.price}</div>
                <div className="text-xs">Stock: {product.stock}</div>
              </div>
            </div>
          </div>
        ))}
        {!isLoading && (!products || products.length === 0) ? (
          <div className="text-sm text-muted-foreground">No products yet.</div>
        ) : null}
      </div> */}

      <Sheet open={openCreateProduct} onOpenChange={setCreateProductOpen}>
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadUrl={setUploadImageUrl}
            setIsLoading={setIsLoading}
          />
          <div>
            <CommonFrom
              formData={fromData}
              setFromData={setFromData}
              fromControls={productFormControls}
              buttonText="Add Product"
              onSubmit={onSubmit}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
