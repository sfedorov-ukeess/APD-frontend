resource "aws_cloudfront_origin_access_control" "apdinfo_frontend_oac" {
  name                              = "apdinfo_frontend_oac"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "apdinfo" {
  enabled               = true
  depends_on            = [aws_acm_certificate_validation.apdinfo_ssl_validation]
  web_acl_id            = aws_wafv2_web_acl.apdinfo_waf.arn
  is_ipv6_enabled       = true
  default_root_object   = "index.html"
  aliases               = ["${local.domain_name}", "www.${local.domain_name}"]
  price_class           = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.apdinfo_frontend.bucket_regional_domain_name
    origin_id                = local.s3_origin_id
    origin_access_control_id = aws_cloudfront_origin_access_control.apdinfo_frontend_oac.id
  }

  default_cache_behavior {
    allowed_methods           = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods            = ["GET", "HEAD"]
    target_origin_id          = local.s3_origin_id
    viewer_protocol_policy    = "redirect-to-https"
    cache_policy_id           = "658327ea-f89d-4fab-a63d-7e88639e58f6" # CachingOptimized
    origin_request_policy_id  = "88a5eaf4-2fd4-4709-b370-b4c650ea3fcf" # CORS-S3Origin
  }

  logging_config {
    bucket = "${aws_s3_bucket.apdinfo_frontend_log.bucket_domain_name}"
  }

  viewer_certificate {
    acm_certificate_arn      = aws_acm_certificate.apdinfo_ssl.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
}