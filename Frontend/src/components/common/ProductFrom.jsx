import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import { createProduct } from "@/api/auth/admin/products";
import { useDispatch } from "react-redux";

const ProductForm = () => {
  const dispatch = useDispatch();
  const formRef = useRef({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    discountPrice: "",
    stock: "",
    sku: "",
    isActive: true,
    isFeatured: false,
    images: [], // array of File objects
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fromData = formRef.current;
    dispatch(createProduct(fromData));

    // 🔹 FormData for backend
    // const fd = new FormData();
    // Object.entries(formRef.current).forEach(([key, value]) => {
    //   if (key === "images") {
    //     value.forEach((file) => fd.append("images", file));
    //   } else {
    //     fd.append(key, value);
    //   }
    // });

    // 🔹 Dispatch or axios post
    // onDispatch?.(fd);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      encType="multipart/form-data"
    >
      {/* Images */}
      <div>
        <label>Product Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files);
            formRef.current.images = files;
            setPreviewImages(files);
          }}
          className="mt-1 w-full border p-2 rounded"
        />
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previewImages.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt="preview"
                className="h-24 w-full object-cover rounded border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Text Inputs */}
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => (formRef.current.title = e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        placeholder="Description"
        rows={3}
        onChange={(e) => (formRef.current.description = e.target.value)}
        className="w-full border p-2 rounded"
        required
      />

      {/* Category / SubCategory / Brand */}
      <div className="grid grid-cols-3 gap-2">
        <select
          onChange={(e) => (formRef.current.category = e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
        </select>

        <input
          type="text"
          placeholder="Sub Category"
          onChange={(e) => (formRef.current.subCategory = e.target.value)}
          className="border p-2 rounded"
        />

        <select
          onChange={(e) => (formRef.current.brand = e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Select Brand</option>
          <option value="apple">Apple</option>
          <option value="samsung">Samsung</option>
          <option value="nike">Nike</option>
        </select>
      </div>

      {/* Price / Discount / Stock */}
      <div className="grid grid-cols-3 gap-2">
        <input
          type="number"
          placeholder="Price"
          onChange={(e) => (formRef.current.price = e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Discount Price"
          onChange={(e) => (formRef.current.discountPrice = e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Stock"
          onChange={(e) => (formRef.current.stock = e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* SKU */}
      <input
        type="text"
        placeholder="SKU"
        onChange={(e) => (formRef.current.sku = e.target.value)}
        className="w-full border p-2 rounded"
      />

      {/* Status & Featured */}
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={formRef.current.isActive}
            onChange={(e) => (formRef.current.isActive = e.target.checked)}
          />
          Active
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            defaultChecked={formRef.current.isFeatured}
            onChange={(e) => (formRef.current.isFeatured = e.target.checked)}
          />
          Featured
        </label>
      </div>

      <Button type="submit" className="w-full mt-2">
        Submit
      </Button>
    </form>
  );
};

export default ProductForm;
