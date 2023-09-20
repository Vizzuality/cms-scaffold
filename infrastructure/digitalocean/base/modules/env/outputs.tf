output "postgresql_host" {
  value = module.postgresql.host
}

output "postgresql_port" {
  value = module.postgresql.port
}

output "postgresql_username" {
  value = module.postgresql.user
}

output "postgresql_password" {
  value = module.postgresql.password
}

output "app_url" {
  value = module.app.url
}

output "app_domain" {
  value = module.app.domain
}
