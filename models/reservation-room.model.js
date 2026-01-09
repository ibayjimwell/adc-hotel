import { 
    pgTable,
    serial,
    uuid,
    integer
 } from "drizzle-orm/pg-core";

import { Reservation } from "./reservation.model.js";
import { Rooms } from "./rooms.model.js";

export const ReservationRoom = pgTable("reservation_rooms", {
    id: serial("id").primaryKey(),

    reservationId: uuid("reservation_id")
        .references(() => Reservation.id)
        .notNull(),

    roomId: integer("room_id")
        .references(() => Rooms.id)
        .notNull(),
});
