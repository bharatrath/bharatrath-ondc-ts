// schema/context.ts
import { mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

export const contexts = mysqlTable("contexts", {
  transaction_id: varchar("transaction_id", { length: 36 }).primaryKey(),
  domain: varchar("domain", { length: 50 }),
  action: varchar("action", { length: 50 }),
  country: varchar("country", { length: 3 }),
  city: varchar("city", { length: 50 }),
  core_version: varchar("core_version", { length: 10 }),
  bap_id: varchar("bap_id", { length: 100 }),
  bap_uri: varchar("bap_uri", { length: 255 }),
  message_id: varchar("message_id", { length: 36 }),
  timestamp: datetime("timestamp"),
  bpp_id: varchar("bpp_id", { length: 100 }),
  bpp_uri: varchar("bpp_uri", { length: 255 }),
});
