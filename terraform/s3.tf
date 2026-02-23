resource "aws_s3_bucket" "apdinfo_frontend" {
  bucket = "apdinfo-frontend"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_versioning" "apdinfo_frontend_versioning" {
  bucket = aws_s3_bucket.apdinfo_frontend.id
  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "apdinfo_frontend" {
  bucket = aws_s3_bucket.apdinfo_frontend.id
  rule {
    id     = "apdinfo_frontend_cleanup_old_versions"
    status = "Enabled"
    filter {
      prefix = ""  # apply to all objects
    }
    noncurrent_version_expiration {
      noncurrent_days = 7
    }
  }
}

resource "aws_s3_bucket_public_access_block" "apdinfo_frontend_acl" {
  bucket                  = aws_s3_bucket.apdinfo_frontend.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "apdinfo_frontend" {
  bucket = aws_s3_bucket.apdinfo_frontend.id
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid       = "AllowCloudFrontServicePrincipal"
        Effect    = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.apdinfo_frontend.arn}/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = aws_cloudfront_distribution.apdinfo.arn
          }
        }
      }
    ]
  })
}

resource "aws_s3_bucket" "apdinfo_frontend_log" {
  bucket = "apdinfo-frontend-log"
  lifecycle {
    prevent_destroy = true
  }
}

resource "aws_s3_bucket_lifecycle_configuration" "apdinfo_frontend_log" {
  bucket = aws_s3_bucket.apdinfo_frontend_log.id
  rule {
    id     = "apdinfo_frontend_log_retention"
    status = "Enabled"
    expiration {
      days = "32"
    }
    noncurrent_version_expiration {
      noncurrent_days = 1
    }
    filter {
      prefix = ""
    }
  }
  rule {
    id     = "apdinfo_frontend_log_failed_uploads"
    status = "Enabled"
    abort_incomplete_multipart_upload {
      days_after_initiation = 1
    }
    filter {
      prefix = ""
    }
  }
}

resource "aws_s3_bucket_ownership_controls" "apdinfo_frontend_log" {
  bucket = aws_s3_bucket.apdinfo_frontend_log.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_acl" "apdinfo_frontend_log" {
  bucket = aws_s3_bucket.apdinfo_frontend_log.id
  access_control_policy {
    owner {
      id = data.aws_canonical_user_id.current.id
    }

    grant {
      grantee {
        id   = data.aws_canonical_user_id.current.id
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }

    # awslogsdelivery account needs full control for cloudfront logging
    # https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html
    grant {
      grantee {
        id   = "c4c1ede66af53448b93c283ce9448c4ba468c9432aa01d700d3878632f77d2d0"
        type = "CanonicalUser"
      }
      permission = "FULL_CONTROL"
    }
  }
}

resource "aws_s3_bucket_public_access_block" "apdinfo_frontend_log" {
  bucket = aws_s3_bucket.apdinfo_frontend_log.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}