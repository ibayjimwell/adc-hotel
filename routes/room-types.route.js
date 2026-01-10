import { Router } from "express";
import {
  createRoomType,
  getRoomTypes,
  updateRoomType,
} from "../controllers/room-types.controller.js";

const roomTypeRoutes = Router();

roomTypeRoutes.post("/", createRoomType);
roomTypeRoutes.get("/", getRoomTypes);
roomTypeRoutes.put("/:id", updateRoomType);

export default roomTypeRoutes;
