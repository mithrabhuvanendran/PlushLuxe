import express from "express"
import Protect from "../middleware/Protect.js"
import Admin from "../middleware/Admin.js"
import CreateProduct from "../Products/CreateProduct.js"
import UpdateProduct from "../Products/UpdateProduct.js"
import DeleteProduct from "../Products/DeleteProduct.js"
import ProductsWithQueryFilters from "../Products/ProductsWithQueryFilters.js"
import SingleProduct from "../Products/SingleProduct.js"
import SimilarProducts from "../Products/SimilarProducts.js"
import BestSeller from "../Products/BestSeller.js"
import NewArrivals from "../Products/NewArrivals.js"

const router = express.Router()

// Create Product
router.post("/", Protect, Admin, CreateProduct)

// Update an existing product
router.put("/:id", Protect, Admin, UpdateProduct)

// Delete product
router.delete("/:id", Protect, Admin, DeleteProduct)

// Get all products with optional query filters
router.get("/", ProductsWithQueryFilters)

// Retrieve the product with highest rating
router.get("/best-seller", BestSeller)

// Retrieve lastest 8 products - creation date
router.get("/new-arrivals", NewArrivals)

// Get a single product by ID
router.get("/:id", SingleProduct)

// Retrieve similar products based on the current product's gender and category
router.get("/similar/:id", SimilarProducts)

export default router