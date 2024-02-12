import { Evolve } from "@app/event-sourcing";
import { merge } from "@app/utils";
import { ShoppingCartState } from "../shopping-cart";
import { ProductItemAddedToShoppingCart } from "./event";

export const evolve: Evolve<
  ShoppingCartState,
  ProductItemAddedToShoppingCart
> = (state, event) => {
  if (state.status != "Pending") return state;
  const { productItems } = state;
  const {
    data: { productItem },
  } = event;

  return {
    ...state,
    productItems: merge(
      productItems,
      productItem,
      (p) => p.productId === productItem.productId,
      (p) => {
        return {
          ...p,
          quantity: p.quantity + productItem.quantity,
        };
      },
      () => productItem
    ),
  };
};
