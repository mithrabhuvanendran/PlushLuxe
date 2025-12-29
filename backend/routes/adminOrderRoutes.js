import express from "express"
import Protect from "../middleware/Protect.js"
import Admin from "../middleware/Admin.js"
import AllOrders from "../Admin/AllOrders.js"
import UpdateOrderStatus from "../Admin/UpdateOrderStatus.js"
import DeleteOrder from "../Admin/DeleteOrder.js"

const router = express.Router()

// Get all orders (Admin only)
// Access Private/Admin
router.get("/", Protect, Admin, AllOrders)

// Update order status (Admin only)
// Access Private/Admin
router.put("/:id", Protect, Admin, UpdateOrderStatus)

// Delete an order (Admin only)
// Access Private/Admin
router.delete("/:id", Protect, Admin, DeleteOrder)

export default router