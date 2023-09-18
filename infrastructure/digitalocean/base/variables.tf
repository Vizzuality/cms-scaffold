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

variable "container_registry_name" {
  type        = string
  description = "Name of DO container registry"
}

variable "postgres_size" {
  type        = string
  description = "DigitalOcean PostgreSQL size"
}

variable "postgres_db_name" {
  type        = string
  description = "Name of PostgreSQL database"
}

variable "do_app_instance" {
  type        = string
  description = "DigitalOcean Droplet size"
  default     = "basic-xs"
}

variable "do_app_instance_count" {
  type        = number
  description = "Number of instances to create"
  default     = 1
}

variable "do_app_image_tag" {
  type        = string
  description = "Tag of image from DO container registry"
}
