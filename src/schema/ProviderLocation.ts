import { mysqlTable, varchar, primaryKey, int, text, decimal } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const providerLocation = mysqlTable("provider_location", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .default(sql`UUID()`),
  providerId: varchar("provider_id", { length: 255 }).notNull(),
});
