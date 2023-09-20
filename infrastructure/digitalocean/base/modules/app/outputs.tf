output "app_id" {
  value = digitalocean_app.app.id
}

output "url" {
  value = digitalocean_app.app.live_url
}

output "domain" {
  value = digitalocean_app.app.spec.0.domain
}
