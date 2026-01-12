import { Router } from "express";
import {
  addServiceToStay,
  getStayServices,
} from "../controllers/stay-services.controller.js";

const stayServiceRoutes = Router();

stayServiceRoutes.post("/:stayId/services", addServiceToStay);
stayServiceRoutes.get("/:stayId/services", getStayServices);

export default stayServiceRoutes;
