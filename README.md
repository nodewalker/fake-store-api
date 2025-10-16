# Fake Store API

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/nodewalker/fake-store-api)

A feature-rich, NestJS-based REST API that simulates an e-commerce backend. It provides a complete set of features including user authentication, product and category management, and a shopping cart system. This project is built with a focus on best practices and serves as an excellent learning resource for building scalable server-side applications with TypeScript, TypeORM, and creating automated API documentation workflows.

## Features

- **Authentication**: Secure user registration, login, and token refresh using JWT and Argon2 for password hashing.
- **Product Management**: Full CRUD operations for products, including multi-image uploads, advanced filtering, and sorting capabilities.
- **Category Management**: Create and manage a hierarchical category structure.
- **User & Cart**: User profile management (including avatar uploads) and a persistent shopping cart for each user.
- **API Documentation**: Automatically generated, detailed API documentation using Swagger and Widdershins.
- **Validation**: Robust request validation using `class-validator` and `class-transformer`.
- **Security**: Hardened with `helmet`, request rate-limiting, and global exception filtering for consistent error handling.
- **Logging**: Configured with `winston` for structured, rotating logs.

## Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [TypeORM](https://typeorm.io/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/)
- **API Specification**: [Swagger (OpenAPI)](https://swagger.io/)
- **Logging**: [Winston](https://github.com/winstonjs/winston)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or another package manager
- A running instance of PostgreSQL

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nodewalker/fake-store-api.git
    cd fake-store-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory by copying the example file:

    ```bash
    cp .env.dev .env
    ```

    Update the `.env` file with your local configuration, especially your database credentials and a secure `JWT_SECRET`.

    ```env
    # SERVER
    PORT=3000

    # DATABASE
    DB_HOST='localhost'
    DB_PORT=5432
    DB_USERNAME='your_postgres_user'
    DB_PASSWORD='your_postgres_password'
    DB_NAME='fake-store-api'

    # JWT
    JWT_SECRET='a_very_strong_and_long_secret_key'
    ```

4.  **Database Setup:**
    Ensure your PostgreSQL server is running and you have created a database with the name specified in your `.env` file (e.g., `fake-store-api`). The application uses TypeORM's `synchronize: true` feature for development, which will automatically create the database schema on startup.

## Running the Application

- **Development mode (with hot-reload):**

  ```bash
  npm run start:dev
  ```

  The server will start on the port specified in your `.env` file (default: `3000`).

- **Production mode:**
  First, build the project:
  ```bash
  npm run build
  ```
  Then, start the compiled application:
  ```bash
  npm run start:prod
  ```

## API Documentation

This repository includes a comprehensive, pre-generated API reference located in the `/docs` directory. You can browse the files directly on GitHub to understand all available endpoints, request parameters, and response models.

To regenerate the documentation after making changes to API controllers or DTOs, run the following command:

```bash
npm run generate:gitbook
```

This script will:

1.  Generate an up-to-date `swagger.json` file.
2.  Convert the OpenAPI specification into detailed Markdown files for each API resource.
3.  Organize the documentation structure and navigation in `docs/SUMMARY.md`.

## Running Tests

- **Unit Tests:**

  ```bash
  npm run test
  ```

- **End-to-End (E2E) Tests:**

  ```bash
  npm run test:e2e
  ```

- **Test Coverage:**
  ```bash
  npm run test:cov
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
