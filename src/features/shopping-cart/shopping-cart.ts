import { Aggregate } from "@app/core";
import { EventSourcedAggregate } from "@app/event-sourcing";
import {
  AddProductItemToShoppingCart,
  ProductItemAddedToShoppingCart,
} from "./add-product-item";
import { CancelShoppingCart, ShoppingCartCanceled } from "./cancel";
import { ConfirmShoppingCart, ShoppingCartConfirmed } from "./confirm";
import { OpenShoppingCart, ShoppingCartOpened } from "./open";
import {
  ProductItemRemovedFromShoppingCart,
  RemoveProductItemFromShoppingCart,
} from "./remove-product-item";

export type ShoppingCartEmptyState = {
  status: "Empty";
};

export type ShoppingCartState = Aggregate &
  (
    | ShoppingCartEmptyState
    | {
        status: "Pending";
        clientId: string;
        productItems: ProductItem[];
      }
    | {
        status: "Confirmed";
        clientId: string;
        productItems: ProductItem[];
        confirmedAt: Date;
      }
    | {
        status: "Canceled";
        clientId: string;
        productItems: ProductItem[];
        canceledAt: Date;
      }
  );

export type ShoppingCart = EventSourcedAggregate<
  ShoppingCartState,
  ShoppingCartEvent
>;

export interface ProductItem {
  productId: string;
  quantity: number;
}

export type ShoppingCartCommand =
  | OpenShoppingCart
  | AddProductItemToShoppingCart
  | RemoveProductItemFromShoppingCart
  | ConfirmShoppingCart
  | CancelShoppingCart;

export type ShoppingCartEvent =
  | ShoppingCartOpened
  | ProductItemAddedToShoppingCart
  | ProductItemRemovedFromShoppingCart
  | ShoppingCartConfirmed
  | ShoppingCartCanceled;
