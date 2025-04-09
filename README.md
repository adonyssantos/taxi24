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

### 3. Add the `.env` file

For development mode, you can use the `.env.example`. This is only for development propuse, but for production it's recommended to change it for a more secure values.

You have to options:

1. Execute the command `cp .env.example .env` to create the env file from the example file.
2. Or create the file manually and copy the variables.

```env
# App environment mode
NODE_ENV=development

# PostgreSQL credentials
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_USER=taxi24
POSTGRES_PASSWORD=taxi24
POSTGRES_DB=taxi24

```

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
