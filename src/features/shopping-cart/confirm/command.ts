import { Command } from "@app/core";

export type ConfirmShoppingCart = Command<
  "ConfirmShoppingCart",
  {
    shoppingCartId: string;
  }
>;
