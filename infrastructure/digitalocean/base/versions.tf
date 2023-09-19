##
# Terraform configuration for creating environment of this project on DO infrastructure
# This configuration should be run at following steps:
# 1. Create container registry --> can be skipped in case your account already has one
# 2. Create postgresql database and update github secrets with postgresql credentials
# 3. Run CI/CD pipeline to build and push docker images to container registry
# 4. Create staging environment app --> use correct docker image tag
##

terraform {
  backend "s3" {
    endpoint                    = "DO_REGION.digitaloceanspaces.com"
    bucket                      = "PROJECT_NAME-terraform-state"
    region                      = "us-west-1"
    key                         = "state"
    skip_credentials_validation = true
    skip_metadata_api_check     = true
  }

  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.30"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
  spaces_access_id = var.do_spaces_client_id
  spaces_secret_key = var.do_spaces_secret_key
}
