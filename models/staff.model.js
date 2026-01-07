import { 
    pgTable,
    uuid,
    varchar,
    text,
    timestamp
 } from "drizzle-orm/pg-core";

export const Staff = pgTable("staff", {
    id: uuid("id").defaultRandom().primaryKey(),

    name: varchar("name", { length: 100 }).notNull(),
    role: varchar("role", { length: 50 }).notNull(),

    email: varchar("email", { length: 150 }).unique(),
    passwordHash: text("password_hash"),

    createdAt: timestamp("created_at").defaultNow(),
});
