import { Command } from "@app/core";
import { ProductItem } from "../shopping-cart";

export type RemoveProductItemFromShoppingCart = Command<
  "RemoveProductItemFromShoppingCart",
  {
    shoppingCartId: string;
    productItem: ProductItem;
  }
>;
