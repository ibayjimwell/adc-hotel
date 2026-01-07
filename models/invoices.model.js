import { 
    pgTable, 
    uuid,
    numeric,
    timestamp
} from "drizzle-orm/pg-core";

import { Stays } from "./stays.model.js";
import { InvoiceStatusEnum } from "./enums/invoice-status.enum.js";

export const Invoices = pgTable("invoices", {
  id: uuid("id").defaultRandom().primaryKey(),

  stayId: uuid("stay_id")
    .references(() => Stays.id)
    .notNull(),

  totalAmount: numeric("total_amount", {
    precision: 12,
    scale: 2,
  }).notNull(),

  status: InvoiceStatusEnum("status").default("unpaid"),

  createdAt: timestamp("created_at").defaultNow(),
});
