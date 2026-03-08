import axios from "axios";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("my_file", file);
  
  const response = await axios.post(
    "http://localhost:3000/api/admin/products/upload-image",
    formData
  );

  return response.data;
};
