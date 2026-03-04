import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
  try {
    const formData = req.body.formData || req.body;
    const { userId, address, city, state, zip, country, phone, note } =
      formData;

    if (!userId || !address || !city || !state || !zip || !country || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const newAddress = new Address({
      userId,
      address,
      city,
      state,
      zip,
      country,
      phone,
      note,
    });

    await newAddress.save();

    return res.status(201).json({ success: true, data: newAddress });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const fetchAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const addressList = await Address.find({ userId });
    return res.status(200).json({ success: true, data: addressList });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const formData = req.body.formData || req.body;

    const updatedAddress = await Address.findByIdAndUpdate(
      addressId,
      formData,
      { new: true },
    );

    if (!updatedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Address ID are required",
      });
    }

    const deletedAddress = await Address.findByIdAndDelete(addressId);

    if (!deletedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }

    return res.status(200).json({ success: true, data: deletedAddress });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
