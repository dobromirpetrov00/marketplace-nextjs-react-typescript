/**
 * The `ProductListingPage` component is the main page for displaying a list of products. It fetches the product data, applies various filters and sorting options, and renders the filtered and sorted products in a grid layout. It also includes pagination functionality to display a subset of the products per page.
 *
 * The component uses the `useFetch` hook to fetch the product data from the API, and manages the state for the current page, selected category, selected brands, sort option, and price range. It filters the products based on the selected category, brands, and price range, and sorts them based on the selected sort option. The filtered and sorted products are then displayed in the product grid, with pagination controls at the bottom of the page.
 *
 * The `Filters` component is used to allow the user to select the category, brands, sort option, and price range, and the `Pagination` component is used to allow the user to navigate between pages of products.
 */
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Filters from '../components/Filters';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import useFetch from '../hooks/useFetch';
import { Product } from '../types/product';
import styles from '../styles/ProductListing.module.scss';

const PRODUCTS_PER_PAGE = 16;

const ProductListingPage: React.FC = () => {
  const { data: products, loading, error } = useFetch<Product[]>(`${process.env.REACT_APP_API_URL}/products`);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<string>('Release Date: Desc');

  const [initialPriceRange, setInitialPriceRange] = useState<[number, number]>([0, 0]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (products && products.length > 0) {
      const minPrice = Math.min(...products.map(product => product.price));
      const maxPrice = Math.max(...products.map(product => product.price));
      setInitialPriceRange([minPrice, maxPrice]);
      setPriceRange([minPrice, maxPrice]);
    }
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!products) return <div>No products available.</div>;

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

    return categoryMatch && brandMatch && priceMatch;
  });

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case 'Release Date: Asc':
        return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
      case 'Release Date: Desc':
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      case 'Price: Asc':
        return a.price - b.price;
      case 'Price: Desc':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = sortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <Header />

      <h2 className={styles.pageTitle}>Products</h2>

      <Filters
        onCategoryChange={setSelectedCategory}
        onBrandChange={setSelectedBrands}
        onSortChange={setSortOption}
        onPriceChange={handlePriceRangeChange}
        minPrice={initialPriceRange[0]}
        maxPrice={initialPriceRange[1]}
      />

      <div className={styles['product-grid']}>
        {currentProducts.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductListingPage;
