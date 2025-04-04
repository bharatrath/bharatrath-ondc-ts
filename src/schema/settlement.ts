import { mysqlTable, varchar, datetime, text, serial, int, bigint, decimal } from "drizzle-orm/mysql-core";
import { payments } from "./Payment";
export const settlementDetails = mysqlTable("settlement_details", {
  id: varchar("id", { length: 100 }).primaryKey(),
  payment_id: varchar("payment_id", { length: 100 }).references(() => payments.id),
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
