// schema/fulfillment/fulfillment.ts
import { mysqlTable, varchar, text, serial, boolean } from "drizzle-orm/mysql-core";
import { orders } from "../Order";

export const fulfillments = mysqlTable("fulfillments", {
  id: varchar("id", { length: 50 }).primaryKey(),
  order_id: varchar("order_id", { length: 50 }).references(() => orders.id),
  type: varchar("type", { length: 50 }),
  tracking: boolean("tracking"),
  state_code: varchar("state_code", { length: 50 }),
});
