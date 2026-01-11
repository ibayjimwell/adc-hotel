import { Database } from "../database/drizzle.js";
import {
  Reservation,
  ReservationRoom,
  Rooms,
  Stays,
} from "../models/index.js";
import { eq, and, lt, gt } from "drizzle-orm";

// Create Reservations
export const createReservation = async (req, res) => {
  try {
    const { guestId, roomIds, checkinDate, checkoutDate } = req.body;

    // Required field handler
    if (!guestId || !roomIds?.length || !checkinDate || !checkoutDate) {
      return res.status(400).json({
        success: false,
        type: "W-Missing Required",
        message: "Guest, Rooms, Checkin Date, Checkout Date are required.",
      });
    }

    if (new Date(checkinDate) >= new Date(checkoutDate)) {
      return res.status(400).json({
        success: false,
        type: "W-Invalid Dates",
        message: "Checkout date must be after checkin date.",
      });
    }

    // Check if rooms are available
    for (const roomId of roomIds) {

      // Active stay overlap
      const activeStay = await Database
        .select({ id: Stays.id })
        .from(Stays)
        .where(
          and(
            eq(Stays.roomId, roomId),
            lt(Stays.checkinAt, checkoutDate),
            gt(Stays.checkoutAt, checkinDate)
          )
        )
        .limit(1);

      if (activeStay.length > 0) {
        return res.status(409).json({
          success: false,
          type: "W-Room Occupied",
          message: `The selected room is occupied for selected dates.`,
        });
      }

      // Reservation overlap
      const existingReservation = await Database
        .select({ id: Reservation.id })
        .from(Reservation)
        .innerJoin(
          ReservationRoom,
          eq(Reservation.id, ReservationRoom.reservationId)
        )
        .where(
          and(
            eq(ReservationRoom.roomId, roomId),
            lt(Reservation.checkinDate, checkoutDate),
            gt(Reservation.checkoutDate, checkinDate)
          )
        )
        .limit(1);

      if (existingReservation.length > 0) {
        return res.status(409).json({
          success: false,
          type: "W-Room Reserved",
          message: `The selected room is already reserved.`,
        });
      }
    }

    // Create reservation
    const [reservation] = await Database
      .insert(Reservation)
      .values({
        guestId,
        checkinDate,
        checkoutDate,
        status: "pending",
      })
      .returning();

    // Attach rooms
    for (const roomId of roomIds) {
      await Database.insert(ReservationRoom).values({
        reservationId: reservation.id,
        roomId,
      });
    }

    // Return message
    return res.status(201).json({
      success: true,
      message: "Reservation created successfully.",
      data: reservation,
    });

  } catch (error) {
      return new Error("Failed to create reservation.");
  }
};

// Reservations Listing
export const getReservations = async (req, res) => {
  try {
    const result = await Database
      .select()
      .from(Reservation);

    res.json(result);
  } catch (error) {
    console.error(error);
      return new Error("Failed to fetch reservations.");
  }
};

// Cancel Reservation
export const cancelReservation = async (req, res) => {
  try {
    const { id } = req.params;

    // Changing the record of reservation into cancelled
    const [reservation] = await Database
      .update(Reservation)
      .set({ status: "cancelled" })
      .where(eq(Reservation.id, id))
      .returning();

    // Not found handler
    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: "Reservation not found.",
      });
    }

    // Returning reservation cancelled
    res.json({
      success: true,
      message: "Reservation cancelled.",
      data: reservation,
    });
  } catch (error) {
      return new Error("Failed to cancel reservation.");
  }
};
