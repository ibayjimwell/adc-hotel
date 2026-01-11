import { Router } from "express";
import {
  createReservation,
  getReservations,
  cancelReservation,
} from "../controllers/reservations.controller.js";

const reservationRoutes = Router();

reservationRoutes.post("/", createReservation);
reservationRoutes.get("/", getReservations);
reservationRoutes.patch("/:id/cancel", cancelReservation);

export default reservationRoutes;
