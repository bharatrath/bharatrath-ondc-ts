// schema/payment.ts
import { mysqlTable, varchar, decimal, text, serial, int, datetime } from "drizzle-orm/mysql-core";
import { orders } from "./Order";

export const payments = mysqlTable("payments", {
  id: serial("id").primaryKey(),
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

export const settlementDetails = mysqlTable("settlement_details", {
  id: serial("id").primaryKey(),
  payment_id: int("payment_id").references(() => payments.id),
  counterparty: varchar("counterparty", { length: 50 }),
  phase: varchar("phase", { length: 50 }),
  type: varchar("type", { length: 50 }),
  bank_account: varchar("bank_account", { length: 50 }),
  ifsc_code: varchar("ifsc_code", { length: 50 }),
  beneficiary_name: varchar("beneficiary_name", { length: 100 }),
  bank_name: varchar("bank_name", { length: 100 }),
  branch_name: varchar("branch_name", { length: 100 }),
  timestamp: datetime("timestamp"),
  amount: decimal("amount", { precision: 10, scale: 2 }),
});
