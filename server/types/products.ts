interface product {
    id: string,
    product_name: string,
    category: string,
    price: number,
    brand: string,
    stock_quantity: number, 
    release_date: string,
    description: string,
    selectible_option: SelectibleOption | null,
}

interface Option {
    option_type: string, 
    option_name: string,
}

interface SelectibleOption extends Option {
    option: number | string
}

type ProductsResponse = product[]
type OptionsResponse = Option[]