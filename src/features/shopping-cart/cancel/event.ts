import { Event } from "@app/core";

export type ShoppingCartCanceled = Event<
  "ShoppingCartCanceled",
  {
    shoppingCartId: string;
    canceledAt: string;
  }
>;
