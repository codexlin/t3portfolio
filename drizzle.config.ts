import { env } from "@/env"
import { type Config } from "drizzle-kit"

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["t3-portfolio_*"],
} satisfies Config
