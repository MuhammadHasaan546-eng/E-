import React, { useEffect, useRef } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  setIsLoading,
}) => {
  const inputRef = useRef(null);

  const handleImageUpload = (evnet) => {
    console.log(evnet.target.files[0]);
    const selectImage = evnet.target.files[0];

    if (selectImage) {
      setImageFile(selectImage);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const selectImage = event.dataTransfer.files[0];
    if (selectImage) {
      setImageFile(selectImage);
    }
  };

  const uploadImageToCloudinary = async () => {
    setIsLoading(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const ressponse = await axios.post(
      "http://localhost:3000/api/admin/products/upload-image",
      data,
    );
    if (ressponse.data.success) {
      setUploadImageUrl(ressponse.data.result.url);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary(imageFile);
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto ">
      <Label className="text-lg font-semibold block mb-2">Upload Image</Label>
      <div
        className="relative border-dashed border-2  rounded-lg p-4 hover:bg-gray-50"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          id="image-upload"
          type="file"
          ref={inputRef}
          onChange={handleImageUpload}
          className="hidden"
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex  flex-col items-center justify-center h-32  cursor-pointer "
          >
            <UploadCloudIcon className="h-12 w-12 text-muted-foreground" />
            <span className="mt-2 text-sm text-muted-foreground">
              Drag and drop or click to upload
            </span>
          </Label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
              <p className="text-sm text-muted-foreground">{imageFile.name}</p>
              <Button
                variant="ghost"
                onClick={() => setImageFile(null)}
                className="ml-2 hover:text-red-500"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
