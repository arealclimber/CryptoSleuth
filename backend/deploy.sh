#!/bin/bash

# Check if a server was provided
if [ -z "$1" ]
then
  echo "No server provided."
  exit 1
fi

# Get version information
appVersion="1.0.0"  
gitCommit=$(git rev-parse HEAD)
gitBranch=$(git rev-parse --abbrev-ref HEAD)
buildDate=$(date -u +'%Y-%m-%dT%H:%M:%SZ')
user = $(git config user.name)

# Build the application
GOOS=linux GOARCH=amd64 go build \
  -ldflags "-X main.buildNum=${appVersion} \
  -X main.commit=${gitCommit} \
  -X main.branch=${gitBranch} \
  -X main.user=${user} \
  -X main.buildTime=${buildDate}" \
  -o sleuth

# Transfer the binary to the server
scp -i ~/key/linux_key.pem /mnt/g/project/CryptoSleuth/backend/sleuth ec2-user@$1:/home/ec2-user/sleuth/sleuth.tmp

# Stop the service, replace the binary, and restart the service
ssh -tt -i ~/key/linux_key.pem ec2-user@$1 << 'ENDSSH'
sudo systemctl stop sleuth
sudo mv /home/ec2-user/sleuth/sleuth.tmp /home/ec2-user/sleuth/sleuth
sudo systemctl start sleuth
exit
ENDSSH