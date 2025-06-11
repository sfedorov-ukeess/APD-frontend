resource "aws_vpc" "apdinfo_vpn_vpc" {
  cidr_block           = "172.20.0.0/22"
  enable_dns_support   = true
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "apdinfo_vpn_igw" {
  vpc_id = aws_vpc.apdinfo_vpn_vpc.id
}

resource "aws_subnet" "apdinfo_vpn_subnet" {
  vpc_id                  = aws_vpc.apdinfo_vpn_vpc.id
  cidr_block              = "172.20.1.0/24"
  availability_zone       = "${var.region}a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "apdinfo_vpn_private_subnet" {
  vpc_id                  = aws_vpc.apdinfo_vpn_vpc.id
  cidr_block              = "172.20.2.0/24"
  availability_zone       = "${var.region}a"
  map_public_ip_on_launch = false
}

resource "aws_route_table" "apdinfo_vpn_route_table" {
  vpc_id = aws_vpc.apdinfo_vpn_vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.apdinfo_vpn_igw.id
  }
}

resource "aws_route_table_association" "apdinfo_vpn_route_assoc" {
  subnet_id      = aws_subnet.apdinfo_vpn_subnet.id
  route_table_id = aws_route_table.apdinfo_vpn_route_table.id
}

resource "aws_ec2_client_vpn_endpoint" "apdinfo_dev_vpn" {
  description            = "apdinfo_dev_vpn"
  server_certificate_arn = aws_acm_certificate.vpn_server_cert.arn
  client_cidr_block      = "100.128.0.0/22"
  split_tunnel           = false

  authentication_options {
    type                       = "certificate-authentication"
    root_certificate_chain_arn = aws_acm_certificate.vpn_client_root_cert.arn
  }

  connection_log_options {
    enabled = false
  }
  security_group_ids = [aws_security_group.apdinfo_vpn_security_group.id]
}

resource "aws_eip" "apdinfo_dev_vpn_ip" {
  domain     = "vpc"
  depends_on = [aws_internet_gateway.apdinfo_vpn_igw]
}

resource "aws_nat_gateway" "apdinfo_dev_vpn_nat_gw" {
  allocation_id = aws_eip.apdinfo_dev_vpn_ip.id
  subnet_id     = aws_subnet.apdinfo_vpn_subnet.id
  tags = {
    Name = "vpn-egress-nat"
  }
}

resource "aws_route_table" "apdinfo_dev_vpn_private_rt" {
  vpc_id = aws_vpc.apdinfo_vpn_vpc.id
  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.apdinfo_dev_vpn_nat_gw.id
  }
}

resource "aws_route_table_association" "apdinfo_dev_vpn_private_rta" {
  subnet_id      = aws_subnet.apdinfo_vpn_private_subnet.id
  route_table_id = aws_route_table.apdinfo_dev_vpn_private_rt.id
}

resource "aws_ec2_client_vpn_network_association" "apdinfo_vpn_subnet" {
  client_vpn_endpoint_id = aws_ec2_client_vpn_endpoint.apdinfo_dev_vpn.id
  subnet_id              = aws_subnet.apdinfo_vpn_private_subnet.id
}

resource "aws_ec2_client_vpn_authorization_rule" "apdinfo_vpn_auth" {
  client_vpn_endpoint_id = aws_ec2_client_vpn_endpoint.apdinfo_dev_vpn.id
  target_network_cidr    = "0.0.0.0/0"
  authorize_all_groups   = true
  description            = "Allow all VPN clients internet access"
}

resource "aws_security_group" "apdinfo_vpn_security_group" {
  name        = "apdinfo_vpn_security_group"
  vpc_id      = aws_vpc.apdinfo_vpn_vpc.id

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "udp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow incoming VPN connections"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow all outbound traffic"
  }
}

resource "aws_ec2_client_vpn_route" "apdinfo_vpn_default_internet_route" {
  client_vpn_endpoint_id = aws_ec2_client_vpn_endpoint.apdinfo_dev_vpn.id
  destination_cidr_block = "0.0.0.0/0"
  target_vpc_subnet_id   = aws_subnet.apdinfo_vpn_private_subnet.id
}