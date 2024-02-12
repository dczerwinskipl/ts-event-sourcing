import { Decide } from "@app/event-sourcing";
import { assertCartOpen, assertInitialized } from "../asserts";
import { ShoppingCartState } from "../shopping-cart";
import { ConfirmShoppingCart } from "./command";
import { ShoppingCartConfirmed } from "./event";

export const decide: Decide<
  ShoppingCartState,
  ConfirmShoppingCart,
  ShoppingCartConfirmed
> = (shoppingCart, { data }) => {
  assertInitialized(shoppingCart);
  assertCartOpen(shoppingCart);

  return {
    type: "ShoppingCartConfirmed",
    data: {
      shoppingCartId: data.shoppingCartId,
      confirmedAt: new Date().toJSON(),
    },
  };
};
