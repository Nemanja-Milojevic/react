import { Fragment, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/crown.svg';

import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { NavigationContainer, LogoContainer, NavLink, NavLinks } from './navigation.styles';
import { CartContext } from '../../contexts/cart.context';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { cartOpen } = useContext(CartContext);

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <Logo />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>
          {currentUser ? (
            <NavLink as="span" onClick={signOutUser}>
              LOG OUT
            </NavLink>
          ) : (
            <NavLink to="/auth">LOGIN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {cartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
