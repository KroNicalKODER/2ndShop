import express from "express";
import { register, login } from "../controllers/auth.js";

const router = express.Router()

//Register a user
router.post('/register',register)

//Login a user
router.post('/login', login)

//Login using google
router.post('/google',)

export default router