import { Evolve } from "@app/event-sourcing";
import { ShoppingCartState } from "../shopping-cart";
import { ShoppingCartConfirmed } from "./event";

export const evolve: Evolve<ShoppingCartState, ShoppingCartConfirmed> = (
  state,
  event
) => {
  if (state.status != "Pending") return state;

  return {
    ...state,
    status: "Confirmed",
    confirmedAt: new Date(event.data.confirmedAt),
  };
};
