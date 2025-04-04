// schema/billing.ts
import { mysqlTable, varchar, datetime, text, serial, int, bigint } from "drizzle-orm/mysql-core";
import { orders } from "./Order";

export const billings = mysqlTable("billings", {
  id: varchar("id", { length: 100 }).primaryKey(),

  order_id: varchar("order_id", { length: 100 }).references(() => orders.id),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 100 }),
  created_at: datetime("created_at"),
  updated_at: datetime("updated_at"),
});

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(), // BIGINT UNSIGNED AUTO_INCREMENT
  billing_id: varchar("billing_id", { length: 100 }).references(() => billings.id), // ✅ FIXED
  name: varchar("name", { length: 100 }),
  building: text("building"),
  locality: text("locality"),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  country: varchar("country", { length: 100 }),
  area_code: varchar("area_code", { length: 100 }),
});
