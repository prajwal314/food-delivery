import express from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

// POST /api/orders - create a new order
router.post("/", createOrder);

// GET /api/orders - list all orders
router.get("/", getOrders);

export default router;


