// schema/quote.ts
import { mysqlTable, varchar, decimal, serial, text, int } from "drizzle-orm/mysql-core";
import { orders } from "./Order";

export const quotes = mysqlTable("quotes", {
  id: varchar("id", { length: 50 }).primaryKey(),
  order_id: varchar("order_id", { length: 50 }).references(() => orders.id),
  currency: varchar("currency", { length: 3 }),
  value: decimal("value", { precision: 10, scale: 2 }),
  ttl: varchar("ttl", { length: 50 }),
});

export const quoteBreakups = mysqlTable("quote_breakups", {
  id: varchar("id", { length: 50 }).primaryKey(),
  quote_id: varchar("quote_id", { length: 50 }).references(() => quotes.id),
  title: text("title"),
  value: decimal("value", { precision: 10, scale: 2 }),
  item_id: varchar("item_id", { length: 50 }),
  title_type: varchar("title_type", { length: 50 }),
  quantity: int("quantity"),
});
