# DO allows to have only one container registry per account
# skip this action if registry already exists
module "container_registry" {
  source = "./modules/container_registry"

  registry_name      = var.container_registry_name
  do_region          = var.do_region
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
