import express from "express"
import Protect from "../middleware/Protect.js"
import Admin from "../middleware/Admin.js"
import AllProducts from "../Admin/AllProducts.js"

const router = express.Router()

// Get all Products (Admin only)
// Access Private/Admin
router.get("/", Protect, Admin, AllProducts)

export default router