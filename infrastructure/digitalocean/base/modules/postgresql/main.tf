##
# Module to build the DO Postgres DB
##

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
