/**
 * Provides a context for managing the shopping cart state in a React application.
 *
 * The `CartProvider` component is responsible for managing the cart state, including adding, removing, and updating items in the cart. It also handles persisting the cart state to local storage.
 *
 * The `useCart` hook can be used to access the cart state and the functions for manipulating the cart.
 */
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Product } from '../types/product';

interface CartItem extends Product {
  selectedOption?: number | string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedOption?: number | string) => void;
  removeFromCart: (productId: string, selectedOption?: number | string) => void;
  updateCartItemQuantity: (productId: string, selectedOption: number | string | undefined, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');

    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product: Product, selectedOption?: number | string) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.selectedOption === selectedOption
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];

        if (existingItem.quantity < product.stock_quantity) {
          updatedCart[existingItemIndex] = { ...existingItem, quantity: existingItem.quantity + 1 };
        }
        return updatedCart;
      } else {
        return [...prevCart, { ...product, selectedOption, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string, selectedOption?: number | string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          item.id !== productId || (item.selectedOption && item.selectedOption !== selectedOption)
      )
    );
  };

  const updateCartItemQuantity = (productId: string, selectedOption: number | string | undefined, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.selectedOption === selectedOption
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
