
# JobPrep Backend

JobPrep Backend API - Plateforme IA de préparation aux entretiens

## Table of Contents

- [Requirements](#requirements)
- [Getting Started](#getting-started)
  - [Development with Docker](#development-with-docker)
  - [Manual Setup](#manual-setup)
- [Database Management](#database-management)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)

## Requirements

- Node.js (>= 18.0.0)
- npm (>= 8.0.0) or yarn
- Docker and Docker Compose (for containerized development)
- PostgreSQL (if not using Docker)

## Getting Started

### Development with Docker

The easiest way to get started is using Docker, which sets up both the PostgreSQL database and the NestJS application.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DreamJobPrep
   ```

2. Copy the environment example file:
   ```bash
   cp env.example .env
   ```
   
3. Run Prisma generate & migrations to set up the database schema:
   ```bash
   yarn db:generate
   ```

4. Start the Docker containers:
   ```bash
   yarn start:docker # This will run docker-compose under the hood
   ``` 
   or directly use:
   ```bash
   docker-compose -f docker-compose-local.yml up -d
   ```

4. The API will be available at http://localhost:3001 or the port specified in your `.env` file.

5. To stop the containers:
   ```bash
   yarn stop:docker
   ```

### Manual Setup

If you prefer to run the application without Docker:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd DreamJobPrep
   ```

2. Copy the environment example file:
   ```bash
   cp env.example .env
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Make sure you have PostgreSQL running and update the database connection details in your `.env` file.

5. Generate the Prisma client:
   ```bash
   yarn db:generate
   ```

6. Run database migrations:
   ```bash
   yarn db:migrate:dev
   ```

7. Start the application:
   ```bash
   yarn start:dev
   ```

## Database Management

The project uses Prisma as an ORM to interact with the PostgreSQL database.

### Prisma Schema

The Prisma schema is built from multiple files:
- `prisma/base.prisma`: Contains the base configuration
- `prisma/models/*.prisma`: Contains the model definitions

To build the schema:
```bash
yarn db:build:schema
```

### Database Operations

- Generate Prisma client: `yarn db:generate:schema`
- Create and apply migrations: `yarn db:migrate:dev`
- Reset the database: `yarn db:reset`
- Open Prisma Studio: `yarn db:studio`
- Seed the database: `yarn db:seed`
- Reset Docker database: `yarn db:dockerreset`

## Environment Variables

Key environment variables:

- `NODE_ENV`: Application environment (development, production)
- `PORT`: Port the server runs on
- `DATABASE_URL`: PostgreSQL connection string (used by Prisma)
- `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`: Database connection details

See the `.env.example` file for a complete list of environment variables.

## Available Scripts

- `yarn start:dev`: Start the application in development mode
- `yarn start:prod`: Start the application in production mode
- `yarn build`: Build the application
- `yarn test`: Run tests
- `yarn lint`: Run linting

## Role-Based Access Control (RBAC)

The backend implements simple RBAC based on the UserRole enum from Prisma. Use the @Roles decorator and RolesGuard together with the existing AuthGuard to protect routes by role.

Example (admin-only route):
- Add UseGuards(AuthGuard, RolesGuard)
- Add @Roles(UserRole.ADMIN)

Notes:
- AuthGuard attaches the authenticated user to request.user (with accountType).
- RolesGuard checks that request.user.accountType matches one of the allowed roles.
- The AdminController GET /admin endpoint is now restricted to ADMIN users.

### PostgreSQL Connection

To connect to the PostgreSQL Dev database using pgAdmin:

- Use the default postgres maintenance DB
- Host: localhost (if pgAdmin runs on your host)
- Port: 5442 (host)
- Username: postgres
- Password: postgres
- Maintenance DB: postgres
