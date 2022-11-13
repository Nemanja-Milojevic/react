import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
  const { cartOpen, setCartOpen, cartCounter } = useContext(CartContext);

  const toggleCartOpen = () => setCartOpen(!cartOpen);

  return (
    <div onClick={toggleCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCounter}</span>
    </div>
  );
};

export default CartIcon;
