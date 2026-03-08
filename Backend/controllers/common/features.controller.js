import Feature from "../../models/Features.js";

export const addFeatureImage = async (req, res) => {
  try {
    const { image, title, subtitle } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({
        success: false,
        message: "Banner title and subtitle are required",
      });
    }

    const featureImages = new Feature({
      image,
      title,
      subtitle,
    });

    await featureImages.save();

    res.status(201).json({
      success: true,
      data: featureImages,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const getFeatureImages = async (req, res) => {
  try {
    const images = await Feature.find({});

    res.status(200).json({
      success: true,
      data: images,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const deleteFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const featureImage = await Feature.findByIdAndDelete(id);

    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Feature image deleted successfully",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};

export const updateFeatureImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, image } = req.body;

    if (!title || !subtitle) {
      return res.status(400).json({
        success: false,
        message: "Banner title and subtitle are required",
      });
    }

    const featureImage = await Feature.findByIdAndUpdate(
      id,
      { title, subtitle, image },
      { new: true }
    );

    if (!featureImage) {
      return res.status(404).json({
        success: false,
        message: "Feature image not found",
      });
    }

    res.status(200).json({
      success: true,
      data: featureImage,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  }
};
