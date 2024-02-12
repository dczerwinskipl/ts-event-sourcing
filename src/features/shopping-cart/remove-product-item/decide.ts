import { Decide } from "@app/event-sourcing";
import { assertCartOpen, assertInitialized } from "../asserts";
import { ProductItem, ShoppingCartState } from "../shopping-cart";
import { RemoveProductItemFromShoppingCart } from "./command";
import { ProductItemRemovedFromShoppingCart } from "./event";

export const PRODUCT_ITEM_NOT_FOUND = "PRODUCT_ITEM_NOT_FOUND";
export const PRODUCT_ITEM_QUANTITY = "PRODUCT_ITEM_QUANTITY";

const assertProductItemExists = (
  productItems: ProductItem[],
  { productId, quantity }: ProductItem
): ProductItem => {
  const current = productItems.find((pi) => pi.productId === productId);

  if (!current) {
    throw PRODUCT_ITEM_NOT_FOUND;
  }

  if (current.quantity < quantity) {
    throw `${PRODUCT_ITEM_QUANTITY}, max value: ${current.quantity}`;
  }

  return current;
};

const assertProductItemQuantity = (
  current: ProductItem,
  { quantity }: ProductItem
): ProductItem => {
  if (current.quantity < quantity) {
    throw `${PRODUCT_ITEM_QUANTITY}, max value: ${current.quantity}`;
  }

  return current;
};

export const decide: Decide<
  ShoppingCartState,
  RemoveProductItemFromShoppingCart,
  ProductItemRemovedFromShoppingCart
> = (shoppingCart, { data }) => {
  assertInitialized(shoppingCart);
  assertCartOpen(shoppingCart);

  const currentProductItem = assertProductItemExists(
    shoppingCart.productItems,
    data.productItem
  );
  assertProductItemQuantity(currentProductItem, data.productItem);

  return {
    type: "ProductItemRemovedFromShoppingCart",
    data: {
      shoppingCartId: data.shoppingCartId,
      productItem: data.productItem,
    },
  };
};
