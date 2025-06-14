#!/bin/bash

# Get GitHub Actions IP ranges
GITHUB_ACTIONS_IPS=$(curl -s https://api.github.com/meta | jq -r '.actions[]')

# Update security group (replace sg-xxxxxxxx with your security group ID)
for ip in $GITHUB_ACTIONS_IPS; do
    aws ec2 authorize-security-group-ingress \
        --group-id sg-xxxxxxxx \
        --protocol tcp \
        --port 22 \
        --cidr $ip/32
done 