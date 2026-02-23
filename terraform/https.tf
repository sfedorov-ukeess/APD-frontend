resource "aws_acm_certificate" "apdinfo_ssl" {
  provider                  = aws.us_east_1
  depends_on                = [aws_route53_zone.apdinfo_zone]
  domain_name               = local.domain_name
  validation_method         = "DNS"
  subject_alternative_names = ["*.${local.domain_name}"]
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "apdinfo_ssl_validation" {
  provider                  = aws.us_east_1
  certificate_arn         = aws_acm_certificate.apdinfo_ssl.arn
  validation_record_fqdns = [for record in aws_route53_record.apdinfo_ssl_dns_validation : record.fqdn]
}