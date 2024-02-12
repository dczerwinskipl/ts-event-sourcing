import { Evolve } from "@app/event-sourcing";
import { ShoppingCartState } from "../shopping-cart";
import { ShoppingCartCanceled } from "./event";

export const evolve: Evolve<ShoppingCartState, ShoppingCartCanceled> = (
  state,
  event
) => {
  if (state.status != "Pending") return state;

  return {
    ...state,
    status: "Canceled",
    canceledAt: new Date(event.data.canceledAt),
  };
};
