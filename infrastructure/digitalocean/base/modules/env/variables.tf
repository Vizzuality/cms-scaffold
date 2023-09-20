variable "do_region" {
  type        = string
  description = "DigitalOcean Region"
}

variable "project_name" {
  type        = string
  description = "Short name of the project, will be used to prefix created resources"
}

variable "environment" {
  type        = string
  description = "Name of the environment, will be used to prefix created resources"
}

variable "do_app_instance" {
  type        = string
  description = "DigitalOcean Droplet size"
  default     = "basic-xs"
}

variable "postgres_size" {
  type        = string
  description = "DigitalOcean PostgreSQL size"
  default     = "db-s-1vcpu-1gb"
}

variable "postgres_db_name" {
  type        = string
  description = "Name of PostgreSQL database"
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
