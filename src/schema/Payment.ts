// schema/payment.ts
import { mysqlTable, varchar, decimal, text, serial, int, datetime } from "drizzle-orm/mysql-core";
import { orders } from "./Order";

export const payments = mysqlTable("payments", {
  id: varchar("id", { length: 100 }).primaryKey(),
  order_id: varchar("order_id", { length: 50 }).references(() => orders.id),
  uri: text("uri"),
  status: varchar("status", { length: 50 }),
  type: varchar("type", { length: 50 }),
  collected_by: varchar("collected_by", { length: 50 }),
  tl_method: varchar("tl_method", { length: 50 }),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  currency: varchar("currency", { length: 3 }),
  transaction_id: varchar("transaction_id", { length: 50 }),
});
