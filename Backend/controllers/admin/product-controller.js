import { imageUpload } from "../../config/cloudinary.js";

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.Buffer).toString("base64");
    const ulr = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUpload(ulr);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while uploading image",
    });
  }
};

export default handleImageUpload;
