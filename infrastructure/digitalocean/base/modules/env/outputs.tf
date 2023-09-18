output "postgresql_host" {
  value = module.postgresql.host
}

output "postgresql_port" {
  value = module.postgresql.port
}

output "app_url" {
  value = module.app.url
}

output "app_domain" {
  value = module.app.domain
}
