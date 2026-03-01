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
    <div className="w-full max-w-md mx-auto ">
      <Label className="text-lg font-semibold block mb-2">Upload Image</Label>
      <div
        className={` ${idEditMode ? "opacity-50 cursor-not-allowed" : ""}relative border-dashed border-2  rounded-lg p-4 hover:bg-gray-50 `}
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
            className={`flex flex-col items-center justify-center h-32 cursor-pointer ${idEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <UploadCloudIcon className="h-12 w-12 text-muted-foreground" />
            <span className="mt-1 text-sm text-muted-foreground">
              Drag and drop or click to upload
            </span>
          </Label>
        ) : (
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center space-x-2">
              {imageFile.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(imageFile)}
                  alt="Preview"
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <FileIcon className="w-8 h-8 text-primary" />
              )}
              <p className="text-sm text-muted-foreground truncate max-w-[150px]">
                {imageFile.name}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setImageFile(null);
                setUploadUrl("");
                setImageUploadLoading?.(false);
              }}
              className="hover:text-red-500"
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
