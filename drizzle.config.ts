import type { Config } from "drizzle-kit";

export default {
    schema: "./lib/schema.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL || "postgresql://sandbox:sandbox@localhost/sandbox",
    },
} satisfies Config;
