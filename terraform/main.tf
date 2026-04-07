terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.99.1"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "4.1.0"
    }
  }
  backend "s3" {
    key            = "terraform.tfstate"
    region         = "eu-central-1"
    bucket         = "apdinfo-desktop-tfstate"
    encrypt        = true
    use_lockfile   = true
  }
}

provider "aws" {
  region = var.region
  default_tags {
    tags = {
      StackId     = var.stack_id
      Environment = terraform.workspace
    }
  }
}

provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
  default_tags {
    tags = {
      StackId     = var.stack_id
      Environment = terraform.workspace
    }
  }
}

locals {
  s3_origin_id = "apdinfo_s3_origin"
  aws_account_id = data.aws_caller_identity.current.account_id
  domain_name = lookup(var.fqdn, local.aws_account_id)
}

data "aws_caller_identity" "current" {}
data "aws_canonical_user_id" "current" {}

output "aws_account_id" {
  value = local.aws_account_id
}
output "lookup_result_default" {
  value = local.domain_name
}