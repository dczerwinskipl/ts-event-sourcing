import { NotInitializedError } from "@app/event-sourcing/errors";
import { ShoppingCartEmptyState, ShoppingCartState } from "./shopping-cart";

export const CART_IS_CLOSED = "CART_IS_CLOSED";
export const CART_ALREADY_EXISTS = "CART_ALREADY_EXISTS";

export function assertInitialized(
  state: ShoppingCartState
): asserts state is Exclude<ShoppingCartState, ShoppingCartEmptyState> {
  if (state.status === "Empty") {
    throw new NotInitializedError();
  }
}

export function assertNotInitialized(
  state: ShoppingCartState
): asserts state is Extract<ShoppingCartState, ShoppingCartEmptyState> {
  if (state.status !== "Empty") {
    throw CART_ALREADY_EXISTS;
  }
}

export function assertCartOpen(
  state: ShoppingCartState
): asserts state is Extract<ShoppingCartState, { status: "Pending" }> {
  if (state.status !== "Pending") {
    throw CART_IS_CLOSED;
  }
}
