# AccessHub
## An Accessibility Apps Directory and API

### About the Project
This NX monorepo includes the Angular frontend and Nest.js backend for Access Hub, a platform dedicated to listing and reviewing apps designed to support individuals with disabilities. 

The Nest.js API facilitates the storage, retrieval, and management of app data, reviews, and user interactions.

### Getting Started
#### Quickstart Requirements
- **[Docker](https://www.docker.com/)**: For quickstart of the required services
- **[Ory Network](https://www.ory.sh/network/)**: An Ory Network account and access token for authorization/authentication

To run the app locally, you must first configure  account and generate an API access token.
Start by running `npm install` in the root directory to install dependencies.

#### Docker
To start the required services (Postgres database) in Docker
```bash
  cd docker
  docker compose up
```

#### Ory Tunnel
```bash
  npm run ory-tunnel -- --project=[YOUR_ORY_NETWORK_PROJECT_SLUG]
```

#### Frontend
```bash
  nx serve web
```

#### Backend

Add a development.env file t apps/api/src/environments/development.env file to contain your API tokens/other details.
The API will not start without the required  

Example:
```
NODE_ENV=development

ORIGIN_URL=http://localhost:4200
PORT=3333

DATABASE_HOST=localhost
DATABASE_NAME=accesshub
DATABASE_USER=accesshub
DATABASE_PASSWORD=password
DATABASE_PORT=5432

ORY_CLIENT_URI=http://localhost:4000
ORY_ACCESS_TOKEN=YOUR_ORY_NETWORK_ACCESS_TOKEN

```

To run the API
```bash
  nx serve api
```

[Learn more about NX here](https://nx.dev)
