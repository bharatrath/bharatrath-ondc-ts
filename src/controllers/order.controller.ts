// controllers/order.controller.ts
import { Request, Response } from "express";
import { OrderService } from "../services/order.service";

export class OrderController {
  private orderService = new OrderService();

  async createOrder(req: Request, res: Response) {
    try {
      const order = await this.orderService.createOrder(req.body.order, req.body.context);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  }

  async getOrder(req: Request, res: Response) {
    try {
      const order = await this.orderService.getOrderById(req.params.id);
      order ? res.json(order) : res.status(404).json({ error: "Order not found" });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch order" });
    }
  }
}
