import { createContext, useEffect, useState } from 'react';

const addCartItem = (cartItems, product) => {
  const newCartItems = [...cartItems];
  const foundCartItem = newCartItems.find((item) => item.id === product.id);

  if (foundCartItem) {
    newCartItems.forEach((item) => {
      if (item.id === foundCartItem.id) {
        item.quantity++;
      }
    });
  } else {
    newCartItems.push({ ...product, quantity: 1 });
  }

  return newCartItems;
};

export const CartContext = createContext({
  cartOpen: false,
  setCartOpen: () => null,
  cartItems: [],
  addItemToCart: () => null,
  cartCounter: 0
});

export const CartProvider = ({ children }) => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCounter, setCartCounter] = useState(0);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(cartItems, product));
  };

  useEffect(() => {
    const counter = cartItems.reduce((result, currentItem) => result + currentItem.quantity, 0);

    setCartCounter(counter);
  }, [cartItems]);

  const value = { cartOpen, setCartOpen, cartItems, addItemToCart, cartCounter };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
