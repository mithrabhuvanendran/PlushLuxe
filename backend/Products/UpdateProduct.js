import Product from "../models/Product.js"

const UpdateProduct = async (req, res) => {
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

    // Update an existing product by id
    // Access Private/Admin
    const product = await Product.findById(req.params.id)

    if(product) {
        product.name = name || product.name
        product.description = description || product.description
        product.price = price || product.price
        product.discountPrice = discountPrice || product.discountPrice
        product.countInStock = countInStock || product.countInStock
        product.category = category || product.category
        product.brand = brand || product.brand
        product.sizes = sizes || product.sizes
        product.colors = colors || product.colors
        product.collections = collections || product.collections
        product.material = material || product.material
        product.gender = gender || product.gender
        product.images = images || product.images
        product.isFeatured = isFeatured !== undefined ? isFeatured : product.isFeatured
        product.isPublished = isPublished !== undefined ? isPublished : product.isPublished
        product.tags = tags || product.tags
        product.dimensions = dimensions || product.dimensions
        product.weight = weight || product.weight
        product.sku = sku || product.sku

        const updatedProduct = await product.save()
        res.send(updatedProduct)
    } else {
        res.status(404).send({msg: "Product not found."})
    }

  } catch (err) {
    console.info(err);
    res.status(500).send({ msg: "Internal server error" });
  }
}

export default UpdateProduct