terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 5.9"
    }
  }
  required_version = "1.6.6"
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region

  default_labels = {
    managed-by = "terraform"
  }
}
