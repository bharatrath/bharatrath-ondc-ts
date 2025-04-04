// routes/order.routes.ts
import express from "express";
import { OndcReatilController } from "../controllers/RET10/ondc.retail.contoller";

const router = express.Router();
router.post("/select", new OndcReatilController().select);

export default router;
