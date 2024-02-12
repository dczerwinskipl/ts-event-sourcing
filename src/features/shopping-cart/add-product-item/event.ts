import { Event } from "@app/core";
import { ProductItem } from "../shopping-cart";

export type ProductItemAddedToShoppingCart = Event<
  "ProductItemAddedToShoppingCart",
  {
    shoppingCartId: string;
    productItem: ProductItem;
  }
>;
