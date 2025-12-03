#!/bin/bash
set -e

echo "🔧 ========================================"
echo "🔧  Jenkins Docker-in-Docker Setup"
echo "🔧 ========================================"
echo ""

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then
    echo "⚠️  This script needs sudo privileges for some operations"
    echo "Please run: sudo ./setup-jenkins-dind.sh"
    exit 1
fi

# Backup existing Jenkins data
if docker ps -a | grep -q jenkins; then
    echo "💾 Backing up existing Jenkins container..."
    docker commit jenkins jenkins-backup-$(date +%Y%m%d-%H%M%S) || true
fi

# Stop and remove existing Jenkins
echo "🛑 Stopping existing Jenkins container..."
docker stop jenkins 2>/dev/null || true
docker rm jenkins 2>/dev/null || true

echo ""
echo "🚀 Starting Jenkins with Docker-in-Docker support..."
echo ""

# Start Jenkins with all necessary mounts
docker run -d \
  --name jenkins \
  --privileged \
  -u root \
  -p 9450:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /usr/bin/docker:/usr/bin/docker \
  -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose \
  -e DOCKER_HOST=unix:///var/run/docker.sock \
  jenkins/jenkins:lts

echo "✅ Jenkins container started"
echo ""
echo "⏳ Waiting for Jenkins to initialize (30 seconds)..."
sleep 30

# Install required tools
echo ""
echo "📦 Installing required tools in Jenkins..."
docker exec jenkins bash -c "
  apt-get update -qq &&
  apt-get install -y -qq lsof curl net-tools &&
  apt-get clean &&
  rm -rf /var/lib/apt/lists/*
" 2>/dev/null

echo "✅ Tools installed: lsof, curl, net-tools"

# Setup Docker permissions
echo ""
echo "🔐 Configuring Docker permissions..."
DOCKER_GID=$(stat -c '%g' /var/run/docker.sock)
docker exec jenkins groupadd -g $DOCKER_GID docker 2>/dev/null || echo "Docker group already exists"
docker exec jenkins usermod -aG docker jenkins

# Install docker-compose in Jenkins
echo ""
echo "📦 Installing docker-compose..."
docker exec jenkins bash -c "
  curl -sL https://github.com/docker/compose/releases/download/v2.23.0/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose &&
  chmod +x /usr/local/bin/docker-compose
" 2>/dev/null

echo "✅ docker-compose installed"

# Restart Jenkins to apply changes
echo ""
echo "🔄 Restarting Jenkins to apply changes..."
docker restart jenkins

echo ""
echo "⏳ Waiting for Jenkins to restart..."
sleep 20

# Test Docker access
echo ""
echo "🧪 Testing Docker access from Jenkins..."
if docker exec -u jenkins jenkins docker ps >/dev/null 2>&1; then
    echo "✅ Docker access verified!"
else
    echo "⚠️  Docker access test failed. You may need to:"
    echo "   1. Check /var/run/docker.sock permissions"
    echo "   2. Restart Jenkins: docker restart jenkins"
fi

# Get initial admin password
echo ""
echo "🔑 ========================================"
echo "🔑  Jenkins Initial Setup"
echo "🔑 ========================================"
echo ""
echo "🌐 Jenkins URL: http://localhost:8080"
echo ""
echo "🔐 Initial Admin Password:"
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null || echo "Password not found yet, wait a moment and run: docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword"
echo ""

# Show container status
echo "📊 ========================================"
echo "📊  Container Status"
echo "📊 ========================================"
docker ps --filter "name=jenkins" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

# Final checks
echo "✅ ========================================"
echo "✅  Setup Complete!"
echo "✅ ========================================"
echo ""
echo "📋 Next Steps:"
echo "   1. Open http://localhost:8080 in your browser"
echo "   2. Use the admin password shown above"
echo "   3. Install suggested plugins"
echo "   4. Create your admin user"
echo "   5. Update your Jenkinsfile with the new pipeline"
echo ""
echo "🔍 Verify Docker access:"
echo "   docker exec -u jenkins jenkins docker ps"
echo ""
echo "📝 View Jenkins logs:"
echo "   docker logs -f jenkins"
echo ""

# Save setup info
cat > jenkins-setup-info.txt << EOF
Jenkins Docker-in-Docker Setup
==============================
Date: $(date)
Jenkins URL: http://localhost:8080
Container Name: jenkins

Initial Admin Password:
$(docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword 2>/dev/null || echo "Run: docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword")

Useful Commands:
- Restart Jenkins: docker restart jenkins
- View logs: docker logs -f jenkins
- Enter container: docker exec -it jenkins bash
- Test Docker: docker exec -u jenkins jenkins docker ps
- Stop Jenkins: docker stop jenkins
- Start Jenkins: docker start jenkins

Backup created: $(docker images jenkins-backup* --format "{{.Repository}}:{{.Tag}}" | head -1)
EOF

echo "💾 Setup information saved to: jenkins-setup-info.txt"
echo ""