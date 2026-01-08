import { 
    pgTable,
    serial,
    uuid,
    integer
 } from "drizzle-orm/pg-core";

import { Reservations } from "./reservation.model";
import { Rooms } from "./rooms.model";

export const ReservationRoom = pgTable("reservation_rooms", {
    id: serial("id").primaryKey(),

    reservationId: uuid("reservation_id")
        .references(() => Reservations.id)
        .notNull(),

    roomId: integer("room_id")
        .references(() => Rooms.id)
        .notNull(),
});
