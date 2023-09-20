# Architecture

The project is composed of the following components:
- cms: a headless Strapi CMS that provides a REST API to manage the content of the website
- client: a Next.js application that consumes the CMS API and renders the website

Both are deployed on DigitalOcean using the following services:
- Container Registry: to store the Docker images
- Spaces: to store the terraform state and optionaly the CMS media files
- Managed Database: to host the database
- Platform Apps: to host the Docker images of the CMS and the client

# Deployment

The deployment is automated using a GH Action that builds the Docker images and deploys them to DigitalOcean Platform App.

## Requirements

The following secrets must be defined in the GH repository:
- `DIGITALOCEAN_ACCESS_TOKEN`: the DigitalOcean API token which allows GH to deploy the images to the Container Registry and update Platform Apps

# Infrastructure as Code

The resources required to deploy the solution are defined in the `infrastructure` folder. The infrastructure is defined using Terraform.

There are two Terraform projects in the `infrastructure` folder:
- state: to store the Terraform remote state in an Spaces bucket
- base: to deploy the infrastructure, using the remote state stored in the Spaces bucket

The `state` project must be deployed first, and then the `base` project can be deployed.

## Requirements

All terraform variables needs to be properly setup including the following:
 - `do_token`: DigitalOcean API token
 - `do_spaces_client_id`: DigitalOcean Spaces key
 - `do_spaces_secret_key`: DigitalOcean Spaces secret

`GITHUB_TOKEN` and `GITHUB_OWNER` must be defined in the environment when Terraform code is applied to allow it to update secrets in the GH repository.
