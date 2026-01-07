import { pgEnum } from "drizzle-orm/pg-core";

export const InvoiceStatusEnum = pgEnum("invoice_status", [
    "unpaid",
    "paid",
]);
