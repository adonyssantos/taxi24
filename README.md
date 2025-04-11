# Taxi24

## Main technologies

- Nest.js
- TypeScript
- TypeORM
- PostgreSQL (running on Docker)

## Requirements

The following requirements are mandatory in order to run the project locally:

1. Git
2. Node.js (v22.14.0 recommended)
3. Docker & Docker Compose

## Instructions to run locally

### 1. Clone the repo

To clone the repo use the following command:

```sh
git clone https://github.com/adonyssantos/taxi24.git
cd taxi24
```

### 2. Install the dependencies

Install the dependencies with NPM:

```sh
npm install
```

### 3. Add the `.env` files

For development mode, you can use the `.env.example` and `.env.e2e.example`. This is only for development propuse, but for production it's recommended to change it for a more secure values.

To create the needed env variables, execute the following commands:

```sh
cp .env.example .env
cp .env.e2e.example .env.e2e
```

This will create the `.env` and `.env.e2e` files with the default values. You can change them as needed.

**Note:** The `.env` file is used for development and the `.env.e2e` file is used for end-to-end testing.

### 4. Run locally with Docker

For development, this project runs completely on Docker. This means that you don't need to install PostgreSQL or any other dependencies on your machine.

```sh
docker compose up
```

**Note:** Check that the ports `3000` and `5432` are not being used by other services. If they are, you can change the ports in the `docker-compose.yml` file.

### 5. Access the application

After running the api, you can access it at `http://localhost:3000`. 

Additionally, this project includes Swagger for API documentation, which is available at `http://localhost:3000/api/docs`.

### 6. Run the tests

This project has unit tests for the services and end-to-end tests for the application. To run the tests, you can use the following commands:

**To run the unit tests:**

```sh
npm run test
```

**To run the end-to-end tests:**

```sh
npm run test:e2e
```

**Note:** To run the end-to-end tests, you need to have the application running in development mode. This is what you did in the 4th step.
