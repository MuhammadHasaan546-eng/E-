import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("my_file", file);

  const response = await axios.post(
    `${BASE_URL}/api/admin/products/upload-image`,
    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};
