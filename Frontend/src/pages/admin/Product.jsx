import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Plus, PackageOpen } from "lucide-react";
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
    <div className="w-full h-full p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Product Management
          </h1>
          <p className="text-sm text-gray-500 mt-1 font-medium">
            Manage your inventory, prices, and product details.
          </p>
        </div>
        <Button
          onClick={() => setCreateProductOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl px-6 py-5 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {productLists && productLists.length > 0 ? (
          productLists.map((productItem) => (
            <div
              key={productItem._id}
              className="animate-in fade-in zoom-in-95 duration-500"
              style={{ animationFillMode: "both" }}
            >
              <AdminProductTile
                product={productItem}
                setCurrentEditId={setCurrentEditId}
                setOpenCurentProductDialog={setCreateProductOpen}
                setFromData={setFromData}
                handleDelete={handleDeleteProduct}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 border-dashed">
            <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-6 shadow-inner">
              <PackageOpen className="w-12 h-12 text-primary/40" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 mb-6 max-w-sm text-center">
              Your inventory is currently empty. Start by adding your first
              product to see it listed here.
            </p>
            <Button
              onClick={() => setCreateProductOpen(true)}
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/5 rounded-full px-8"
            >
              Add First Product
            </Button>
          </div>
        )}
      </div>

      <Sheet
        open={openCreateProduct}
        onOpenChange={(open) => {
          if (!open) {
            setCreateProductOpen(false);
            setCurrentEditId(null);
            setFromData(installFromData);
            setImageFile(null);
            setUploadImageUrl("");
          }
        }}
      >
        <SheetContent
          side="right"
          className="overflow-auto p-0 sm:max-w-xl w-full border-l-0 shadow-2xl"
        >
          <div className="p-6 border-b border-gray-100 bg-white/50 backdrop-blur-xl sticky top-0 z-10">
            <SheetHeader>
              <SheetTitle className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                {currentEditId ? "Edit Product" : "Add New Product"}
              </SheetTitle>
            </SheetHeader>
          </div>

          <div className="p-6 space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <ProductImageUpload
              imageFile={imageFile}
              setImageFile={setImageFile}
              uploadImageUrl={uploadImageUrl}
              setUploadUrl={setUploadImageUrl}
              setImageUploadLoading={setImageUploadLoading}
              ImageUploadLoading={ImageUploadLoading}
              idEditMode={currentEditId !== null}
            />
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <CommonFrom
                formData={fromData}
                setFromData={setFromData}
                fromControls={productFormControls}
                buttonText={currentEditId ? "Update Product" : "Save Product"}
                onSubmit={onSubmit}
                isButtonDisabled={!isFromVaid()}
              />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminProduct;
