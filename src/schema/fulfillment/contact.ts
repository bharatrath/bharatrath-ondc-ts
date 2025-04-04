// db/schema/contact.ts
import { mysqlTable, serial, varchar, text } from "drizzle-orm/mysql-core";

export const contacts = mysqlTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 100 }).notNull(),
  person_name: varchar("person_name", { length: 100 }),
});
