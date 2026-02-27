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
import CommonFrom from "@/components/common/From";
import ProductImageUpload from "@/components/admin/ImageUpload";
import { useDispatch } from "react-redux";
import {
  createProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "@/api/admin/products";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import AdminProductTile from "@/components/admin/project-tile";
const installFromData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  stock: "",
};

const AdminProduct = () => {
  const [fromData, setFromData] = useState(installFromData);

  const [imageFile, setImageFile] = useState(null);
  const [uploadImageUrl, setUploadImageUrl] = useState("");
  const [ImageUploadLoading, setImageUploadLoading] = useState(false);
  const [openCreateProduct, setCreateProductOpen] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  const { productLists } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    // TODO: Add validation logic here
    if (!isFromVaid()) {
      toast.error("Please fill all the fields");
      return;
    }
    // edit and create

    currentEditId !== null
      ? dispatch(editProduct({ id: currentEditId, formData: fromData })).then(
          (data) => {
            if (data.payload.success) {
              setCreateProductOpen(false);
              dispatch(fetchProducts());
              setFromData(installFromData);
              setImageFile(null);
              setUploadImageUrl("");
              toast.success("Product added successfully");
            }
          },
        )
      : dispatch(
          createProduct({
            ...fromData,
            image: uploadImageUrl,
          }),
        ).then((data) => {
          if (data.payload.success) {
            setCreateProductOpen(false);
            dispatch(fetchProducts());
            setFromData(installFromData);
            setImageFile(null);
            setUploadImageUrl("");
            toast.success("Product added successfully");
          }
        });
  };

  // DeleteProduct
  const handleDeleteProduct = (getCurrentProductId) => {
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data.payload.success) {
        dispatch(fetchProducts());
        toast.success("Product deleted successfully");
      }
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // TODO: Add validation logic here
  const isFromVaid = () => {
    return Object.keys(fromData)
      .map((key) => fromData[key] !== "")
      .every((item) => item);
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setCreateProductOpen(true)}>
          Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productLists && productLists.length > 0
          ? productLists.map((productItem) => (
              <AdminProductTile
                key={productItem._id}
                product={productItem}
                setCurrentEditId={setCurrentEditId}
                setOpenCurentProductDialog={setCreateProductOpen}
                setFromData={setFromData}
                handleDelete={handleDeleteProduct}
              />
            ))
          : "No products found"}
      </div>

      <Sheet
        open={openCreateProduct}
        onOpenChange={() => {
          setCreateProductOpen(false);
          setCurrentEditId(null);
          setFromData(installFromData);
        }}
      >
        <SheetContent side="right" className="overflow-auto p-6">
          <SheetHeader>
            <SheetTitle>
              {currentEditId ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>

          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadImageUrl={uploadImageUrl}
            setUploadUrl={setUploadImageUrl}
            setImageUploadLoading={setImageUploadLoading}
            ImageUploadLoading={ImageUploadLoading}
            idEditMode={currentEditId !== null}
          />
          <div>
            <CommonFrom
              formData={fromData}
              setFromData={setFromData}
              fromControls={productFormControls}
              buttonText={currentEditId ? "Update Product" : "Add Product"}
              onSubmit={onSubmit}
              isButtonDisabled={!isFromVaid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProduct;
