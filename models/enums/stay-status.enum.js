import { pgEnum } from "drizzle-orm/pg-core";

export const StayStatusEnum = pgEnum("stay_status", [
    "active",
    "completed",
]);