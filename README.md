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

This project run completely with Docker on both, developmend and production mode.

**To execute on development mode (with hot reloading) run:**

```sh
docker compose -f docker-compose.dev.yml up
```

**Or to execute on production mode (final bundle) execute:**

```sh
docker compose -f docker-compose.production.yml up
```

Note: check that the ports `3000` and `5432` are not being used by other services. If they are, you can change the ports in the `docker-compose.dev.yml` and `docker-compose.production.yml` files.

### 5. Access the application

After running the application, you can access it at `http://localhost:3000` or to the PostgreSQL instance at `http://localhost:5432` using the credentials defined in the `.env` file.

### 6. Run the tests

This project have unit tests for the services and end-to-end tests for the application. To run the tests, you can use the following commands:

**To run the unit tests:**

```sh
npm run test
```

**To run the end-to-end tests:**

```sh
npm run test:e2e
```

**Note:** To run the end-to-end tests, you need to have the application running in development mode. You will do this in the 4th step.
