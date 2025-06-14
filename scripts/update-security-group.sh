#!/bin/bash

# Get GitHub Actions IP ranges
GITHUB_ACTIONS_IPS=$(curl -s https://api.github.com/meta | jq -r '.actions[]')

# Update security group
for ip in $GITHUB_ACTIONS_IPS; do
    aws ec2 authorize-security-group-ingress \
        --group-id sg-04489da67bf57d42e \
        --protocol tcp \
        --port 22 \
        --cidr "$ip"
done 