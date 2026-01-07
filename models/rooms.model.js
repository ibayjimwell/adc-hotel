import { 
    varchar,
    pgTable, 
    serial,
    integer
} from "drizzle-orm/pg-core";

import { RoomTypes } from "./room-types.model.js";
import { RoomStatusEnum } from "./enums/room-status.enum.js";

export const Rooms = pgTable("rooms", {
    id: serial("id").primaryKey(),
    roomNumber: varchar("room_number", { length: 10 }).notNull(),

    roomTypeId: integer("room_type_id")
        .references(() => RoomTypes.id)
        .notNull(),

    status: RoomStatusEnum("status")
        .default("available")
        .notNull()
}); 