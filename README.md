
# NextJS + React + Typescript Marketplace

This is a full-stack web marketplace built with **NextJS**, **React**, and **Typescript**. It provides a user-friendly interface for browsing and purchasing products. The user can browse products, add them to a cart, and proceed to checkout. The result from the checkout is random and the chance for failure is 20%.
## Prerequisites

Before running this project, ensure you have the following installed:

- **npm** (version 9.2.0 or later)
## Installation

#### Clone the repository:
```bash
git clone https://github.com/dobromirpetrov00/marketplace-nextjs-react-typescript.git
cd marketplace-nextjs-react-typescript
```

#### Install dependencies for the back end:
```bash
cd server
npm install
```

#### Install dependencies for the front end:
```bash
cd client
npm install
npm install --save-dev @types/css-modules
```
## Environment Variables

#### Create a `.env` file in the `client` folder with the following variable:
- `REACT_APP_API_URL=http://localhost:3010`

## In the project directory you can run:

#### To start the server:
```bash
cd server
npm run start
```

#### To start the web app:
```bash
cd client
npm start
```

#### Open the web app in your browser:
- Visit [http://localhost:3000](http://localhost:3000) to access the application.
## API endpoints:

- `GET /brands` - Get all brands
- `GET /categories` - Get all categories (excluding all)
- `GET /options` - Get all available options
- `GET /products` - Get all products sorted by release date - descending order
- `GET /products/:id` - Get data of a single product
- `POST /checkout` - Simulate checkout result, 20% chance for failure

## Web app endpoints

- `/` - Product Listing Page
- `/product/:id` - Product Details Page
- `/checkout` - Checkout Page
- `*` - Anything else - 404 Page

## Features
- `Product Listing` - Browse and search for products
- `Product Details` - View detailed information about a product
- `Cart` - Add products to your cart and proceed to checkout
- `Checkout` - Simulate a checkout process with a 20% chance of failure
## License

This project is licensed under the **9061** License.
