import { mysqlTable, varchar, primaryKey } from "drizzle-orm/mysql-core";
import { orders } from "./Order"; // adjust import path if needed

export const providers = mysqlTable("providers", {
  id: varchar("id", { length: 36 }).primaryKey(), // assuming UUID or short string ID
  order_id: varchar("order_id", { length: 50 })
    .unique()
    .references(() => orders.id),
});
