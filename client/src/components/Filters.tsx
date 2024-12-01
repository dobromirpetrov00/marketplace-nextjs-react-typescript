/**
 * The `Filters` component provides a set of filters for users to refine the products displayed on the page.
 * It allows users to filter by category, brand, price range, and sort order.
 *
 * The component receives the following props:
 * - `onCategoryChange`: a callback function that is called when the user selects a category
 * - `onBrandChange`: a callback function that is called when the user selects or deselects a brand
 * - `onSortChange`: a callback function that is called when the user selects a sort option
 * - `onPriceChange`: a callback function that is called when the user changes the price range
 * - `minPrice`: the minimum price of the products
 * - `maxPrice`: the maximum price of the products
 *
 * The component manages the state of the selected category, brands, price range, and sort option, and updates the parent component accordingly.
 */
import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/Filters.module.scss';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

interface FiltersProps {
  onCategoryChange: (category: string) => void;
  onBrandChange: (brands: string[]) => void;
  onSortChange: (sortOption: string) => void;
  onPriceChange: (priceRange: [number, number]) => void;
  minPrice: number;
  maxPrice: number;
}

interface Category {
  id: string;
  name: string;
}

const Filters: React.FC<FiltersProps> = ({ onCategoryChange, onBrandChange, onSortChange, onPriceChange, minPrice, maxPrice }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortOption, setSortOption] = useState<string>('Release Date: Desc');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/categories`)
      .then(response => response.json())
      .then(data => {
        setCategories(data);
      });
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  const handleBrandSelection = (brand: string, event: React.ChangeEvent) => {
    event.stopPropagation();
    setSelectedBrands(prev => {
      const updatedBrands = prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand];
      onBrandChange(updatedBrands);
      return updatedBrands;
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/brands`)
      .then(response => response.json())
      .then(data => {
        const brandNames = data.map((brand: { name: string }) => brand.name);
        setBrands(brandNames);
      });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handlePriceChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange(value as [number, number]);
      onPriceChange(value as [number, number]);
    }
  };

  const handleSortChange = (option: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setSortOption(option);
    onSortChange(option);
  };

  return (
    <div className={styles.filters}>
      <div className={styles.categories}>
        <button
          className={selectedCategory === 'All' ? styles.selected : ''}
          onClick={() => handleCategoryClick('All')}
        >
          All
        </button>

        {categories.map(category => (
          <button
            key={category.id}
            className={selectedCategory === category.name ? styles.selected : ''}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className={styles.sortOptions} ref={dropdownRef}>
        <div
          className={styles.sortOption}
          onClick={() => toggleDropdown('Brand')}
        >
          Brand
          <span className={styles.arrow}>
            {openDropdown === 'Brand' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>

          <div
            className={`${styles.dropdownContent} ${styles.dropdownBrand} ${
              openDropdown === 'Brand' ? styles.dropdownContentVisible : ''
            }`}
          >
            {brands.map(brand => (
              <div className={styles.brandSortOption} key={brand} onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={(e) => handleBrandSelection(brand, e)}
                />
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div
          className={styles.sortOption}
          onClick={() => toggleDropdown('Price')}
        >
          Price
          <span className={styles.arrow}>
            {openDropdown === 'Price' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>

          <div
            className={`${styles.dropdownContent} ${
              openDropdown === 'Price' ? styles.dropdownContentVisible : ''
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <Slider
              className={styles.priceSortOption}
              range
              min={minPrice}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceChange}
            />

            <div className={`${styles.priceSortOption} ${styles.priceSortOptionNumbers}`}>
              <span className={styles.priceSortOptionNumber}>${priceRange[0]}</span>
              <span>-</span>
              <span className={styles.priceSortOptionNumber}>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <div
          className={styles.sortOption}
          onClick={() => toggleDropdown('Sort By')}
        >
          Sort By
          <span className={styles.arrow}>
            {openDropdown === 'Sort By' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>

          <div
            className={`${styles.dropdownContent} ${
              openDropdown === 'Sort By' ? styles.dropdownContentVisible : ''
            }`}
          >
            {['Release Date: Desc', 'Release Date: Asc', 'Price: Desc', 'Price: Asc'].map(option => (
              <div
                className={styles.sortBySortOption}
                key={option}
                style={{ color: sortOption === option ? 'red' : 'black' }}
                onClick={(e) => handleSortChange(option, e)}
              >
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
