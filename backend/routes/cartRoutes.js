import express from "express"
import AddProduct from "../Cart/AddProduct.js"
import UpdateProductQuantity from "../Cart/UpdateProductQuantity.js"
import DeleteProduct from "../Cart/DeleteProduct.js"
import GetCart from "../Cart/GetCart.js"
import Protect from "../middleware/Protect.js"
import MergeCart from "../Cart/MergeCart.js"

const router = express.Router()

// Add a product to the cart for a guest or logged in user
router.post("/", AddProduct)

// Update quantity in the cart for guest or logged in user
router.put("/", UpdateProductQuantity)

// Remove a product from the cart
router.delete("/", DeleteProduct)

// Get logged-in user's or guest user's cart
router.get("/", GetCart)

// Merge guest cart into user cart on login
router.post("/merge", Protect, MergeCart)

export default router