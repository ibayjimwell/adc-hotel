import { pgEnum } from "drizzle-orm/pg-core";

export const RoomStatusEnum = pgEnum("room_status", [
    "available",
    "reserved",
    "occupied",
    "cleaning",
    "maintenance",
]);