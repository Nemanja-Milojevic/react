import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils.js';

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

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCounter: 0,
  removeItemFromCart: () => null,
  clearItemFromCart: () => null,
  totalPrice: 0
});

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  TOGGLE_CART_OPEN: 'TOGGLE_CART_OPEN'
};

const INITIAL_STATE = {
  cartOpen: false,
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      };
    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        cartOpen: payload
      };
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartOpen, cartCounter, totalPrice } = state;

  const updateCartItemsReducer = (cartItems) => {
    const cartCounter = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0);
    const payload = { cartItems, cartCounter, totalPrice };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (cartItem) => {
    updateCartItemsReducer(addCartItem(cartItems, cartItem));
  };

  const removeItemFromCart = (cartItem) => {
    updateCartItemsReducer(removeItem(cartItems, cartItem));
  };

  const clearItemFromCart = (cartItem) => {
    updateCartItemsReducer(clearItem(cartItems, cartItem));
  };

  const setCartOpen = (value) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, value));
  };

  const value = {
    cartOpen,
    setCartOpen,
    cartItems,
    addItemToCart,
    cartCounter,
    removeItemFromCart,
    clearItemFromCart,
    totalPrice
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
