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

variable "do_app_instance_count" {
  type        = number
  description = "Number of instances to create"
  default     = 1
}

variable "do_app_image_tag" {
  type        = string
  description = "Tag of image from DO container registry"
}
