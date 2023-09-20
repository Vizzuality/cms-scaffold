# DO allows to have only one container registry per account
# skip this action if registry already exists
module "container_registry" {
  source = "./modules/container_registry"

  registry_name      = var.container_registry_name
  do_region          = var.do_region
}

resource "random_password" "api_token_salt" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "admin_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "transfer_token_salt" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "random_password" "jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

locals {
  staging_cms_env = {
    HOST                = "0.0.0.0"
    PORT                = 1337
    APP_KEYS            = "toBeModified1,toBeModified2"
    API_TOKEN_SALT      = random_password.api_token_salt.result
    ADMIN_JWT_SECRET    = random_password.admin_jwt_secret.result
    TRANSFER_TOKEN_SALT = random_password.transfer_token_salt.result
    JWT_SECRET          = random_password.jwt_secret.result
    CMS_URL             = "${module.staging.app_url}/cms/"

    # Database
    DATABASE_CLIENT                  = "postgres"
    DATABASE_HOST                    = module.staging.postgresql_host
    DATABASE_PORT                    = module.staging.postgresql_port
    DATABASE_NAME                    = var.postgres_db_name
    DATABASE_USERNAME                = module.staging.postgresql_username
    DATABASE_PASSWORD                = module.staging.postgresql_password
    DATABASE_SSL                     = true
    DATABASE_SSL_REJECT_UNAUTHORIZED = false

  }
  staging_client_env = {
    NEXT_PUBLIC_URL              = module.staging.app_url
    NEXT_PUBLIC_ENVIRONMENT      = "production"
    NEXT_PUBLIC_API_URL          = "${module.staging.app_url}/cms/api"
    NEXT_PUBLIC_GA_TRACKING_ID   = var.ga_tracking_id
    NEXT_PUBLIC_MAPBOX_API_TOKEN = var.mapbox_api_token
    LOG_LEVEL                    = "info"
  }
}

module "github_values" {
  source     = "./modules/github_values"
  repo_name  = var.repo_name
  secret_map = {
    STAGING_CMS_ENV_FILE            = join("\n", [for key, value in local.staging_cms_env : "${key}=${value}"])
    STAGING_CLIENT_ENV_FILE         = join("\n", [for key, value in local.staging_client_env : "${key}=${value}"])
  }
}

# can be run only after container registry is created and it contains docker images
# provide correct docker image tag during creation of app
# docker images should be automatically build and pushed to docker registry by CI/CD
module "staging" {
  source                = "./modules/env"
  project_name          = var.project_name
  environment           = "staging"
  do_region             = var.do_region
  postgres_size         = var.postgres_size
  postgres_db_name      = var.postgres_db_name
  do_app_instance       = var.do_app_instance
  do_app_instance_count = var.do_app_instance_count
  do_app_image_tag      = var.do_app_image_tag
}
