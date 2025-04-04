// schema/billing.ts
import { mysqlTable, varchar, datetime, text, serial, int } from "drizzle-orm/mysql-core";
import { orders } from "./Order";

export const billings = mysqlTable("billings", {
  id: serial("id").primaryKey(),
  order_id: varchar("order_id", { length: 50 }).references(() => orders.id),
  name: varchar("name", { length: 100 }),
  email: varchar("email", { length: 100 }),
  phone: varchar("phone", { length: 20 }),
  created_at: datetime("created_at"),
  updated_at: datetime("updated_at"),
});

export const addresses = mysqlTable("addresses", {
  id: serial("id").primaryKey(),
  billing_id: int("billing_id").references(() => billings.id),
  name: varchar("name", { length: 100 }),
  building: text("building"),
  locality: text("locality"),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 50 }),
  country: varchar("country", { length: 3 }),
  area_code: varchar("area_code", { length: 20 }),
});
