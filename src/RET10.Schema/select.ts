import { addresses, billings, contacts, contexts, fulfillments, items, locations, payments } from "../schema";
import { settlementDetails } from "../schema/settlement";

export type FullOrderData = {
  context: typeof contexts.$inferInsert;
  order: {
    id: string;
    state: string;
    created_at: string;
    updated_at: string;
    billing: typeof billings.$inferInsert & {
      address: typeof addresses.$inferInsert;
    };
    payment: typeof payments.$inferInsert & {
      params: {
        amount: string;
        currency: string;
        transaction_id: string;
      };
      settlement_details: (typeof settlementDetails.$inferInsert)[];
    };
    items: (typeof items.$inferInsert)[];
    fulfillments: (typeof fulfillments.$inferInsert & {
      start?: {
        location: typeof locations.$inferInsert;
        contact: typeof contacts.$inferInsert;
      };
      end?: {
        location: typeof locations.$inferInsert;
        contact: typeof contacts.$inferInsert;
        person?: { name: string };
      };
    })[];
  };
};
