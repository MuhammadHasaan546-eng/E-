import { XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DragDropUploader = ({ multiple = true, onFilesChange }) => {
  const inputRef = useRef(null);
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const handleFiles = (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);

    const newFiles = multiple ? files.concat(fileArray) : fileArray;

    const previewUrls = newFiles.map(function (file) {
      return URL.createObjectURL(file);
    });

    setFiles(newFiles);
    setPreview(previewUrls);

    if (onFilesChange) {
      if (multiple) {
        onFilesChange(newFiles);
      } else {
        onFilesChange(newFiles[0]);
      }
    }
  };

  const removeImage = (index) => {
    const updatedFiles = files.filter(function (_, i) {
      return i !== index;
    });

    const previewUrls = updatedFiles.map(function (file) {
      return URL.createObjectURL(file);
    });

    setFiles(updatedFiles);
    setPreview(previewUrls);

    if (onFilesChange) {
      if (multiple) {
        onFilesChange(updatedFiles);
      } else {
        onFilesChange(updatedFiles.length > 0 ? updatedFiles[0] : null);
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-2 border-dashed border-gray-400 p-6 rounded-xl text-center cursor-pointer hover:bg-gray-50 transition"
      >
        <p className="text-gray-600">
          Drag & Drop Image Here or Click to Upload
        </p>
      </div>

      <input
        type="file"
        hidden
        ref={inputRef}
        multiple={multiple}
        accept="image/*"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {preview.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4">
          {preview.map(function (src, index) {
            return (
              <div key={index} className="relative">
                <img
                  src={src}
                  alt="preview"
                  className="h-24 w-full object-cover rounded-lg"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DragDropUploader;
