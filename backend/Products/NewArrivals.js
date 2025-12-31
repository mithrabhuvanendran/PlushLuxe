import Product from "../models/Product.js";

const NewArrivals = async (req, res) => {
  // Access Public
  try {
    const newArrivals = await Product.find().sort({ createdAt: -1 }).limit(8);

    res.json(newArrivals);
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message});
  }
};

export default NewArrivals;
