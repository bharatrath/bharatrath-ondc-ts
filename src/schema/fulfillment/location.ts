// schema/fulfillment/location.ts
import { mysqlTable, varchar, text, serial, decimal } from "drizzle-orm/mysql-core";

export const locations = mysqlTable("locations", {
  id: serial("id").primaryKey(),
  fulfillment_id: varchar("fulfillment_id", { length: 50 }),
  gps: varchar("gps", { length: 50 }),
  type: varchar("type", { length: 20 }), // 'start' or 'end'
  building: text("building"),
  locality: text("locality"),
  city: varchar("city", { length: 50 }),
  state: varchar("state", { length: 50 }),
  area_code: varchar("area_code", { length: 20 }),
});
