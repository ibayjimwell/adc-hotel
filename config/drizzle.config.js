import { DATABASE_URL } from "./env";

export default {
    schema: "../models/index.js",
    out: "../migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: DATABASE_URL,
    }
}