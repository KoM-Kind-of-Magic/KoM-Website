resource "aws_key_pair" "admin" {
   key_name   = "admin"
   public_key = var.SSH_PUB_KEY
 }

 resource "aws_instance" "SRV-Front-ESP" {
   ami           = "ami-002ff2c881c910aa8"
   instance_type = "t2.micro"
   key_name      = "admin"
   	  tags = {
		Name			= "SRV-Front-ESP"
		"Application"	= "Web-ESP"
		"Environment"	= "PRD"
		"OS"			= "Debian"
		"Role"			= "Frontend"
		}
 }

 resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.SRV-Front-ESP.id
  allocation_id = var.EIP_ASSOC_FRONTEND
}

terraform {
  backend "s3" {
    bucket = "kom-front-bucket-ml"
    key    = "terraform.tfstate"
    region = "eu-west-3"
  }
}
# resource "aws_instance" "SRV-Front-ESP" {
# 		ami						= "ami-002ff2c881c910aa8"
# 		instance_type			= "t2.micro"
# 		key_name				= "admin"
# 		subnet_id 				= "subnet-03722bc8b07115e26"
# 		vpc_security_group_ids	= ["sg-073729d8166cb3445"]
# 		root_block_device{
# 		  volume_size			= "80"
# 		  volume_type			= "gp3"
# 		  }

# 	  tags = {
# 		Name			= "SRV-Front-ESP"
# 		"Application"	= "Web-ESP"
# 		"Environment"	= "PRD"
# 		"OS"			= "Debian"
# 		"Role"			= "Frontend"
# 		}
# }