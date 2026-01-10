import { Router } from "express";
import {
  createRoom,
  getRooms,
  updateRoomStatus,
} from "../controllers/rooms.controller.js";

const roomRoutes = Router();

roomRoutes.post("/", createRoom);
roomRoutes.get("/", getRooms);
roomRoutes.patch("/:id/status", updateRoomStatus);

export default roomRoutes;
