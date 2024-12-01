/**
 * Renders a product card component that displays information about a product, including its image, name, brand, price, and an "Add to Cart" button.
 * If the product has selectable options, it will open a modal to allow the user to select the options before adding the product to the cart.
 * The component also keeps track of the current quantity of the product in the cart and disables the "Add to Cart" button if the product is out of stock.
 *
 * @param {ProductCardProps} props - The props object containing the product information.
 * @param {Product} props.product - The product object to be displayed in the card.
 * @returns {JSX.Element} - The rendered product card component.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShopping } from "react-icons/ai";
import { useCart } from '../context/CartContext';
import { Product } from '../types/product';
import OptionSelectionModal from './OptionSelectionModal';
import styles from '../styles/ProductCard.module.scss';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cartItem = cart.find(item => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (product.selectible_option) {
      setIsModalOpen(true);
    } else {
      addToCart(product);
    }
  };

  return (
    <div className={styles['product-card']}>
      <Link to={`/product/${product.id}`} className={styles['product-image-container']}>
        <img src="/assets/product.png" alt={product.product_name} className={styles['product-image']} />
      </Link>

      <Link to={`/product/${product.id}`} className={styles['product-info']}>
        <div className={styles['product-name-brand']}>
          <div className={styles['product-name']}>{product.product_name}</div>
          <div className={styles['product-brand']}>{product.brand}</div>
        </div>

        <div className={styles['product-price']}>${product.price.toFixed(2)}</div>
      </Link>

      <button
        className={styles['add-to-cart-container']}
        onClick={handleAddToCart}
        disabled={currentQuantity >= product.stock_quantity}
      >
        <AiOutlineShopping />
      </button>

      {isModalOpen && (
        <OptionSelectionModal
          product={product}
          onClose={() => setIsModalOpen(false)}
          onAddToCart={(selectedOption) => {
            addToCart(product, selectedOption);
            setIsModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default ProductCard;
