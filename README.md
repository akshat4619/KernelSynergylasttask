# Advanced API with CI/CD Pipeline

## Objective

This project involves building a RESTful API with CRUD operations for **Users**, **Products**, and **Orders**. The API is containerized using Docker and deployed through an automated CI/CD pipeline. The pipeline builds, tests, and deploys the API to a staging environment.

## Features

- **CRUD Operations**: Implemented for Users, Products, and Orders.
- **Authentication**: Basic authentication using JWT tokens or API keys.
- **API Documentation**: Generated using tools like Swagger/Postman.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSql
- **Authentication**: JWT tokens/API keys
- **Containerization**: Docker
- **CI/CD**: GitHub Actions 

---

## Documentation

### API Endpoints

- **Users**
  - **GET** `/users`: Fetch all users.
  - **GET** `/users/{id}`: Fetch a single user by ID.
  - **POST** `/users`: Create a new user.
  - **PUT** `/users/{id}`: Update a user's information.
  - **DELETE** `/users/{id}`: Delete a user by ID.

- **Products**
  - **GET** `/products`: Fetch all products.
  - **GET** `/products/{id}`: Fetch a single product by ID.
  - **POST** `/products`: Create a new product.
  - **PUT** `/products/{id}`: Update a product's information.
  - **DELETE** `/products/{id}`: Delete a product by ID.

- **Orders**
  - **GET** `/orders`: Fetch all orders.
  - **GET** `/orders/{id}`: Fetch a single order by ID.
  - **POST** `/orders`: Create a new order.
  - **PUT** `/orders/{id}`: Update an order's status.
  - **DELETE** `/orders/{id}`: Delete an order by ID.

### Data Models

1. **User**
   - `id`: unique identifier (auto-generated)
   - `name`: string
   - `email`: string (unique)
   - `password`: string

2. **Product**
   - `id`: unique identifier (auto-generated)
   - `name`: string
   - `price`: number
   - `description`: string

3. **Order**
   - `id`: unique identifier (auto-generated)
   - `userId`: foreign key (references `Users`)
   - `productId`: foreign key (references `Products`)
   - `quantity`: number

---

## Running Locally Using Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/advanced-api.git
   cd advanced-api
   Build the Docker container:

bash
docker-compose up --build
This will build the Docker image and start the containers for both the API and the mock database.

Access the API at http://localhost:5000.

CI/CD Pipeline Configuration
GitHub Actions
The CI/CD pipeline is configured using GitHub Actions. The pipeline triggers on every push to the main branch.

Pipeline Stages
Build:

Build the Docker image for the API.
Push the image to Docker Hub.
Test:

Run automated unit and integration tests using Mocha or Jest.

Deploy:

Deploy the Docker image to a staging environment (via Docker Compose).

