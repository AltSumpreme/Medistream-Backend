# Medistream Backend

This repository contains the backend source code for **Medistream**, a Medical Management Platform designed to streamline and modernize healthcare operations. The backend is built with [Hono](https://hono.dev/), utilizes [Prisma](https://www.prisma.io/) as its ORM, is Dockerized for seamless deployment, and includes [Husky](https://typicode.github.io/husky) to enforce code standards through Git hooks. API documentation is provided via Swagger.

## Features

- Fast and lightweight backend built with Hono
- Modular, service-oriented architecture
- RESTful API with clear route organization
- Prisma ORM with PostgreSQL for efficient database access
- Docker support for local development and production deployment
- Husky integration for pre-commit checks and code quality enforcement
- Auto-generated API documentation using Swagger

## Tech Stack

| Technology | Purpose            |
| ---------- | ------------------ |
| Hono       | Web framework      |
| Prisma     | ORM for PostgreSQL |
| Docker     | Containerization   |
| Husky      | Git hooks          |
| TypeScript | Static typing      |
| Swagger    | API documentation  |

## Project Structure

```
medistream-backend/
├── prisma/               # Prisma schema and migrations
├── src/
│   ├── routes/           # Route definitions
│   ├── controllers/      # Controller logic
│   ├── services/         # Business and DB logic
│   ├── middleware/       # Custom middleware functions
│   └── utils/            # Utility functions
├── swagger/              # Swagger config and specs
├── .husky/               # Husky Git hooks
├── Dockerfile            # Docker image config
├── docker-compose.yml    # Docker Compose services
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (if running locally)
- PostgreSQL (if running without Docker)

### Running with Docker

```bash
git clone https://github.com/your-username/medistream-backend.git
cd medistream-backend

# Build and run the containers
docker-compose up --build
```

### Running Locally

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Push the Prisma schema to the database
npx prisma db push

# Start the development server
npm run dev
```

## Swagger Documentation

After starting the server, you can access the Swagger UI for API documentation at:

```
http://localhost:<PORT>/docs
```

Ensure that your Swagger setup correctly maps to this route.

## Git Hooks with Husky

This project uses Husky to enforce code quality through Git hooks:

- **pre-commit**: Lint and format staged files

## Environment Variables

Make sure to create a `.env` file in the root directory. Refer to `.env.example` for the necessary configuration.

## License

This project is licensed under the MIT License.
