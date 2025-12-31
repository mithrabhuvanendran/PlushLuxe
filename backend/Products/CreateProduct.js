import Product from "../models/Product.js";

// Create a new product
// Access Private/Admin
const CreateProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    discountPrice,
    countInStock,
    category,
    brand,
    sizes,
    colors,
    collections,
    material,
    gender,
    images,
    isFeatured,
    isPublished,
    tags,
    dimensions,
    weight,
    sku,
  } = req.body;

  try {
    const createdProduct = await Product.create({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      category,
      brand,
      sizes,
      colors,
      collections,
      material,
      gender,
      images,
      isFeatured,
      isPublished,
      tags,
      dimensions,
      weight,
      sku,
      user: req.user._id // Reference to the admin user who created it
    });

    res.status(201).send(createdProduct)
  } catch (err) {
    // console.info(err);
    res.status(500).send({message: err.message});
  }
};

export default CreateProduct;
