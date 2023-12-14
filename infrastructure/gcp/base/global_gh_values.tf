module "github_values" {
  source    = "./modules/github_values"
  repo_name = var.github_project
  secret_map = {
    TF_GCP_PROJECT_ID            = var.gcp_project_id
    TF_GCP_REGION                = var.gcp_region
  }
  variable_map = {}
}
