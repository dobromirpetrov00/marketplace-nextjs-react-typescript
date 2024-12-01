/**
 * The `CheckoutPage` component is responsible for rendering the checkout form and handling the checkout process.
 *
 * It uses the `useCart` hook to access the cart data and the `clearCart` function to clear the cart after a successful checkout.
 *
 * The component manages the form state using the `useState` hook and validates the form data before submitting it to the server. If the form is valid, it sends a POST request to the `/checkout` endpoint with the user data and cart items.
 *
 * Upon a successful response, it displays an alert message, clears the cart, and navigates the user to the home page. If there is an error, it displays an alert with the error message.
 */
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/CheckoutPage.module.scss';

const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    zipCode: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    surname: '',
    phone: '',
    email: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = { name: '', surname: '', phone: '', email: '', zipCode: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!formData.surname.trim()) {
      newErrors.surname = 'Surname is required.';
      isValid = false;
    }
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Valid phone number is required.';
      isValid = false;
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required.';
      isValid = false;
    }
    if (!formData.zipCode.trim() || !/^\d{4}$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Valid zip code is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userData: formData, cartItems: cart }),
      });

      if (!response.ok) {
        throw new Error('Checkout failed, please try again.');
      }

      const result = await response.text();
      alert(result);

      clearCart();
      navigate('/');
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h2 className={styles.checkoutTitle}>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className={styles.formInput}
        />
        {errors.name && <div className={styles.error}>{errors.name}</div>}

        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={formData.surname}
          onChange={handleChange}
          className={styles.formInput}
        />
        {errors.surname && <div className={styles.error}>{errors.surname}</div>}

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className={styles.formInput}
        />
        {errors.phone && <div className={styles.error}>{errors.phone}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className={styles.formInput}
        />
        {errors.email && <div className={styles.error}>{errors.email}</div>}

        <input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          value={formData.zipCode}
          onChange={handleChange}
          className={styles.formInput}
        />
        {errors.zipCode && <div className={styles.error}>{errors.zipCode}</div>}

        <button className={styles.formSubmitButton} type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
