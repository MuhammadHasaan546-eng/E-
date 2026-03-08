import mongoose from "mongoose";

const featureSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Feature", featureSchema);
