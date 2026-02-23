variable "stack_id" {
  default = "apd-desktop"
}

variable "region" {
  default = "eu-central-1"
}

variable "fqdn" {
  type  = map(string)
  default = {
    "341510474333" = "dev.apdinfo.org"
    "326620529447" = "apdinfo.org"
  }
}

variable "aws_environment" {
  type  = map(string)
  default = {
    "341510474333" = "dev"
    "326620529447" = "prod"
  }
}
