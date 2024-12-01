import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {CartProvider} from './context/CartContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);
