import { createContext, useEffect, useState } from 'react';

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

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const addItemToCart = (cartItem) => {
    setCartItems(addCartItem(cartItems, cartItem));
  };

  const removeItemFromCart = (cartItem) => {
    setCartItems(removeItem(cartItems, cartItem));
  };

  const clearItemFromCart = (cartItem) => {
    setCartItems(clearItem(cartItems, cartItem));
  };

  useEffect(() => {
    const counter = cartItems.reduce((result, currentItem) => result + currentItem.quantity, 0);

    setCartCounter(counter);
  }, [cartItems]);

  useEffect(() => {
    const price = cartItems.reduce(
      (result, currentItem) => result + currentItem.quantity * currentItem.price,
      0
    );

    setTotalPrice(price);
  }, [cartItems]);

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
