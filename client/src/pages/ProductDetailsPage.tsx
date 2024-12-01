/**
 * Renders the product details page, displaying information about a specific product and allowing the user to add it to the cart.
 *
 * The component uses the `useParams` hook to retrieve the product ID from the URL, and the `useFetch` hook to fetch the product data from the API.
 * It also uses the `useCart` hook to access the cart context and add the product to the cart.
 *
 * The component displays the product image, name, brand, price, description, and available quantity. If the product has selectable options, it renders a dropdown menu to allow the user to select an option.
 * The "Add to Cart" button is disabled if the user has already added the maximum quantity of the product to the cart, or if a selectable option is required but not selected.
 *
 * When the user clicks the "Add to Cart" button, the product is added to the cart and a toast message is displayed for 3 seconds.
 */
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import useFetch from '../hooks/useFetch';
import { Product } from '../types/product';
import styles from '../styles/ProductDetails.module.scss';
import { useCart } from '../context/CartContext';
import ToastMessage from '../components/ToastMessage';

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, loading, error } = useFetch<Product>(`${process.env.REACT_APP_API_URL}/products/${id}`);
  const { cart, addToCart } = useCart();
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);
  const [showToast, setShowToast] = useState<boolean>(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddToCart = () => {
    if (product) {
      if (product.selectible_option && selectedOption === null) {
        alert('Please select an option before adding to cart.');
        return;
      }

      const optionToAdd = product.selectible_option ? selectedOption ?? undefined : undefined;
      addToCart(product, optionToAdd);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const cartItem = cart.find(
    (item) => item.id === product?.id && item.selectedOption === (product.selectible_option ? selectedOption : undefined)
  );

  return (
    <>
      <Header />
      {product && (
        <div className={styles['product-details-content']}>
          <img src="/assets/product.png" alt={product.product_name} className={styles['product-image']} />

          <div className={styles['product-details-info']}>
            <div className={styles['product-name']}>{product.product_name}</div>
            <div className={styles['product-brand']}>{product.brand}</div>
            <div className={styles['product-price']}>${product.price.toFixed(2)}</div>
            <div className={styles['product-description']}>{product.description}</div>

            {product.selectible_option && (
              <div className={styles['product-options-container']}>
                <div className={styles['product-options-name']}>{product.selectible_option.option_name}</div>

                <select
                  className={styles['product-options']}
                  value={selectedOption ?? ''}
                  onChange={(e) => setSelectedOption(e.target.value === "" ? null : e.target.value)}
                >
                  <option value="">Select Option</option>
                  {product.selectible_option.option.map((optionItem, index) => (
                    <option key={index} value={optionItem}>{optionItem}</option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={styles['add-to-cart-button']}
              onClick={handleAddToCart}
              disabled={
                (cartItem && cartItem.quantity >= product.stock_quantity) ||
                (product.selectible_option && selectedOption === null)
              }
            >
              Add to Cart
            </button>

            <div className={styles['product-quantity']}>Available Quantity: <span className={styles.stock_quantity_number}>{product.stock_quantity}</span></div>
            {product.stock_quantity === 0 && (
              <div className={styles['out-of-stock']}>Out of Stock</div>
            )}
          </div>
        </div>
      )}
      {showToast && <ToastMessage message="Item added to cart!" />}
    </>
  );
};

export default ProductDetailsPage;
