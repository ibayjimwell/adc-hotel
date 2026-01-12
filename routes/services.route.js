import { Router } from "express";
import {
  createService,
  getServices,
  updateService,
} from "../controllers/services.controller.js";

const serviceRoutes = Router();

serviceRoutes.post("/", createService);
serviceRoutes.get("/", getServices);
serviceRoutes.put("/:id", updateService);

export default serviceRoutes;
