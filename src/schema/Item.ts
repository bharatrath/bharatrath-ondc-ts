import { boolean, datetime, decimal, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm/sql";
import { orders } from "./Order";
export const items = mysqlTable("items", {
  id: varchar("id", { length: 50 }).primaryKey(),
  order_id: varchar("order_id", { length: 50 }).references(() => orders.id),
  fulfillment_id: varchar("fulfillment_id", { length: 50 }),
  quantity: int("quantity"),
});
