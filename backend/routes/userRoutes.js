import express from "express"
import Register from "../controllers/Register.js"
import Login from "../controllers/Login.js"
import Protect from "../middleware/Protect.js"
import Profile from "../controllers/Profile.js"


const router = express.Router()

// Register

router.post("/register", Register)

// Login
router.post("/login", Login)

// Profile
router.get("/profile", Protect, Profile)

export default router
