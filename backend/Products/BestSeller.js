import Product from "../models/Product.js";

const BestSeller = async (req, res) => {
    // Access Public
  try {
    const bestSeller = await Product.findOne().sort({ rating: -1 });

    if (bestSeller) {
      res.json(bestSeller);
    } else {
      res.status(404).send({ msg: "No best seller found." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default BestSeller;
