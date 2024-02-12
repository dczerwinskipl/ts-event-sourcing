import { Decide } from "@app/event-sourcing";
import { assertNotInitialized } from "../asserts";
import { ShoppingCartState } from "../shopping-cart";
import { OpenShoppingCart } from "./command";
import { ShoppingCartOpened } from "./event";

export const CART_ALREADY_EXISTS = "CART_ALREADY_EXISTS";

export const decide: Decide<
  ShoppingCartState,
  OpenShoppingCart,
  ShoppingCartOpened
> = (shoppingCart, { data }) => {
  assertNotInitialized(shoppingCart);

  return {
    type: "ShoppingCartOpened",
    data: {
      shoppingCartId: data.shoppingCartId,
      clientId: data.clientId,
      openedAt: new Date().toJSON(),
    },
  };
};
