# Road Trip!

Your ultimate travel companion.

## Getting Started

This application is dockerized. To run it, execute the following command in the root directory of the project:

`docker-compose up -d --force-recreate --build`

Make sure that you have Docker installed before running the command.

Please ensure that Docker is installed before running the command.

## Prerequisites

- This application requires a PostgreSQL database.
- The database export can be found at `./db/dbexport.pgsql` and it can be restored using the `psql` command.
- This application utilizes Traefik as a reverse proxy tool and for domain/subdomain management.
- An `.env.local` file is required inside the `app` directory for it to properly function. As this file contains sensitive information, it is not included in the repository. Please request it from your collaborators.

## API Documentation

The API documentation can be found in the `app/docs` folder and consists of a collection of static HTML files. These files can be served using any web server.

## License

This project is licensed under the MIT License, which is a permissive open-source software license. It allows for unlimited modification, distribution, and private use of the software, provided that the license and copyright notice is included in all copies or substantial portions of the software.
