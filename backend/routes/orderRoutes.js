import express from "express"
import Protect from "../middleware/Protect.js"
import MyOrders from "../Orders/MyOrders.js"
import OrderDetailsById from "../Orders/OrderDetailsById.js"

const router = express.Router()

// Get logged-in user's orders
// Access Private
router.get("/my-orders", Protect, MyOrders)

// Get order details by ID
// Access Private
router.get("/:id", Protect, OrderDetailsById)

export default router