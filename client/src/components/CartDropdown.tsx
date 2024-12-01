/**
 * A React component that renders a dropdown menu for the user's shopping cart.
 *
 * The component displays the items in the user's cart, allowing them to update the quantity or remove items. It also provides a button to continue to the checkout page.
 *
 * @returns {JSX.Element} The rendered CartDropdown component.
 */
import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CiTrash } from "react-icons/ci";
import styles from '../styles/CartDropdown.module.scss';

const CartDropdown: React.FC = () => {
  const { cart, removeFromCart, updateCartItemQuantity } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className={styles['cart-dropdown']}>
      {cart.length === 0 ? (
        <div className={styles['empty-cart']}>Your cart is empty</div>
      ) : (
        cart.map((item, index) => (
          <div key={index} className={styles['cart-item']}>
            <img src='/assets/product.png' alt={item.product_name} className={styles['cart-item-image']} />

            <div className={styles['cart-item-details']}>
              <div className={styles['cart-brand-price']}>
                <div className={styles['cart-brand']}>{item.brand}</div>
                <div className={styles['cart-price']}>${item.price.toFixed(2)}</div>
              </div>

              <div className={styles['cart-product-name']}>{item.product_name}</div>

              <div className={styles['cart-quantity-trash']}>
                <div className={styles['cart-quantity-buttons']}>
                  <button
                    className={styles['cart-quantity-button-minus']}
                    onClick={() => updateCartItemQuantity(item.id, item.selectedOption, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <div className={styles['cart-quantity']}>{item.quantity}</div>
                  <button
                    className={styles['cart-quantity-button-plus']}
                    onClick={() => updateCartItemQuantity(item.id, item.selectedOption, item.quantity + 1)}
                    disabled={item.quantity >= item.stock_quantity}
                  >
                    +
                  </button>
                </div>

                <button
                  className={styles['cart-trash']}
                  onClick={() => removeFromCart(item.id, item.selectedOption)}
                >
                  <CiTrash />
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <div className={styles['cart-checkout']}>
          <button className={styles['cart-checkout-button']} onClick={handleCheckout}>Continue to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartDropdown;
