##
# Terraform configuration for creating environment of this project on DO infrastructure
# This configuration should be run at following steps:
# 1. Check if you already have existing container registry at your DO account --> if it exists, skip container_registry module
# 2. If container registry does not exist or it does not have any images uncomment FIRST RUN blocks at app module --> this is require to successfully create DO APP
# 3. Apply terraform code
# 4. Run CI/CD pipeline to build and push docker images to container registry
# 5. If you have uncommented FIRST RUN blocks at app module, comment them again and apply terraform code --> set docker image tags variable to correct values
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

# https://github.com/integrations/terraform-provider-github/issues/667#issuecomment-1182340862
provider "github" {
  #  owner = "Project"
}
