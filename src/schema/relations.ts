// schema/relations.ts
import { relations } from "drizzle-orm";
import { orders, contexts, billings, addresses, payments, settlementDetails, fulfillments, quotes } from "./index";

export const orderRelations = relations(orders, ({ one, many }) => ({
  context: one(contexts, {
    fields: [orders.transaction_id],
    references: [contexts.transaction_id],
  }),
  billings: many(billings),
  payments: many(payments),
  fulfillments: many(fulfillments),
  quotes: many(quotes),
}));

export const billingRelations = relations(billings, ({ one, many }) => ({
  order: one(orders, {
    fields: [billings.order_id],
    references: [orders.id],
  }),
  address: one(addresses),
}));
