import { Evolve } from "@app/event-sourcing";
import { ShoppingCartState } from "../shopping-cart";
import { ShoppingCartOpened } from "./event";

export const evolve: Evolve<ShoppingCartState, ShoppingCartOpened> = (
  state,
  event
) => {
  if (state.status != "Empty") return state;

  return {
    id: event.data.shoppingCartId,
    clientId: event.data.clientId,
    productItems: [],
    status: "Pending",
  };
};
