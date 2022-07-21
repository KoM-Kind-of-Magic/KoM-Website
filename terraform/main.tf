# Objet : Fichier terraform création EC2 pour le projet ESP
# Instances : SRV-Front-ESP , SRV-Front-ESP , SRV-DB-ESP
# Région : eu-west-3
# Auteur : Théo Mémin
# Date : 21/07/2022

resource "aws_eip_association" "eip_assoc" {
  instance_id   = aws_instance.SRV-Front-ESP.id
  allocation_id = var.EIP_ASSOC_FRONTEND
}
provider "aws" {
			profile    = "default"
			region = "eu-west-3"
}

resource "aws_instance" "SRV-Front-ESP" {
		ami						= "ami-04e905a52ec8010b2"
		instance_type			= "t2.micro"
		key_name				= "admin"
		subnet_id				= "subnet-07badc9b57fda08d4"
		vpc_security_group_ids	= ["sg-0a748a68835ebec7d"]
		root_block_device{
		  volume_size			= "80"
		  volume_type			= "gp3"
		  }

	  tags = {
		Name			= "SRV-Front-ESP"
		"Application"	= "Web-ESP"
		"Environment"	= "PRD"
		"OS"			= "Debian"
		"Role"			= "Frontend"
		}
}
resource "aws_key_pair" "admin" {
   key_name   = "admin"
   public_key = var.SSH_PUB_KEY
 }