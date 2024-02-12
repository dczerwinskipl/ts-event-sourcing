import { Decider, createDecide, createEvolve } from "@app/event-sourcing";
import * as addProductItem from "./add-product-item";
import * as cancel from "./cancel";
import * as confirm from "./confirm";
import * as open from "./open";
import * as removeProductItem from "./remove-product-item";
import {
  ShoppingCartCommand,
  ShoppingCartEvent,
  ShoppingCartState,
} from "./shopping-cart";

export const decider: Decider<
  ShoppingCartState,
  ShoppingCartCommand,
  ShoppingCartEvent
> = {
  decide: createDecide({
    OpenShoppingCart: open.decide,
    AddProductItemToShoppingCart: addProductItem.decide,
    RemoveProductItemFromShoppingCart: removeProductItem.decide,
    ConfirmShoppingCart: confirm.decide,
    CancelShoppingCart: cancel.decide,
  }),
  evolve: createEvolve({
    ShoppingCartOpened: open.evolve,
    ProductItemAddedToShoppingCart: addProductItem.evolve,
    ProductItemRemovedFromShoppingCart: removeProductItem.evolve,
    ShoppingCartConfirmed: confirm.evolve,
    ShoppingCartCanceled: cancel.evolve,
  }),
  getInitialState: () => ({
    id: "",
    status: "Empty",
  }),
};
