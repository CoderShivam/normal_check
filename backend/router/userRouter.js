import express from "express";
import { register,login, getUser} from "../controller/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/get",isAuthenticated, getUser)

export default router