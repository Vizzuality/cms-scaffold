terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

module "postgresql" {
  source = "../postgresql"

  project_name            = var.project_name
  environment             = var.environment
  do_region               = var.do_region
  postgres_size           = var.postgres_size
  postgres_db_name        = var.postgres_db_name
  app_id                  = module.app.app_id
}

module "app" {
  source = "../app"

  project_name            = var.project_name
  environment             = var.environment
  do_region               = var.do_region
  do_app_instance         = var.do_app_instance
  do_app_instance_count   = var.do_app_instance_count
  do_app_image_tag        = var.do_app_image_tag
}
