# CMS scaffold: Strapi + Next JS + Mapbox GL

This is a scaffold for an CMS, api and a client app. It contains the next:

- A client based on Next JS:
    - Including a map (MapboxGL) with layers and legend
    - Dataset and layer management
    - A default layout of sidebar and map
- CMS for data management based on Strapi CMS:
    - layers
    - datasets
    - legend
    - metadata
- API (REST) provided by Strapi CMS
- An infrastructure based on Docker and Terraform:
    - AWS deployment
    - GCP deployment
    - Digital Ocean deployment

**This scaffold is only an example of how to develop an application with CMS, an API and a client app. Please adapt your
project needs to this scaffold, or use it as a reference.**

## Getting started

The scaffold is divided in 3 directories:

- `./cms/`: [Strapi CMS](https://strapi.io/) with API included
- `./client/`: [Next JS](https://nextjs.org/) client app
- `./infrastructure/`: Terraform files for AWS, GCP and Digital Ocean

### Client

Go to the `client/` directory and install the dependencies:

```bash
yarn install
```

Copy the .env.example file to .env.local and fill in the NEXT_PUBLIC_API_URL field with the url of the API. (By default
it's http://localhost:1337)

Add the NEXT_PUBLIC_MAPBOX_TOKEN field with the Mapbox token of the project. (You can get
one [here](https://account.mapbox.com/access-tokens/))

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

Make sure the API was configured and it created
a `./src/extensions/documentation/documentation/1.0.0/full_documentation.json` file.

And, to generate the types for the API, run:

```bash
yarn types
```

### Infrastructure

The infrastructure folder contains Terraform files to deploy the application to AWS, GCP and Digital Ocean. It also
contains a `workflows` folder with GitHub Actions workflows to build docker images and deploy the application to the
respective environment.

#### Setting environment variables

For AWS and GCP, docker images are built in Github Actions. As such, environment variables for those images need to be
available to the Github Action runner - typically
through [Secrets](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
or [Variables](https://docs.github.com/en/actions/learn-github-actions/variables). There are two ways to set these
values on your Github repository so that they are available to the docker images built using this approach:

- Setting these through the included Terraform code.
- Setting these directly on the Github repository "Settings" page.

These approaches are functionally equivalent, but aim at supporting different use cases when setting these values. The
former approach privileges values that are tightly coupled with the overall infrastructure setup (e.g. database access
config), while the latter offers more flexibility and ease of use for values that require easier manipulation (directly
on the Github repository "Settings" page) and are less key to the infrastructure (e.g. frontend api key to access a 3rd
party service).

These Github Secrets/Variables follow a naming convention that identifies how they are meant to be managed:

- TF_(PRODUCTION|<UPPER CASE BRANCH NAME>)_[CLIENT_ENV|CMS_ENV]_<SECRET OR VARIABLE NAME> - managed by Terraform
- (PRODUCTION|<UPPER CASE BRANCH NAME>)_[CLIENT_ENV|CMS_ENV]_<SECRET OR VARIABLE NAME> - managed manually on the
  repository's "Settings" page

All Secrets/Variables that follow this naming convention will be automatically added to the respective docker image
build process, with their prefixes removed. If you need to add a new/custom secret/variable, and would like to do so
directly on the repository, be sure to name it accordingly. Likewise, manual changes done to TF_ prefixed values will be
overwritten by subsequent Terraform code, so do not modify those manually in the repository settings.

**Examples**

- STAGING_CLIENT_ENV_MY_API_KEY - goes into staging client `.env` as `MY_API_KEY`
- CLIENT_ENV_MY_OTHER_API_KEY - goes into client `.env` in all environments as `MY_OTHER_API_KEY`
- TF_CMS_ENV_DO_NOT_EDIT - goes into CMS `.env` in all environments as `DO_NOT_EDIT` but must not be edited in the
  Github "Settings" page - modify through Terraform if needed.

## Usage with Docker (recommended)

To run the app with docker, run:

```bash
docker-compose up --build
```

Open the app in http://localhost:3000 for the client and http://localhost:1337 for the CMS.

NOTE: Docker is recommended for development, but not for production (yet).


