import Product from "../models/Product.js";

const ProductsWithQueryFilters = async (req, res) => {
    // Access Public
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    console.log(req.query);

    let query = {};

    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }

    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }

    if (brand) {
      query.brand = { $in: brand.split(",") };
    }

    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if(color) {
        query.colors = {$in: [color]}
    }

    if(gender) {
        query.gender = gender
    }

    if(minPrice || maxPrice) {
        query.price = {}
        if(minPrice) query.price.$gte = Number(minPrice)
        
        if(maxPrice) query.price.$lte = Number(maxPrice)
    }

    if(search) {
        query.$or = [
            {name: {$regex: search, $options: "i"}},
            {description: {$regex: search, $options: "i"}},

        ]
    }

    let sort = {}
    if(sortBy) {
        switch(sortBy) {
            case "priceAsc":
                sort = {price: 1}
                break
            case "priceDesc":
                sort = {price: -1}
                break
            case "popularity":
                sort = {rating: -1}
                break
            default:
                break
        }
    }

    console.log(query);

    // Fetch products and apply sorting and limit
    let products = await Product.find(query).sort(sort).limit(Number(limit) || 0)
    res.send(products)
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error")
  }
};

export default ProductsWithQueryFilters
