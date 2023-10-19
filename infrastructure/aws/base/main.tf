data "aws_vpc" "default_vpc" {
  default = true
}

data "aws_availability_zones" "all_available_azs" {
  state = "available"
}

# THIS IS TO FILTER THE AVAILABLE ZONES BY EC2 INSTANCE TYPE AVAILABILITY
# returns zone ids that have the requested instance type available
data "aws_ec2_instance_type_offerings" "azs_with_ec2_instance_type_offering" {
  filter {
    name   = "instance-type"
    values = [var.staging_ec2_instance_type, var.production_ec2_instance_type]
  }

  filter {
    name   = "location"
    values = data.aws_availability_zones.all_available_azs.zone_ids
  }

  location_type = "availability-zone-id"
}

# THIS IS TO FIND THE NAMES OF THOSE ZONES GIVEN BY IDS FROM ABOVE...
# because we need the names to pass to the staging module
data "aws_availability_zones" "azs_with_ec2_instance_type_offering" {
  filter {
    name   = "zone-id"
    values = sort(data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations)
  }
}

# THIS IS TO FILTER THE SUBNETS BY AVAILABILITY ZONES WITH EC2 INSTANCE TYPE AVAILABILITY
# so that we know which subnets can be passed to the beanstalk resource without upsetting it
data "aws_subnets" "subnets_with_ec2_instance_type_offering_map" {
  for_each = toset(
    data.aws_ec2_instance_type_offerings.azs_with_ec2_instance_type_offering.locations
  )

  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default_vpc.id]
  }

  filter {
    name   = "availability-zone-id"
    values = ["${each.value}"]
  }
}

locals {
  subnets_with_ec2_instance_type_offering_ids = sort([
    for k, v in data.aws_subnets.subnets_with_ec2_instance_type_offering_map : v.ids[0]
  ])
}

module "iam" {
  source = "./modules/iam"
}

#
# Staging secrets
#

resource "random_password" "staging_api_token_salt" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "staging_admin_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "staging_transfer_token_salt" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "staging_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "staging_nextauth_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "staging_app_key" {
  length           = 32
  special          = false
  numeric          = false
  override_special = "!#%&*()-_=+[]{}<>:?"
}

#
# Production secrets
#

resource "random_password" "production_api_token_salt" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "production_admin_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "production_transfer_token_salt" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "production_jwt_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "production_nextauth_secret" {
  length           = 32
  special          = true
  override_special = "!#%&*()-_=+[]{}<>:?"
}

resource "random_password" "production_app_key" {
  length           = 32
  special          = false
  numeric          = false
  override_special = "!#%&*()-_=+[]{}<>:?"
}

locals {
  staging_cms_env = {
    HOST                = "0.0.0.0"
    PORT                = 1337
    APP_KEYS            = random_password.staging_app_key.result
    API_TOKEN_SALT      = random_password.staging_api_token_salt.result
    ADMIN_JWT_SECRET    = random_password.staging_admin_jwt_secret.result
    TRANSFER_TOKEN_SALT = random_password.staging_transfer_token_salt.result
    JWT_SECRET          = random_password.staging_jwt_secret.result
    CMS_URL             = "https://${var.staging_domain}/cms/"

    # Database
    DATABASE_CLIENT                  = "postgres"
    DATABASE_HOST                    = module.staging.postgresql_host
    DATABASE_PORT                    = module.staging.postgresql_port
    DATABASE_NAME                    = module.staging.postgresql_db_name
    DATABASE_USERNAME                = module.staging.postgresql_username
    DATABASE_PASSWORD                = module.staging.postgresql_password
    DATABASE_SSL                     = true
    DATABASE_SSL_REJECT_UNAUTHORIZED = false

    AWS_REGION                = var.aws_region
    AWS_SES_DOMAIN            = var.staging_domain
    AWS_SES_ACCESS_KEY_ID     = module.staging.email_iam_user_access_key_id
    AWS_SES_ACCESS_KEY_SECRET = module.staging.email_iam_user_access_key_secret
  }
  staging_client_env = {
    NEXT_PUBLIC_URL            = "https://${var.staging_domain}"
    NEXT_PUBLIC_ENVIRONMENT    = "production"
    NEXT_PUBLIC_API_URL        = "https://${var.staging_domain}/cms/api"
    NEXT_PUBLIC_GA_TRACKING_ID = var.ga_tracking_id
    LOG_LEVEL                  = "info"
  }
  production_api_env = {
    HOST                = "0.0.0.0"
    PORT                = 1337
    APP_KEYS            = random_password.production_app_key.result
    API_TOKEN_SALT      = random_password.production_api_token_salt.result
    ADMIN_JWT_SECRET    = random_password.production_admin_jwt_secret.result
    TRANSFER_TOKEN_SALT = random_password.production_transfer_token_salt.result
    JWT_SECRET          = random_password.production_jwt_secret.result
    API_BASE_URL        = "https://${var.production_domain}/cms/"

    # Database
    DATABASE_CLIENT                  = "postgres"
    DATABASE_HOST                    = module.production.postgresql_host
    DATABASE_PORT                    = module.production.postgresql_port
    DATABASE_NAME                    = module.production.postgresql_db_name
    DATABASE_USERNAME                = module.production.postgresql_username
    DATABASE_PASSWORD                = module.production.postgresql_password
    DATABASE_SSL                     = true
    DATABASE_SSL_REJECT_UNAUTHORIZED = false

    AWS_REGION                = var.aws_region
    AWS_SES_DOMAIN            = var.production_domain
    AWS_SES_ACCESS_KEY_ID     = module.production.email_iam_user_access_key_id
    AWS_SES_ACCESS_KEY_SECRET = module.production.email_iam_user_access_key_secret
  }
  production_client_env = {
    NEXT_PUBLIC_URL            = "https://${var.production_domain}"
    NEXT_PUBLIC_ENVIRONMENT    = "production"
    NEXT_PUBLIC_API_URL        = "https://${var.production_domain}/cms/api"
    NEXT_PUBLIC_GA_TRACKING_ID = var.ga_tracking_id
    LOG_LEVEL                  = "info"
  }
}

