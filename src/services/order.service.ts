// services/order.service.ts
import { db } from "../db";
import { eq } from "drizzle-orm";
import { contexts, orders, billings, addresses, payments, settlementDetails, items, fulfillments, locations, contacts } from "../schema/index";
import { v4 as uuidv4 } from "uuid";

type FullOrderData = {
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

export class OrderService {
  async createOrder(orderData: FullOrderData) {
    // return db.transaction(async (tx) => {
    //   try {
    //     // 1. Create Context
    //     const contextId = uuidv4();
    //     await tx.insert(contexts).values({
    //       ...orderData.context,
    //       transaction_id: contextId,
    //       timestamp: new Date().toISOString(),
    //     });
    //     // 2. Create Order
    //     await tx.insert(orders).values({
    //       id: orderData.order.id,
    //       state: orderData.order.state,
    //       created_at: new Date(orderData.order.created_at),
    //       updated_at: new Date(orderData.order.updated_at),
    //       transaction_id: contextId,
    //     });
    //     // 3. Create Billing & Address
    //     const [billing] = await tx
    //       .insert(billings)
    //       .values({
    //         order_id: orderData.order.id,
    //         ...orderData.order.billing,
    //         created_at: new Date(),
    //         updated_at: new Date(),
    //       })
    //       .$returningId();
    //     await tx.insert(addresses).values({
    //       billing_id: billing.id,
    //       ...orderData.order.billing.address,
    //     });
    //     // 4. Create Payment & Settlements
    //     const [payment] = await tx
    //       .insert(payments)
    //       .values({
    //         order_id: orderData.order.id,
    //         ...orderData.order.payment,
    //         amount: parseFloat(orderData.order.payment.params.amount),
    //         transaction_id: orderData.order.payment.params.transaction_id,
    //       })
    //       .$returningId();
    //     for (const settlement of orderData.order.payment.settlement_details) {
    //       await tx.insert(settlementDetails).values({
    //         payment_id: payment.id,
    //         ...settlement,
    //         amount: parseFloat(settlement.amount as string),
    //         timestamp: new Date(settlement.timestamp as string),
    //       });
    //     }
    //     // 5. Create Items
    //     for (const item of orderData.order.items) {
    //       await tx.insert(items).values({
    //         ...item,
    //         order_id: orderData.order.id,
    //         quantity: item.quantity,
    //       });
    //     }
    //     // 6. Create Fulfillments
    //     for (const fulfillment of orderData.order.fulfillments) {
    //       const [fulfillmentRecord] = await tx
    //         .insert(fulfillments)
    //         .values({
    //           ...fulfillment,
    //           order_id: orderData.order.id,
    //         })
    //         .$returningId();
    //       // Handle Start Location
    //       if (fulfillment.start) {
    //         const [startLocation] = await tx
    //           .insert(locations)
    //           .values({
    //             ...fulfillment.start.location,
    //             fulfillment_id: fulfillmentRecord.id,
    //             type: "start",
    //           })
    //           .$returningId();
    //         await tx.insert(contacts).values({
    //           ...fulfillment.start.contact,
    //           location_id: startLocation.id,
    //         });
    //       }
    //       // Handle End Location
    //       if (fulfillment.end) {
    //         const [endLocation] = await tx
    //           .insert(locations)
    //           .values({
    //             ...fulfillment.end.location,
    //             fulfillment_id: fulfillmentRecord.id,
    //             type: "end",
    //           })
    //           .$returningId();
    //         await tx.insert(contacts).values({
    //           ...fulfillment.end.contact,
    //           location_id: endLocation.id,
    //           person_name: fulfillment.end.person?.name,
    //         });
    //       }
    //     }
    //     return this.getOrderById(orderData.order.id);
    //   } catch (error) {
    //     console.error("Transaction failed:", error);
    //     throw new Error("Order creation failed");
    //   }
    // });
  }

  async getOrderById(id: string) {
    return db.query.orders.findFirst({
      where: eq(orders.id, id),
      with: {
        context: true,
        billing: {
          with: {
            address: true,
          },
        },
        payment: {
          with: {
            settlements: true,
          },
        },
        items: true,
        fulfillments: {
          with: {
            locations: {
              with: {
                contacts: true,
              },
            },
          },
        },
      },
    });
  }
}
