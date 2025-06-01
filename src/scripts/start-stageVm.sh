#!/bin/bash

rsync -avz --exclude 'node_modules' --exclude '.git' --exclude '.env' \
-e "ssh -i ~/.ssh/ethan-home.pem" \
. ubuntu@ec2-54-153-112-227.us-west-1.compute.amazonaws.com:~/app



CREATE DATABASE test;
CREATE USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Kilanator1!!';
GRANT ALL PRIVILEGES ON test.* TO 'root'@'localhost';