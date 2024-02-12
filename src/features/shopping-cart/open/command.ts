import { Command } from "@app/core";

export type OpenShoppingCart = Command<
  "OpenShoppingCart",
  {
    shoppingCartId: string;
    clientId: string;
  }
>;
