import { 
    pgTable,
    uuid,
    timestamp
} from "drizzle-orm/pg-core";

import { Guests } from "./guests.model.js";
import { ReservationStatusEnum } from "./enums/reservation-status.enum.js";

export const Reservation = pgTable("reservations", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    guestId: uuid("guest_id")
        .references(() => Guests.id)
        .notNull(),

    checkinDate: timestamp("checkin_date").notNull(),
    checkoutDate: timestamp("checkout_date").notNull(),

    status: ReservationStatusEnum("status").default("pending"),

    createdAt: timestamp("created_at").defaultNow(),
});
