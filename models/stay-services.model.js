import { 
    serial,
    uuid,
    integer,
    pgTable
 } from "drizzle-orm/pg-core";

import { Stays } from "./stays.model.js";
import { Services } from "./services.model.js";

export const StayServices = pgTable("stay_services", {
    id: serial("id").primaryKey(),

    stayId: uuid("stay_id")
        .references(() => Stays.id)
        .notNull(),

    serviceId: integer("service_id")
        .references(() => Services.id)
        .notNull(),

    quantity: integer("quantity").default(1),
});
