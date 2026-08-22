# E-Commerce REST API

A RESTful e-commerce backend built with Node.js , Express.js , MongoDB ,
And JWT authentication

## Features

- User authentication with JWT
- Role-based authorization
- Product management
- Product Search, filtering, and pagination
- Shopping Cart
- Order management
- Stock management
- Admin order management

## Roles

- User  : access to personal cart and orders
- Admin : product management and order management

## API EndPoints

### Authentication

| Method |     EndPoint    |    Description     |Auth|
|--------|-----------------|--------------------|----|
|  Post  |`/users/register`| Register a new user| No |
|  Post  | `/users/login`  |    Login user      | No |

### Products

| Method |     EndPoint    |    Description     | Auth  |
|--------|-----------------|--------------------|-------|
|   GET  |   `/products`   |  Get all products  |   NO  |
|   GET  | `/products/:id` |  Get product by ID |   No  |
|  POST  |   `/products`   |   Create product   | admin |
|   PUT  | `/products/:id` |   Update product   | admin | 
| DELETE | `/products/:id` |   Delete product   | admin |

### Product Query Parameters

- ( You Can Combine The Filters)
* GET /products?page=1&limit=10
* GET /products?search=phone
* GET /products?category=electronics
* GET /products?minPrice=100&maxPrice=500

### Cart

| Method |     EndPoint     |      Description       | Auth |
|--------|------------------|------------------------|------|
|  POST  |     `/cart`      |  Add product to cart   | user |
|   GET  |     `/cart`      |Get current user's cart | user |
|  PATCH |     `/cart`      |  Update cart quantity  | user |
| DELETE |`/cart/:productId`|Remove product from cart| user |

### Orders

| Method |     EndPoint       |       Description       | Auth  |
|--------|--------------------|-------------------------|-------|
|  POST  |     `/orders`      |     create an order     | user  |
|   GET  |     `/orders`      |Get current user's orders| user  |
|   GET  |   `/orders/:id`    |    Get specific order   | user  |
| DELETE |   `/orders/:id`    |     Cancel an order     | user  |
|   GET  |  `/orders/admin`   |      Get all orders     | admin |
|  PATCH |`/orders/:id/status`|    Update order status  | admin |

## authentication

Protected endpoints require a JWT token.
Authorization: Bearer YOUR_TOKEN
