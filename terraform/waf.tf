resource "aws_wafv2_ip_set" "apdinfo_vpn_ips" {
  provider           = aws.us_east_1
  name               = "vpn-allowed-ips"
  description        = "VPN IP addresses allowed to access CloudFront"
  scope              = "CLOUDFRONT"
  ip_address_version = "IPV4"
  addresses          = ["${aws_eip.apdinfo_dev_vpn_ip.public_ip}/32"]
}

resource "aws_wafv2_web_acl" "apdinfo_waf" {
  provider    = aws.us_east_1
  name        = "apdinfo-waf"
  description = "WAF for APD Info CloudFront"
  scope       = "CLOUDFRONT"

  default_action {
    block {}
  }

  rule {
    name     = "allow-vpn-ips"
    priority = 1

    action {
      allow {}
    }

    statement {
      ip_set_reference_statement {
        arn = aws_wafv2_ip_set.apdinfo_vpn_ips.arn
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AllowVPNIPs"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name = "AWSManagedRulesKnownBadInputsRuleSet"
    priority = 2

    override_action {
      none {}
    }
      
    statement {
      managed_rule_group_statement {
        name = "AWSManagedRulesKnownBadInputsRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWSManagedRulesKnownBadInputsRuleSet"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "APDInfoWAF"
    sampled_requests_enabled   = true
  }
}