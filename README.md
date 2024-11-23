# Bookshop Backend

This is the backend service for a bookshop application that manages books, orders, and customers. The backend is built with Node.js, Express, and MongoDB, and it provides a REST API for managing books and handling orders. It supports features such as adding books, updating inventory, placing orders, and calculating revenue.

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Installation](#installation)

- [API Endpoints](#api-endpoints)
  - [Books](#books)
  - [Orders](#orders)

  -vercel link

## Project Overview

The Bookshop Backend is a RESTful API service that interacts with a MongoDB database to store information about books and orders. The application allows users to:

- Add new books to the inventory.
- Retrieve a list of all books or a single book by ID.
- Update book details or delete books from the inventory.
- Place orders, specifying the book, quantity, and customer email.
- Retrieve all orders and calculate the total revenue from orders.

## Tech Stack

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing book and order data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB.
- **Zod**: Type-safe schema validation.
- **TypeScript**: Superset of JavaScript for static type-checking and better development experience.
- **CORS**: Middleware for handling cross-origin requests.
- **ESLint** and **Prettier**: For code linting and formatting.



## Installation

Follow these steps to get the project up and running locally:

| Step | Command | Description |
|------|---------|-------------|
| 1 | `git clone https://github.com/SAMIUL-35/bookshop-backend` | Clone the repository to your local machine |
| 2 | `cd bookshop-backend` | Navigate into the project directory |
| 3 | `npm install` | Install the required dependencies |
| 4 | `npm run build` | Compile TypeScript files into JavaScript |
| 5 | `npm run start:dev` | Run the application in development mode with hot-reloading |
| 6 | `npm start` | Run the application in production mode |

## API Endpoints

The following table outlines all available API endpoints:

| Method | Endpoint | Description | Request Body | Response Body |
|--------|----------|-------------|--------------|---------------|
| `POST` | `/api/products` | Add a new book to the inventory | `{ "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` | `{ "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` |
| `GET` | `/api/products` | Get all books in the inventory | None | `[ { "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }, ... ]` |
| `GET` | `/api/products/:productId` | Get a single book by its ID | None | `{ "_id": "bookId", "title": "Book Title", "author": "Author Name", "price": 20.99, "quantity": 100, "category": "Fiction" }` |
| `PUT` | `/api/products/:productId` | Update a book's details by ID | `{ "title": "Updated Title", "author": "Updated Author", "price": 22.99, "quantity": 50 }` | `{ "_id": "bookId", "title": "Updated Title", "author": "Updated Author", "price": 22.99, "quantity": 50 }` |
| `DELETE` | `/api/products/:productId` | Delete a book from the inventory by ID | None | `{} (empty)` |
| `POST` | `/api/orders` | Create a new order | `{ "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }` | `{ "_id": "orderId", "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }` |
| `GET` | `/api/orders` | Get all orders | None | `[ { "_id": "orderId", "email": "customer@example.com", "product": "bookId", "quantity": 2, "totalPrice": 41.98 }, ... ]` |
| `GET` | `/api/orders/revenue` | Get the total revenue from orders | None | `{ "totalRevenue": 500.00 }` |
vercel link:`bookshop-backend-psi.vercel.app`
