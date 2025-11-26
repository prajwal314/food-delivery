import express from "express";
import { getFoods, addFood } from "../controllers/foodController.js";

const router = express.Router();

// GET /api/foods - list all foods
router.get("/", getFoods);

// POST /api/foods - add a new food (admin UI only, no auth)
router.post("/", addFood);

export default router;


