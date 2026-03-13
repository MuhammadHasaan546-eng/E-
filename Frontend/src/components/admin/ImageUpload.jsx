import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import { uploadImage } from "../../api/common/upload";
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
    try {
      const response = await uploadImage(imageFile);
      if (response?.success) {
        setUploadUrl(response.result.url);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    } finally {
      setImageUploadLoading(false);
    }
  };
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <Label className="text-sm font-bold block text-gray-800 mb-3 tracking-wide uppercase">
        Product Image
      </Label>
      <div
        className={`${
          idEditMode
            ? "opacity-50 cursor-not-allowed grayscale"
            : "cursor-pointer hover:border-primary/60 hover:bg-primary/5 hover:shadow-lg"
        } relative border-2 border-dashed border-gray-300 rounded-2xl p-8 transition-all duration-500 bg-white/50 backdrop-blur-sm group overflow-hidden`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
            } flex flex-col items-center justify-center h-40 w-full relative z-10`}
          >
            <div className="bg-white p-4 rounded-full mb-4 shadow-sm border border-gray-100 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:shadow-md">
              <UploadCloudIcon className="h-8 w-8 text-primary group-hover:text-white transition-colors duration-500" />
            </div>
            <p className="text-base font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors duration-300">
              Drag & Drop your image here
            </p>
            <p className="text-sm font-medium text-gray-500">
              or click to browse from your computer
            </p>
            <div className="mt-4 px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-500">
              Supports: JPG, PNG, WEBP (Max 5MB)
            </div>
          </Label>
        ) : (
          <div className="relative z-10 flex flex-col items-center bg-white border border-gray-100 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group/item">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4 bg-gray-50 border border-gray-100 flex items-center justify-center">
              {imageFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <FileIcon className="w-12 h-12 text-primary opacity-50" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={(e) => {
                    e.preventDefault();
                    setImageFile(null);
                    setUploadUrl("");
                    setImageUploadLoading?.(false);
                  }}
                  className="w-10 h-10 rounded-full shadow-xl transform scale-75 group-hover/item:scale-100 transition-all duration-300"
                >
                  <XIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="w-full text-center">
              <p className="text-sm font-bold text-gray-800 truncate px-2">
                {imageFile.name}
              </p>
              <p className="text-xs text-gray-500 font-medium mt-1">
                {(imageFile.size / 1024 / 1024).toFixed(2)} MB •{" "}
                {imageFile.type.split("/")[1]?.toUpperCase()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ProductImageUpload);
