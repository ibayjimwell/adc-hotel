import { 
    pgTable,
    uuid,
    integer,
    timestamp
 } from "drizzle-orm/pg-core";

import { Guests } from "./guests.model.js";
import { Rooms } from "./rooms.model.js";
import { StayStatusEnum } from "./enums/stay-status.enum.js";

export const Stays = pgTable("stays", {
    id: uuid("id").defaultRandom().primaryKey(),

    guestId: uuid("guest_id")
        .references(() => Guests.id)
        .notNull(),

    roomId: integer("room_id")
        .references(() => Rooms.id)
        .notNull(),

    checkinAt: timestamp("checkin_at").notNull(),
    checkoutAt: timestamp("checkout_at"),

    status: StayStatusEnum("status").default("active"),
});
