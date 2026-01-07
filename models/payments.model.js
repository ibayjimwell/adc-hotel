import { 
    pgTable,
    uuid,
    numeric,
    varchar,
    timestamp
} from "drizzle-orm/pg-core";

import { Invoices } from "./invoices.model.js";


export const Payments = pgTable("payments", {
    id: uuid("id").defaultRandom().primaryKey(),

    invoiceId: uuid("invoice_id")
        .references(() => Invoices.id)
        .notNull(),

    amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),

    method: varchar("method", { length: 50 }).notNull(),

    paidAt: timestamp("paid_at").defaultNow(),
});
