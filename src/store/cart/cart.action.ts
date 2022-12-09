import { ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/category.types';
import { CartItem, CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeItem = (cartItems: CartItem[], cartItemToRemove: CartItem): CartItem[] => {
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

  if (existingCartItem?.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearItem = (cartItems: CartItem[], cartItem: CartItem): CartItem[] => {
  return cartItems.filter((item) => item.id !== cartItem.id);
};

export type SetIsCartOpen = ActionWithPayload<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;

export type SetCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems => createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = (cartItems: CartItem[], cartItem: CategoryItem) => {
  const newCartItems = addCartItem(cartItems, cartItem);

  return setCartItems(newCartItems);
};

export const removeItemFromCart = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = removeItem(cartItems, cartItem);

  return setCartItems(newCartItems);
};

export const clearItemFromCart = (cartItems: CartItem[], cartItem: CartItem) => {
  const newCartItems = clearItem(cartItems, cartItem);

  return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
);
