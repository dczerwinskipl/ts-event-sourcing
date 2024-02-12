import { Event } from "@app/core";

export type ShoppingCartOpened = Event<
  "ShoppingCartOpened",
  {
    shoppingCartId: string;
    clientId: string;
    openedAt: string;
  }
>;
