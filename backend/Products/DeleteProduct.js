import Product from "../models/Product.js";

const DeleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.send({ msg: "Product removed." });
    } else {
        res.status(404).send({msg: "Product not found."})
    }
  } catch (err) {
    // console.info(err);
    res.status(500).send({message: err.message});
  }
};

export default DeleteProduct