module "github_values" {
  source     = "./modules/github_values"
  repo_name  = var.repo_name
  secret_map = {
    PIPELINE_USER_ACCESS_KEY_ID     = module.iam.pipeline_user_access_key_id
    PIPELINE_USER_SECRET_ACCESS_KEY = module.iam.pipeline_user_access_key_secret
    CMS_REPOSITORY_NAME             = module.cms_ecr.repository_name
    CLIENT_REPOSITORY_NAME          = module.client_ecr.repository_name
    STAGING_CMS_ENV_FILE            = join("\n", [for key, value in local.staging_cms_env : "${key}=${value}"])
    STAGING_CLIENT_ENV_FILE         = join("\n", [for key, value in local.staging_client_env : "${key}=${value}"])
    STAGING_DOMAIN                  = var.staging_domain
    PRODUCTION_API_ENV_FILE         = join("\n", [for key, value in local.production_api_env : "${key}=${value}"])
    PRODUCTION_CLIENT_ENV_FILE      = join("\n", [for key, value in local.production_client_env : "${key}=${value}"])
    PRODUCTION_DOMAIN               = var.production_domain
  }
  variable_map = {
    AWS_REGION = var.aws_region
  }
}

module "cms_ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  repo_name    = "cms"
}

module "client_ecr" {
  source = "./modules/ecr"

  project_name = var.project_name
  repo_name    = "client"
}

resource "aws_iam_service_linked_role" "elasticbeanstalk" {
  aws_service_name = "elasticbeanstalk.amazonaws.com"
}

module "staging" {
  source                                        = "./modules/env"
  domain                                        = var.staging_domain
  project                                       = var.project_name
  environment                                   = "staging"
  aws_region                                    = var.aws_region
  vpc                                           = data.aws_vpc.default_vpc
  subnet_ids                                    = local.subnets_with_ec2_instance_type_offering_ids
  availability_zones                            = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
  beanstalk_platform                            = var.beanstalk_platform
  beanstalk_tier                                = var.beanstalk_tier
  ec2_instance_type                             = var.staging_ec2_instance_type
  rds_engine_version                            = var.rds_engine_version
  rds_instance_class                            = var.rds_instance_class
  rds_backup_retention_period                   = var.staging_rds_backup_retention_period
  elasticbeanstalk_iam_service_linked_role_name = aws_iam_service_linked_role.elasticbeanstalk.name
}

module "production" {
  source                                        = "./modules/env"
  domain                                        = var.production_domain
  project                                       = var.project_name
  environment                                   = "production"
  aws_region                                    = var.aws_region
  vpc                                           = data.aws_vpc.default_vpc
  subnet_ids                                    = local.subnets_with_ec2_instance_type_offering_ids
  availability_zones                            = data.aws_availability_zones.azs_with_ec2_instance_type_offering.names
  beanstalk_platform                            = var.beanstalk_platform
  beanstalk_tier                                = var.beanstalk_tier
  ec2_instance_type                             = var.production_ec2_instance_type
  rds_engine_version                            = var.rds_engine_version
  rds_instance_class                            = var.rds_instance_class
  rds_backup_retention_period                   = var.production_rds_backup_retention_period
  elasticbeanstalk_iam_service_linked_role_name = aws_iam_service_linked_role.elasticbeanstalk.name
}

