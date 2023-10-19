# CMS scaffold: Strapi + Next JS + Mapbox GL

This is a scaffold for an CMS, api and a client app. It contains the next:

- A client based on Next JS:
  - Including a map (MapboxGL) with layers and legend
  - Dataset and layer management
  - An default layout of sidebar and map
- CMS for data management based on Strapi CMS:
  - layers
  - datasets
  - legend
  - metadata
- API (REST) provided by Strapi CMS
- An infrastructure based on Docker and Terraform:
  - AWS deployment
  - Digital Ocean deployment

**This scaffold is only an example of how to develop an application with CMS, an API and a client app. Please adapt your project needs to this scaffold, or use it as a reference.**

## Getting started

The scaffold is divided in 4 directories:

- `./cms/`: [Strapi CMS](https://strapi.io/) with API included
- `./client/`: [Next JS](https://nextjs.org/) client app
- `./infrastructure/`: Terraform files for AWS and Digital Ocean


### Client

Go to the `client/` directory and install the dependencies:

```bash
yarn install
```

Copy the .env.example file to .env.local and fill in the NEXT_PUBLIC_API_URL field with the url of the API. (By default it's http://localhost:1337)

Add the NEXT_PUBLIC_MAPBOX_TOKEN field with the Mapbox token of the project. (You can get one [here](https://account.mapbox.com/access-tokens/))

Start the client with:

```bash
yarn dev
```

### Strapi CMS and API

For detailed instructions on how to run the Strapi CMS and API, please refer to the `cms/README.md` file.

#### Seeding data

To seed the database with some data, run:

```bash
yarn seed
```

You should now have sample data in the database.

### Types for API

We have configured [Orval](https://orval.dev/) to generate types for the API to be used on the client.

Go to the `client/` directory and follow the [Client](#client) and [Strapi](#strapi-cms-and-api) instructions.

Make sure the API was configured and it created a `./src/extensions/documentation/documentation/1.0.0/full_documentation.json` file.

And, to generate the types for the API, run:

```bash
yarn types
```

## Usage with Docker (recommended)

To run the app with docker, run:

```bash
docker-compose up --build
```

Open the app in http://localhost:3000 for the client and http://localhost:1337 for the CMS.

NOTE: Docker is recommended for development, but not for production (yet).
