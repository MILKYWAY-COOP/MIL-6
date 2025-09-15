# Express.js TypeScript Postgres Docker API

A backend API built with Express.js, TypeScript, PostgreSQL, and Docker.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)

## Features

- **Express.js Server**: RESTful API with TypeScript for type safety
- **PostgreSQL Database**: Relational database with Prisma ORM
- **Docker Support**: Containerized development and deployment
- **Logging**: HTTP request logging (Morgan) and structured application logging (Winston)
- **Testing**: Comprehensive test suite with Jest and Supertest
- **Validation**: Input validation for user data (name, email, password, date of birth)

## Prerequisites

- Node.js (v20 or higher)
- Yarn package manager
- Docker and Docker Compose
- Git

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd part-1
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Set up the database:**
   ```bash
   # Start PostgreSQL with Docker Compose
   docker-compose up -d db

   # Run database migrations
   npx prisma migrate dev

   # Seed the database (optional)
   npx prisma db seed
   ```

## Usage

### Development

1. **Start the development server:**
   ```bash
   yarn dev
   ```
   The API will be available at `http://localhost:3000`

2. **View logs:**
   - HTTP requests are logged via Morgan
   - Application events are logged via Winston

### Production

1. **Build the project:**
   ```bash
   yarn build
   ```

2. **Start the server:**
   ```bash
   yarn start
   ```

### Docker

1. **Run with Docker Compose:**
   ```bash
   docker-compose up --build
   ```
   This starts both the API and PostgreSQL database.

## API Endpoints

The API provides user management functionality. All endpoints return JSON responses.

### Base URL
```
http://localhost:3000
```

### Health Check
- **GET /** - Check API and database connectivity
  - Response: `{ "message": "API is running!", "dbTime": "2025-09-15T..." }`

### Users

#### Create User
- **POST /users**
  - **Request Body:**
    ```json
    {
      "user_name": "johndoe",
      "date_of_birth": "1990-01-01",
      "email": "john@example.com",
      "password": "Password123"
    }
    ```
  - **Validation Rules:**
    - `user_name`: 5-16 characters, required
    - `date_of_birth`: Valid date string, user must be 18+
    - `email`: Valid email format, unique
    - `password`: 5-16 characters, at least 2 digits, 1 uppercase letter
  - **Success Response (201):**
    ```json
    {
      "id": 1,
      "user_name": "johndoe",
      "date_of_birth": "1990-01-01T00:00:00.000Z",
      "email": "john@example.com"
    }
    ```
  - **Error Responses:**
    - `400`: `{ "error": "INVALID_NAME" }` (or other validation errors)
    - `400`: `{ "error": "DUPLICATE_EMAIL" }`

#### Get All Users
- **GET /users**
  - **Response (200):**
    ```json
    [
      {
        "id": 1,
        "user_name": "johndoe",
        "date_of_birth": "1990-01-01T00:00:00.000Z",
        "email": "john@example.com"
      }
    ]
    ```

#### Get User by ID
- **GET /users/:id**
  - **Parameters:** `id` (integer)
  - **Success Response (200):** User object (same as above)
  - **Error Response (404):** `{ "error": "USER_NOT_FOUND" }`

#### Update User
- **PUT /users/:id**
  - **Parameters:** `id` (integer)
  - **Request Body:** Same as POST (all fields required)
  - **Success Response (200):** Updated user object
  - **Error Response (404):** `{ "error": "User not found" }`

#### Delete User
- **DELETE /users/:id**
  - **Parameters:** `id` (integer)
  - **Success Response (204):** No content
  - **Error Response (404):** `{ "error": "User not found" }`

## Testing

Run the comprehensive test suite:

```bash
yarn test
```

Tests cover:
- Valid and invalid user creation scenarios
- CRUD operations for users
- Input validation
- Error handling

## Project Structure

```
/
├── src/
│   ├── controllers/
│   │   └── userController.ts    # User CRUD logic
│   ├── db.ts                    # Prisma client setup
│   ├── index.ts                 # Express app setup
│   ├── logger.ts                # Winston logger config
│   ├── routes/
│   │   └── users.ts             # User routes
│   └── types.ts                 # TypeScript types
├── __tests__/
│   └── users.test.ts            # API tests
├── prisma/
│   ├── schema.prisma            # Database schema
│   ├── seed.ts                  # Database seeding
│   └── migrations/              # DB migrations
├── Dockerfile                   # API container
├── docker-compose.yml           # Multi-container setup
├── package.json
├── tsconfig.json
└── README.md
```

## Deployment

### Docker Deployment

1. **Build and run:**
   ```bash
   docker-compose up --build -d
   ```

2. **Check logs:**
   ```bash
   docker-compose logs -f api
   ```

### Environment Variables

Create a `.env` file for production:

```
DATABASE_URL="postgresql://user:password@host:5432/dbname"
PORT=3000
```

