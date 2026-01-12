import { Router } from "express";
import { payInvoice } from "../controllers/payments.controller.js";

const paymentRoutes = Router();

paymentRoutes.post("/:invoiceId", payInvoice);

export default paymentRoutes;