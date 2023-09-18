output "state_bucket" {
  value = digitalocean_spaces_bucket.terraform_state.id
}
