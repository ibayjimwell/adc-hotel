import { 
    varchar,
    uuid,
    pgTable, 
    timestamp
} from "drizzle-orm/pg-core";

export const Guests = pgTable("guests", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),

    phone: varchar("phone", { length: 20 }).notNull(),
    email: varchar("email", { length: 150 }).notNull(),
    
    idType: varchar("id_type", { length: 50 }),
    idNumber: varchar("id_number", { length: 100 }),

    createdAt: timestamp("created_at").defaultNow()
});