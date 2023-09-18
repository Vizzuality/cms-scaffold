output "user" {
  value     = digitalocean_database_cluster.postgres_cluster.user
  sensitive = true
}

output "password" {
  value     = digitalocean_database_cluster.postgres_cluster.password
  sensitive = true
}

output "host" {
  value = digitalocean_database_cluster.postgres_cluster.host
}

output "port" {
  value = digitalocean_database_cluster.postgres_cluster.port
}
