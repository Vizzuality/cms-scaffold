output "site_url" {
  value = local.frontend_lb_url
}

output "cms_url" {
  value = local.cms_lb_url
}

output "api_url" {
  value = local.api_lb_url
}
