import Product from "../models/Product.js";

const AllProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    res.send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export default AllProducts;
