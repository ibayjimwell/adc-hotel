import { Router } from "express";
import {
  generateInvoice,
  getInvoiceByStay,
} from "../controllers/invoices.controller.js";

const invoiceRoutes = Router();

invoiceRoutes.post("/generate/:stayId", generateInvoice);
invoiceRoutes.get("/stay/:stayId", getInvoiceByStay);

export default invoiceRoutes;
