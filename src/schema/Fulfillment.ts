import { boolean, datetime, int, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm/sql";
export const Fulfillment = mysqlTable("fulfillment", {
  id: varchar("id", { length: 100 }).primaryKey(),
  orderId: varchar("order_id", { length: 255 }),
  type: varchar("type", { length: 50 }),
  tracking: boolean("tracking"),
  stateCode: varchar("state_code", { length: 50 }).default(null),

  startLocationId: varchar("start_location_id", { length: 50 }).default(null),
  startLocationName: varchar("start_location_name", { length: 100 }).default(null),
  startLocationGps: varchar("start_location_gps", { length: 50 }).default(null),
  startLocationAddressBuilding: varchar("start_location_address_building", { length: 255 }).default(null),
  startLocationAddressLocality: varchar("start_location_address_locality", { length: 255 }).default(null),
  startLocationAddressCity: varchar("start_location_address_city", { length: 100 }).default(null),
  startLocationAddressState: varchar("start_location_address_state", { length: 100 }).default(null),
  startLocationAddressAreaCode: varchar("start_location_address_area_code", { length: 10 }).default(null),

  startTimeStart: datetime("start_time_start").default(null),
  startTimeEnd: datetime("start_time_end").default(null),
  startTimeTimestamp: datetime("start_time_timestamp").default(null),
  startContactPhone: varchar("start_contact_phone", { length: 20 }).default(null),
  startContactEmail: varchar("start_contact_email", { length: 100 }).default(null),

  endLocationGps: varchar("end_location_gps", { length: 50 }).default(null),
  endLocationAddressName: varchar("end_location_address_name", { length: 100 }).default(null),
  endLocationAddressBuilding: varchar("end_location_address_building", { length: 255 }).default(null),
  endLocationAddressLocality: varchar("end_location_address_locality", { length: 255 }).default(null),
  endLocationAddressCity: varchar("end_location_address_city", { length: 100 }).default(null),
  endLocationAddressState: varchar("end_location_address_state", { length: 100 }).default(null),
  endLocationAddressCountry: varchar("end_location_address_country", { length: 50 }).default(null),
  endLocationAddressAreaCode: varchar("end_location_address_area_code", { length: 10 }).default(null),

  endTimeStart: datetime("end_time_start").default(null),
  endTimeEnd: datetime("end_time_end").default(null),
  endTimeTimestamp: datetime("end_time_timestamp").default(null),
  endContactPhone: varchar("end_contact_phone", { length: 20 }).default(null),
  endContactEmail: varchar("end_contact_email", { length: 100 }).default(null),
  endPersonName: varchar("end_person_name", { length: 100 }).default(null),
});
