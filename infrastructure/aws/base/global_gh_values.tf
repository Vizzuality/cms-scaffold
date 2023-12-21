module "github_values" {
  source    = "./modules/github_values"
  repo_name = var.repo_name
  secret_map = {
    TF_AWS_REGION                      = var.aws_region
    TF_PROJECT_NAME                    = var.project_name
    TF_CMS_REPOSITORY_NAME             = module.cms_ecr.repository_name
    TF_CLIENT_REPOSITORY_NAME          = module.client_ecr.repository_name
    TF_PIPELINE_USER_ACCESS_KEY_ID     = module.iam.pipeline_user_access_key_id
    TF_PIPELINE_USER_SECRET_ACCESS_KEY = module.iam.pipeline_user_access_key_secret
    # STAGING_CMS_ENV_FILE            = join("\n", [for key, value in local.staging_cms_env : "${key}=${value}"])
    # STAGING_CLIENT_ENV_FILE         = join("\n", [for key, value in local.staging_client_env : "${key}=${value}"])
    # STAGING_DOMAIN                  = var.staging_domain
    # PRODUCTION_CMS_ENV_FILE         = join("\n", [for key, value in local.production_cms_env : "${key}=${value}"])
    # PRODUCTION_CLIENT_ENV_FILE      = join("\n", [for key, value in local.production_client_env : "${key}=${value}"])
    # PRODUCTION_DOMAIN               = var.production_domain
  }
  variable_map = {}
}
