import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductListingPage from './pages/ProductListingPage';
import NotFound from './pages/NotFound';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CheckoutPage from './pages/CheckoutPage';
import './styles/App.scss';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ProductListingPage />} />
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
);

export default App;
