import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { productFormControls } from "@/config";
import CommonFrom from "@/components/common/From";
import ProductImageUplode from "@/components/admin/ImageUplode";

const initialValues = {
  image: "null",
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  stock: "",
};

const AdminProduct = () => {
  const [openCreateProduct, setCreateProductOpen] = useState(false);
  const [fromData, setFromData] = useState(initialValues);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setCreateProductOpen(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>

      <Sheet open={openCreateProduct} onOpenChange={setCreateProductOpen}>
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          {/* <ProductImageUplode /> */}
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
