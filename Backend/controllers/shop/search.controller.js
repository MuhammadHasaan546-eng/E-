import Product from "../../models/Product.js";

export const searchProducts = async (req, res) => {
  try {
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({ message: "Invalid keyword" });
    }

    const regex = new RegExp(keyword, "i");
    const createSearchQuery = (keyword) => {
      return {
        $or: [
          { title: regex },
          { description: regex },
          { category: regex },
          { brand: regex },
        ],
      };
    };
    const searchResult = await Product.find(createSearchQuery(keyword));
    res.status(200).json({ message: "Search result", data: searchResult });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
