import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadUrl,
  setImageUploadLoading,
  idEditMode,
}) => {
  const inputRef = useRef(null);

  const handleImageUpload = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      setImageFile(selectedImage);
      setImageUploadLoading?.(true);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectedImage = event.dataTransfer.files[0];
    if (selectedImage) {
      setImageFile(selectedImage);
      setImageUploadLoading?.(true);
    }
  };

  const uploadImageToCloudinary = async () => {
    setImageUploadLoading(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const ressponse = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data,
    );
    if (ressponse.data.success) {
      setUploadUrl(ressponse.data.result.url);
      console.log(ressponse.data.result.url);
    }
    setImageUploadLoading(false);
  };
  useEffect(() => {
    if (imageFile !== null) {
      console.log("uploading image");
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-sm font-semibold mb-2 block text-gray-700">
        Upload Image
      </Label>
      <div
        className={`${
          idEditMode
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:border-primary hover:bg-primary/5 hover:shadow-sm"
        } relative border-2 border-dashed border-gray-300 rounded-xl p-6 transition-all duration-300 bg-gray-50/50 group`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageUpload}
          className="hidden"
          disabled={idEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              idEditMode ? "cursor-not-allowed" : "cursor-pointer"
            } flex flex-col items-center justify-center h-32 w-full`}
          >
            <div className="bg-white p-3 rounded-full mb-3 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-300">
              <UploadCloudIcon className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-medium text-gray-700 mb-1">
              Drag and drop or click to upload
            </p>
            <p className="text-xs text-gray-500">
              PNG, JPG, JPEG up to 5MB
            </p>
          </Label>
        ) : (
          <div className="flex items-center justify-between bg-white border border-gray-200 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center space-x-4">
              {imageFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-14 h-14 object-cover rounded-lg border border-gray-100"
                />
              ) : (
                <div className="w-14 h-14 flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
                  <FileIcon className="w-7 h-7 text-primary" />
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
                  {imageFile.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.preventDefault();
                setImageFile(null);
                setUploadUrl("");
                setImageUploadLoading?.(false);
              }}
              className="text-gray-400 hover:text-red-500 hover:bg-red-50 h-9 w-9 rounded-full transition-colors"
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
