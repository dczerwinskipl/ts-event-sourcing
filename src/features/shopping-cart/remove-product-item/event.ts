import { Event } from "@app/core";
import { ProductItem } from "../shopping-cart";

export type ProductItemRemovedFromShoppingCart = Event<
  "ProductItemRemovedFromShoppingCart",
  {
    shoppingCartId: string;
    productItem: ProductItem;
  }
>;
