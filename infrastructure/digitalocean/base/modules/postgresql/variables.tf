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

variable "postgres_size" {
  type        = string
  description = "DigitalOcean PostgreSQL size"
  default     = "db-s-1vcpu-1gb"
}

variable "postgres_db_name" {
  type        = string
  description = "Name of PostgreSQL database"
}

variable "postgres_version" {
  type        = string
  description = "PostgreSQL version"
  default     = "15"
}

variable "postgres_node_count" {
  type        = number
  description = "Number of PostgreSQL nodes"
  default     = 1
}

variable "app_id" {
  type        = string
  description = "DigitalOcean App ID"
}
