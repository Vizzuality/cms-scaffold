terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.84"
    }
  }
  required_version = "1.6.5"
}

provider "google" {
  project = var.gcp_project_id
  region  = var.gcp_region
}
