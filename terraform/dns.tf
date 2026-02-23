resource "aws_route53_zone" "apdinfo_zone" {
  name = local.domain_name
}

output "apdinfo_zone_nameservers" {
  value = aws_route53_zone.apdinfo_zone.name_servers
}

resource "aws_route53_record" "apdinfo_ssl_dns_validation" {
  for_each = {
    for dvo in aws_acm_certificate.apdinfo_ssl.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }
  allow_overwrite = true
  name            = each.value.name
  type            = each.value.type
  zone_id         = aws_route53_zone.apdinfo_zone.zone_id
  records         = [each.value.record]
  ttl             = 300
}

resource "aws_route53_record" "apdinfo" {
  zone_id = aws_route53_zone.apdinfo_zone.zone_id
  name    = local.domain_name
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.apdinfo.domain_name
    zone_id                = aws_cloudfront_distribution.apdinfo.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_apdinfo" {
  zone_id = aws_route53_zone.apdinfo_zone.zone_id
  name    = "www.${local.domain_name}"
  type    = "A"
  alias {
    name                   = aws_cloudfront_distribution.apdinfo.domain_name
    zone_id                = aws_cloudfront_distribution.apdinfo.hosted_zone_id
    evaluate_target_health = false
  }
}