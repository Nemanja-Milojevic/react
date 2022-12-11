import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { signOutStart } from '../../store/user/user.action';

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const dispatch = useDispatch();

  const signOut = () => dispatch(signOutStart());

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOut}>
              LOG OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">LOGIN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
