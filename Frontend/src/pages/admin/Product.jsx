import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormControls } from "@/config";
import CommonFrom from "@/components/common/From";
import { createProduct, fetchProducts } from "@/api/auth/admin/products";
import { useDispatch, useSelector } from "react-redux";
import ProductFrom from "@/components/common/ProductFrom";

const AdminProduct = () => {
  const [openCreateProduct, setCreateProductOpen] = useState(false);
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.adminProduct);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onSubmit = async (data) => {
    dispatch(createProduct(data));

    // console.log(data);
    // const fd = new FormData();
    // fd.append("title", data.title);
    // fd.append("description", data.description);
    // fd.append("category", data.category);
    // fd.append("brand", data.brand);
    // fd.append("price", data.price);
    // fd.append("stock", data.stock);
    // fd.append("subCategory", data.subCategory || "");
    // fd.append("discountPrice", data.discountPrice || "");
    // fd.append("sku", data.sku || "");
    // fd.append("isActive", data.isActive ?? true);
    // fd.append("isFeatured", data.isFeatured ?? false);
    // // Multiple images
    // if (Array.isArray(data.image)) {
    //   data.image.forEach((file) => {
    //     fd.append("image", file);
    //   });
    // }
    // console.log(fd);
    // const resultAction = await dispatch(createProduct(fd));
    // if (createProduct.fulfilled.match(resultAction)) {
    //   setFromData(initialValues);
    //   setCreateProductOpen(false);
    //   dispatch(fetchProducts());
    // } else {
    //   console.log(
    //     "createProduct rejected:",
    //     resultAction.payload ?? resultAction.error,
    //   );
    // }
    // console.log(resultAction);
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setCreateProductOpen(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
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
      </div>

      <Sheet open={openCreateProduct} onOpenChange={setCreateProductOpen}>
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>

          <div>
            {/* <CommonFrom
              formData={fromData}
              setFromData={setFromData}
              
              fromControls={productFormControls}
              buttonText="Add Product"
              onSubmit={onSubmit}
            /> */}

            <ProductFrom />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
