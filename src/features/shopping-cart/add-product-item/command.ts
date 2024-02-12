import { Command } from "@app/core";
import { ProductItem } from "../shopping-cart";

export type AddProductItemToShoppingCart = Command<
  "AddProductItemToShoppingCart",
  {
    shoppingCartId: string;
    productItem: ProductItem;
  }
>;
