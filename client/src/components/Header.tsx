/**
 * Renders the header component for the application, including a logo and a shopping cart icon with a count of the items in the cart.
 * The header also includes a dropdown menu that appears when the shopping cart icon is clicked, displaying the contents of the cart.
 */
import React, { useState } from 'react';
import { AiOutlineShopping } from "react-icons/ai";
import CartDropdown from './CartDropdown';
import { useCart } from '../context/CartContext';
import styles from '../styles/Header.module.scss';

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart();

  const toggleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <h1 className={styles.logo}>Dobby's Shop</h1>

        <div className={styles.cartIconContainer}>
          <span className={styles.cartIconWrapper} onClick={toggleCartDropdown}>
            <AiOutlineShopping className={styles.cartIcon} />
            {totalItems > 0 && <span className={styles.cartItemCount}>{totalItems}</span>}
          </span>
          {isCartOpen && <CartDropdown />}
        </div>
      </div>
    </header>
  );
};

export default Header;
