import { 
    pgTable,
    serial,
    varchar,
    numeric
 } from "drizzle-orm/pg-core";

export const Services = pgTable("services", {
    id: serial("id").primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
});
