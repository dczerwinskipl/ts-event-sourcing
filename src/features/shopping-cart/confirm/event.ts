import { Event } from "@app/core";

export type ShoppingCartConfirmed = Event<
  "ShoppingCartConfirmed",
  {
    shoppingCartId: string;
    confirmedAt: string;
  }
>;
