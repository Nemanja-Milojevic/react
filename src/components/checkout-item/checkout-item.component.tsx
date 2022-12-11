import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addItemToCart, clearItemFromCart, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import { CartItem } from '../../store/cart/cart.types';
import {
  Arrow,
  BaseSpan,
  CheckoutItemContainer,
  ImageContainer,
  Quantity,
  RemoveButton,
  Value
} from './checkout-item.styles';

export type CheckoutItemProps = {
  cartItem: CartItem;
};

const CheckoutItem: FC<CheckoutItemProps> = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
  const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemFromCartHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <Arrow onClick={removeItemFromCartHandler}>&#10094;</Arrow>
        <Value>{quantity}</Value>
        <Arrow onClick={addItemToCartHandler}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan>${price * quantity}</BaseSpan>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
