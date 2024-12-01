/**
 * A React component that renders a modal for selecting an option for a product.
 *
 * @param product - The product object containing the selectable option information.
 * @param onClose - A callback function to be called when the modal is closed.
 * @param onAddToCart - A callback function to be called when an option is selected and added to the cart.
 */
import React, { useState } from 'react';
import { Product } from '../types/product';
import styles from '../styles/OptionSelectionModal.module.scss';

interface OptionSelectionModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (selectedOption: number | string) => void;
}

const OptionSelectionModal: React.FC<OptionSelectionModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedOption, setSelectedOption] = useState<number | string | null>(null);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value === "" ? null : value);
  };

  const handleAddToCart = () => {
    if (selectedOption !== null) {
      onAddToCart(selectedOption);
      onClose();
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>Select {product.selectible_option.option_name}</h2>

        <div className={styles['modal-options-container']}>
          <select className={styles['modal-options']} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            {product.selectible_option.option.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button
            className={styles['modal-button']}
            onClick={handleAddToCart}
            disabled={selectedOption === null}
          >
            Add to Cart
          </button>

          <button className={styles['modal-button']} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default OptionSelectionModal;
