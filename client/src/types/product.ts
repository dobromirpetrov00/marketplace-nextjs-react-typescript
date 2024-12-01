export interface Product {
  id: string;
  product_name: string;
  category: string;
  price: number;
  brand: string;
  stock_quantity: number;
  release_date: string;
  description: string;
  selectible_option: SelectibleOption;
}

export interface SelectibleOption {
  option_type: string;
  option_name: string;
  option: number[];
}
