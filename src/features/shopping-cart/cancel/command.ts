import { Command } from "@app/core";

export type CancelShoppingCart = Command<
  "CancelShoppingCart",
  {
    shoppingCartId: string;
  }
>;
