import { DATABASE_URL } from "../config/env.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../models/index.js";

const pool = new Pool({
    connectionString: DATABASE_URL
});

export const Database = drizzle(pool, {schema});

export { pool };