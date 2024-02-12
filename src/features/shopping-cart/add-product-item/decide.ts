import { Decide } from "@app/event-sourcing";
import { assertCartOpen, assertInitialized } from "../asserts";
import { ShoppingCartState } from "../shopping-cart";
import { AddProductItemToShoppingCart } from "./command";
import { ProductItemAddedToShoppingCart } from "./event";

export const decide: Decide<
  ShoppingCartState,
  AddProductItemToShoppingCart,
  ProductItemAddedToShoppingCart
> = (shoppingCart, { data }) => {
  assertInitialized(shoppingCart);
  assertCartOpen(shoppingCart);

  return {
    type: "ProductItemAddedToShoppingCart",
    data: {
      shoppingCartId: data.shoppingCartId,
      productItem: data.productItem,
    },
  };
};
