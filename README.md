# 🧠 Express.js REST API – Products

This is a simple RESTful API built with Express.js for managing a list of products. It demonstrates CRUD operations, middleware usage, error handling, and advanced features like filtering, pagination, and search.

## 🚀 How to Run the Server

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <your-project-folder>
```

## Install dependencies

```bash
npm install
```

## Start the server

```bash
npm start

# or

node server.js
```

## API Documentation

## Base URL

```bash
http://localhost:3000/api/products
```

## GET /api/products

Fetch all products. Supports filtering, pagination, and search.

Query Parameters:

category: Filter by category

page: Page number for pagination

limit: Number of items per page

search: Search by product name

Response:

```bash
[
   {
      "id": "1",
      "name": "Laptop",
      "description": "A gaming laptop",
      "price": 1200,
      "category": "Electronics",
      "inStock": true
   }
]
```

## GET /api/products/:id

Get a product by ID.

Response:

```bash
{
   "id": "1",
   "name": "Laptop",
   "description": "A gaming laptop",
   "price": 1200,
   "category": "Electronics",
   "inStock": true
}
```

## POST /api/products

Create a new product.

Request Body:

```bash
{
   "name": "Headphones",
   "description": "Noise-cancelling",
   "price": 200,
   "category": "Electronics",
   "inStock": true
}
```

Response:

```bash
{
   "id": "2",
   "name": "Headphones",
   "description": "Noise-cancelling",
   "price": 200,
   "category": "Electronics",
   "inStock": true
}
```

## PUT /api/products/:id

Update an existing product.

Request Body:

```bash
{
   "name": "Headphones",
   "description": "Wireless and noise-cancelling",
   "price": 250,
   "category": "Electronics",
   "inStock": true
}
```

Response:

```bash
{
   "id": "2",
   "name": "Headphones",
   "description": "Wireless and noise-cancelling",
   "price": 250,
   "category": "Electronics",
   "inStock": true
}
```

## DELETE /api/products/:id

Delete a product by ID.

Response:

```bash
{ "message": "Product deleted successfully." }
```

## GET /api/products/stats

Get product statistics (e.g., count by category)

Response:

```bash
{
   "Electronics": 5,
   "Clothing": 2,
   "Books": 3
}
```

## 🔐 Middleware Features

Logger: Logs request method, URL, and timestamp

Authentication: Requires API key in headers (x-api-key)

Validation: Checks required fields on POST/PUT

Error Handling: Graceful error messages and status codes
