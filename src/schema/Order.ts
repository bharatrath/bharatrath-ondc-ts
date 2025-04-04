import { datetime, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { contexts } from "./contexts";

// schema/order.ts
export const orders = mysqlTable("orders", {
  id: varchar("id", { length: 50 }).primaryKey(),
  state: varchar("state", { length: 50 }),
  created_at: datetime("created_at"),
  updated_at: datetime("updated_at"),
  // Should match the foreign key relationship name
  transaction_id: varchar("transaction_id", { length: 36 }).references(() => contexts.transaction_id),
});
