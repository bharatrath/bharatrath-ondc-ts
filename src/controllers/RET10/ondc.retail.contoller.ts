// controllers/order.controller.ts
import { Request, Response } from "express";
import { OndcSelectService } from "../../services/RET10/select/ondc.select";

export class OndcReatilController {
  async select(req: Request, res: Response) {
    try {
      const order = new OndcSelectService().select(req.body);
      res.status(201).json({
        context: {
          domain: "ONDC:RET10",
          action: "search",
          bap_id: "prd.mystore.in",
          bap_uri: "https://prd.mystore.in/ondc/1.0/",
          transaction_id: "05ba4dd3-89c4-423f-97d8-ae8749a7a5d8",
          message_id: "08f12caf-6c69-438c-905c-34bd7e550e65",
          timestamp: "2025-04-03T17:48:20.891Z",
          bpp_id: "ondc.bharatrath.app",
          bpp_uri: "https://ondc.bharatrath.app/bapl",
          country: "IND",
          city: "std:020",
          core_version: "1.2.0",
        },
        message: {
          ack: {
            status: "ACK",
          },
        },
      });
    } catch (error) {
      res.status(500).json({
        context: {
          domain: "ONDC:RET10",
          action: "search",
          bap_id: "prd.mystore.in",
          bap_uri: "https://prd.mystore.in/ondc/1.0/",
          transaction_id: "05ba4dd3-89c4-423f-97d8-ae8749a7a5d8",
          message_id: "08f12caf-6c69-438c-905c-34bd7e550e65",
          timestamp: "2025-04-03T17:48:20.891Z",
          bpp_id: "ondc.bharatrath.app",
          bpp_uri: "https://ondc.bharatrath.app/bapl",
          country: "IND",
          city: "std:020",
          core_version: "1.2.0",
        },
        message: {
          ack: {
            status: "NACK",
          },
        },

        error: error.message,
      });
    }
  }
}
