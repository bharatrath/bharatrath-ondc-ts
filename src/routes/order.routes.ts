// routes/order.routes.ts
import express from "express";
import { OrderController } from "../controllers/order.controller";

const router = express.Router();
const orderController = new OrderController();

router.post("/orders", orderController.createOrder);
router.get("/orders/:id", orderController.getOrder);

export default router;
