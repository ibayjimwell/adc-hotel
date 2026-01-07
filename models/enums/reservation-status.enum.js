import { pgEnum } from "drizzle-orm/pg-core";

export const ReservationStatusEnum = pgEnum("reservation_status", [
    "pending",
    "confirmed",
    "cancelled",
    "expired",
]);