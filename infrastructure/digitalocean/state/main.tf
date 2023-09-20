terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

provider "digitalocean" {
  token = var.do_token
  spaces_access_id = var.do_spaces_client_id
  spaces_secret_key = var.do_spaces_secret_key
}

resource "digitalocean_project" "terraform_state" {
  name = var.project_name
}

resource "digitalocean_spaces_bucket" "terraform_state" {
  name = "${var.project_name}-terraform-state"
  region = var.do_region
  acl = "private"
}

resource "digitalocean_project_resources" "terraform_state" {
  project = digitalocean_project.terraform_state.id
  resources = [digitalocean_spaces_bucket.terraform_state.urn]
}
