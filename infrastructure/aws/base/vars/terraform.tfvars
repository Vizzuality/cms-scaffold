aws_region         = "eu-west-3"
allowed_account_id = "account_id"
project_name       = "project"
repo_name          = "project"

staging_domain            = "staging.project.dev-vizzuality.com"
staging_ec2_instance_type = "t3a.small"

production_domain            = "project.dev-vizzuality.com"
production_ec2_instance_type = "t3a.small"

beanstalk_platform = "64bit Amazon Linux 2023 v4.0.1 running Docker"
beanstalk_tier     = "WebServer"
ec2_instance_type  = "t3a.small"
rds_engine_version = "15.4"
rds_instance_class = "db.t3.micro"
