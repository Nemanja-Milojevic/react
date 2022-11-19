import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { CartIconContainer, ItemCount, ShoppingIcon } from './cart-icon.styles';

const CartIcon = () => {
  const { cartOpen, setCartOpen, cartCounter } = useContext(CartContext);

  const toggleCartOpen = () => setCartOpen(!cartOpen);

  return (
    <CartIconContainer onClick={toggleCartOpen}>
      <ShoppingIcon />
      <ItemCount>{cartCounter}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;
