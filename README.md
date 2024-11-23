
# Bookshop Backend

This is the backend service for a bookshop application built with **Node.js**, **Express**, and **MongoDB**. It provides a RESTful API to manage books, orders, and customers. The backend includes features such as managing book inventory, placing orders, calculating revenue, and more. The system ensures an efficient and scalable way to handle data related to books and orders.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Books](#books)
  - [Orders](#orders)
- [Vercel Link](#vercel-link)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The **Bookshop Backend** is designed to interact with a MongoDB database, storing and managing book and order data. It allows users to perform CRUD operations on books and manage customer orders efficiently. It also provides the functionality to calculate total revenue generated from orders.

## Tech Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing book and order data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Zod**: Type-safe schema validation for API data validation.
- **TypeScript**: Superset of JavaScript for static type-checking and enhanced development experience.
- **CORS**: Middleware for handling cross-origin requests.
- **ESLint** and **Prettier**: Code linting and formatting tools to maintain code quality.
- **Jest**: Testing framework for unit and integration tests.

## Features

- **Book Management**: 
  - Add, update, and delete books in the inventory.
  - View all books or search for books by ID.
  - Track the quantity of each book available in the inventory.

- **Order Management**:
  - Place new orders specifying the book, quantity, and customer email.
  - Retrieve all orders placed by customers.
  - Calculate the total revenue from all orders.

- **Revenue Calculation**:
  - Get total revenue from all placed orders.
  
- **Validation and Error Handling**:
  - Ensure type-safe data handling using **Zod** for validation.
  - Proper error messages are returned for invalid inputs or missing data.

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/SAMIUL-35/bookshop-backend
   ```

2. Navigate into the project directory:
   ```bash
   cd bookshop-backend
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Build the TypeScript files into JavaScript:
   ```bash
   npm run build
   ```

5. Run the application in development mode with hot-reloading:
   ```bash
   npm run start:dev
   ```

6. To run the application in production mode, use:
   ```bash
   npm start
   ```

## Usage

Once the project is up and running, you can access the API endpoints to manage books and orders.

### Testing

You can write and run tests for the application using **Jest**. To run tests:

```bash
npm run test
```

## API Endpoints

### Books

| Method | Endpoint                  | Description                        | Request Body                                                               | Response Body                                                                 |
|--------|---------------------------|------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `POST` | `/api/products`            | Add a new book to the inventory    | `{ "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` | `{ "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` |
| `GET`  | `/api/products`            | Get all books in the inventory     | None                                                                        | `[ { "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }, ... ]` |
| `GET`  | `/api/products/:productId` | Get a single book by its ID        | None                                                                        | `{ "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` |
| `PUT`  | `/api/products/:productId` | Update a book's details by ID      | `{ "title": "Updated Title", "author": "Updated Author", "price": 22.99, "quantity": 50 }` | `{ "_id": "bookId", "title": "Updated Title", "author": "Updated Author", "price": 22.99, "quantity": 50 }` |
| `DELETE`| `/api/products/:productId` | Delete a book from the inventory by ID | None | `{}` (empty response) |

### Orders

| Method | Endpoint                  | Description                        | Request Body                                                               | Response Body                                                                 |
|--------|---------------------------|------------------------------------|-----------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| `POST` | `/api/orders`             | Create a new order                 | `{ "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }` | `{ "_id": "orderId", "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }` |
| `GET`  | `/api/orders`             | Get all orders                     | None                                                                        | `[ { "_id": "orderId", "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }, ... ]` |
| `GET`  | `/api/orders/revenue`     | Get total revenue from orders      | None                                                                        | `{ "totalRevenue": 500.00 }` |

## Vercel Link

The live version of the backend is deployed on Vercel. You can access it [here](https://bookshop-backend-psi.vercel.app).

## Contributing

Contributions are always welcome! Please fork the repository, create a new branch, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
