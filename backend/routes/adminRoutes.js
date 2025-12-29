import express from "express"
import Protect from "../middleware/Protect.js"
import Admin from "../middleware/Admin.js"
import AllUsers from "../Admin/AllUsers.js"
import NewUser from "../Admin/NewUser.js"
import UpdateUser from "../Admin/UpdateUser.js"
import DeleteUser from "../Admin/DeleteUser.js"

const router = express.Router()

// Get all users (Admin only)
// Access Private/Admin
router.get("/", Protect, Admin, AllUsers)

// Add a new user (Admin only)
// Access Private/Admin
router.post("/", Protect, Admin, NewUser)

// Update user info (Admin only) - Name, email, role
// Access Private/Admin
router.put("/:id", Protect, Admin, UpdateUser)

// Delete a user
// Access Private/Admin
router.delete("/:id", Protect, Admin, DeleteUser)
export default router