locals {
  frontend_lb_url    = "https://${local.domain}"
  cms_lb_url         = "https://${local.domain}/${var.backend_path_prefix}/"
  api_lb_url         = "https://${local.domain}/${var.backend_path_prefix}/api/"
  # to test while DNS not set up
  # frontend_lb_url    = module.frontend_cloudrun.cloudrun_service_url
  # cms_lb_url         = "${module.backend_cloudrun.cloudrun_service_url}/"
  # api_lb_url         = "${module.backend_cloudrun.cloudrun_service_url}/api/"
}

# Preparation of variable / secret maps for the github_values module
locals {
  # firstly, the variables / secrets which are used by the GH workflow itself  
  action_variable_map_with_unprefixed_keys = {}
  action_secret_map_with_unprefixed_keys = {
    "GCP_SA_KEY" = base64decode(google_service_account_key.deploy_service_account_key.private_key)
    "PROJECT_NAME" = var.project_name
    "CMS_REPOSITORY" = module.backend_gcr.repository_name
    "CLIENT_REPOSITORY" = module.frontend_gcr.repository_name
    "CMS_SERVICE" = module.backend_cloudrun.name
    "CLIENT_SERVICE" = module.frontend_cloudrun.name
  }
  # those need to have their names prefixed with the environment name, so as to be able to differentiate between staging and production
  # could be achieved using GH environments as well, which would be a good alternative flow, but it is not available in all GH plans
  action_variable_map = {
    for key, value in local.action_variable_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_${key}" => value
  }
  action_secret_map = {
    for key, value in local.action_secret_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_${key}" => value
  }

  # secondly, the variables / secrets which are used by the client / cms and need to be provided in the .env file when building the image
  # those need to be also prefixed with the target name, so as to be able to differentiate between client and cms
  # The names for those variables / secrets should follow the template:
  # (STAGING|PRODUCTION-)[CLIENT|CMS]-VARIABLE_NAME
  # - the first part of the name (environment) can be omitted if the variable / secret is the same for both environments
  # - the middle part of the name (target) cannot be omitted, it is used to decide in which .env file the variable / secret should be placed
  # Before placing them in the .env files, the environment and target prefixes are removed.
  client_variable_map_with_unprefixed_keys = {}
  client_secret_map_with_unprefixed_keys = {
    NEXT_PUBLIC_URL         = local.frontend_lb_url
    NEXT_PUBLIC_API_URL     = local.api_lb_url
    NEXT_PUBLIC_ENVIRONMENT = "production"
    LOG_LEVEL               = "info"
  }
  client_variable_map = {
    for key, value in local.client_variable_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_CLIENTENV_${key}" => value
  }
  client_secret_map = {
    for key, value in local.client_secret_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_CLIENTENV_${key}" => value
  }

  cms_variable_map_with_unprefixed_keys = {}
  cms_secret_map_with_unprefixed_keys = {
    HOST = "0.0.0.0"
    PORT = 1337
    APP_KEYS = join(
      ",",
      [
        base64encode(random_password.app_key.result),
        base64encode(random_password.app_key.result)
      ]
    )
    API_TOKEN_SALT      = random_password.api_token_salt.result
    ADMIN_JWT_SECRET    = random_password.admin_jwt_secret.result
    TRANSFER_TOKEN_SALT = random_password.transfer_token_salt.result
    JWT_SECRET          = random_password.jwt_secret.result

    CMS_URL             = local.cms_lb_url

    DATABASE_CLIENT   = "postgres"
    DATABASE_HOST     = module.database.database_host
    DATABASE_NAME     = module.database.database_name
    DATABASE_USERNAME = module.database.database_user
    DATABASE_PASSWORD = module.database.database_password
    DATABASE_SSL      = false
  }
  cms_variable_map = {
    for key, value in local.cms_variable_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_CMSENV_${key}" => value
  }
  cms_secret_map = {
    for key, value in local.cms_secret_map_with_unprefixed_keys :
      "TF_${upper(var.environment)}_CMSENV_${key}" => value
  }
}

module "github_values" {
  source    = "../github_values"
  repo_name = var.github_project
  secret_map = merge(
    local.action_secret_map,
    local.client_secret_map,
    local.cms_secret_map
  )
  variable_map = merge(
    local.action_variable_map,
    local.client_variable_map,
    local.cms_variable_map
  )
}
