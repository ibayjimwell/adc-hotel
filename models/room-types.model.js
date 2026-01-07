import { 
    varchar,
    pgTable, 
    serial,
    text,
    integer,
    numeric
} from "drizzle-orm/pg-core";

export const RoomTypes = pgTable("room_types", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),
    description: text("description"),

    basePrice: numeric("base_price", { precision: 10, scale: 2 }).notNull(),
    capacity: integer("capacity").notNull()
});