##
# Module to build the DO container registry
# DO allows to have only one registry per account!!! If your account already have container registry, skip this action
##

resource "digitalocean_container_registry" "container_registry" {
  name                   = var.registry_name
  subscription_tier_slug = "professional"
  region                 = var.do_region
}
