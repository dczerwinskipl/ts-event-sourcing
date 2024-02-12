import { Decide } from "@app/event-sourcing";
import { assertCartOpen } from "../asserts";
import { ShoppingCartState } from "../shopping-cart";
import { CancelShoppingCart } from "./command";
import { ShoppingCartCanceled } from "./event";

export const decide: Decide<
  ShoppingCartState,
  CancelShoppingCart,
  ShoppingCartCanceled
> = (shoppingCart, { data }) => {
  assertCartOpen(shoppingCart);

  return {
    type: "ShoppingCartCanceled",
    data: {
      shoppingCartId: data.shoppingCartId,
      canceledAt: new Date().toJSON(),
    },
  };
};
