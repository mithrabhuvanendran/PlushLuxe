import Product from "../models/Product.js";

const SimilarProducts = async (req, res) => {
    // Access Public
  try {
    const { id } = req.params;
    // console.log(id);

    const product = await Product.findById(id);

    if (!product) {
      res.status(404).send({ msg: "Product not found." });
    }

    const similarProducts = await Product.find({
      _id: { $ne: id }, // Exclude the current ID
      gender: product.gender,
      category: product.category,
    }).limit(4);

    res.send(similarProducts);
  } catch (error) {
    // console.log(error);
    res.status(500).send({message: error.message})
  }
};

export default SimilarProducts;
