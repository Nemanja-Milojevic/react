import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, cartItem) => {
  const foundCartItem = cartItems.find((item) => item.id === cartItem.id);

  if (foundCartItem) {
    const newCartItems = [...cartItems];

    newCartItems.forEach((item) => {
      if (item.id === foundCartItem.id) {
        item.quantity++;
      }
    });

    return newCartItems;
  }

  return [...cartItems, { ...cartItem, quantity: 1 }];
};

const removeItem = (cartItems, cartItem) => {
  const foundCartItem = cartItems.find((item) => item.id === cartItem.id);

  if (foundCartItem?.quantity > 1) {
    const newCartItems = [...cartItems];

    newCartItems.forEach((item) => {
      if (item.id === foundCartItem.id) {
        item.quantity--;
      }
    });

    return newCartItems;
  }

  return cartItems.filter((item) => item.id !== cartItem.id);
};

const clearItem = (cartItems, cartItem) => {
  return cartItems.filter((item) => item.id !== cartItem.id);
};

export const addItemToCart = (cartItems, cartItem) => {
  const newCartItems = addCartItem(cartItems, cartItem);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItem) => {
  const newCartItems = removeItem(cartItems, cartItem);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const clearItemFromCart = (cartItems, cartItem) => {
  const newCartItems = clearItem(cartItems, cartItem);

  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = (isCartOpen) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
