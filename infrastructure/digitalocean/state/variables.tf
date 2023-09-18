variable "do_region" {
  type        = string
  description = "DigitalOcean Region"
}

variable "do_token" {
  type        = string
  description = "DigitalOcean Token"
}

variable "do_spaces_client_id" {
  type        = string
  description = "DigitalOcean Spaces Client ID"
}

variable "do_spaces_secret_key" {
  type        = string
  description = "DigitalOcean Spaces Secret Key"
}

variable "project_name" {
  type        = string
  description = "Short name of the project, will be used to prefix created resources"
}
