##
# Module to build the DO Postgres DB
##

terraform {
  required_providers {
    digitalocean = {
      source = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }
}

data "digitalocean_project" "project" {
  name = var.project_name
}

resource "digitalocean_database_cluster" "postgres_cluster" {
  name       = "${var.project_name}-${var.environment}"
  engine     = "pg"
  version    = var.postgres_version
  size       = var.postgres_size
  region     = var.do_region
  node_count = var.postgres_node_count
}

resource "digitalocean_database_db" "postgres_database" {
  cluster_id = digitalocean_database_cluster.postgres_cluster.id
  name       = var.postgres_db_name
}

resource "digitalocean_database_firewall" "postgres_cluster_firewall" {
  cluster_id = digitalocean_database_cluster.postgres_cluster.id

  rule {
    type  = "app"
    value = var.app_id
  }
}

resource "digitalocean_project_resources" "postgres_cluster" {
  project = data.digitalocean_project.project.id
  resources = [digitalocean_database_cluster.postgres_cluster.urn]
}

resource "local_file" "user" {
  content  = digitalocean_database_cluster.postgres_cluster.user
  filename = "postgresql_username.txt"
}

resource "local_file" "password" {
  content  = digitalocean_database_cluster.postgres_cluster.password
  filename = "postgresql_password.txt"
}

resource "local_file" "host" {
  content  = digitalocean_database_cluster.postgres_cluster.host
  filename = "postgresql_host.txt"
}
