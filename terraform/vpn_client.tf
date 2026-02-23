resource "tls_private_key" "apdinfo_vpn_client" {
  algorithm = "RSA"
  rsa_bits  = 2048
}

resource "tls_cert_request" "apdinfo_vpn_client" {
  private_key_pem = tls_private_key.apdinfo_vpn_client.private_key_pem

  subject {
    common_name = "apdinfo-vpn-client"
  }
}

resource "tls_locally_signed_cert" "apdinfo_vpn_client" {
  cert_request_pem   = tls_cert_request.apdinfo_vpn_client.cert_request_pem
  ca_private_key_pem = tls_private_key.ca.private_key_pem
  ca_cert_pem        = tls_self_signed_cert.ca.cert_pem

  validity_period_hours = 87600

  allowed_uses = [
    "key_encipherment",
    "digital_signature",
    "client_auth"
  ]
}

resource "local_file" "client_cert" {
  content  = tls_locally_signed_cert.apdinfo_vpn_client.cert_pem
  filename = "./client-cert.pem"
}

resource "local_file" "client_key" {
  content  = tls_private_key.apdinfo_vpn_client.private_key_pem
  filename = "./client-key.pem"
}

resource "local_file" "ca_cert" {
  content  = tls_self_signed_cert.ca.cert_pem
  filename = "./ca-cert.pem"
}

resource "local_file" "client_ovpn_config" {
  content = templatefile("./client-config.ovpn.tpl", {
    client_cert = tls_locally_signed_cert.apdinfo_vpn_client.cert_pem,
    client_key  = tls_private_key.apdinfo_vpn_client.private_key_pem,
    ca_cert     = tls_self_signed_cert.ca.cert_pem,
    vpn_endpoint = replace(aws_ec2_client_vpn_endpoint.apdinfo_dev_vpn.dns_name, "/^\\*\\./", "")
  })
  filename = "./client-config.ovpn"
}