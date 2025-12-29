import express from "express"
import Protect from "../middleware/Protect.js"
import CreateNewCheckout from "../Checkout/CreateNewCheckout.js"
import UpdateCheckout from "../Checkout/UpdateCheckout.js"
import FinalizeCheckout from "../Checkout/FinalizeCheckout.js"

const router = express.Router()

// Create a new checkout session
// Access Private
router.post("/", Protect, CreateNewCheckout)

// Update checkout to mark as paid after successful payment
// Access Private
router.put("/:id/pay", Protect, UpdateCheckout)

// Finalize checkout and convert to an order after payment confirmation
// Access Private
router.post("/:id/finalize", Protect, FinalizeCheckout)

export default router