#!/bin/bash

# Ediya AX Strategic Command Center (V3) - Unified Launch Script
# Author: Antigravity AI Agent

echo "🌌 Initializing Ediya AX Strategic Command Center (V3) Industrial Scale..."
echo "-----------------------------------------------------------------------"

# 1. Prerequisite Check: Docker
if ! command -v docker &> /dev/null; then
    echo "❌ [ERROR] Docker is not installed or not in PATH."
    echo "👉 Please install Docker Desktop: https://www.docker.com/products/docker-desktop"
    echo "👉 After installation, restart your terminal and run this script again."
    exit 1
fi

if ! docker info &> /dev/null; then
    echo "❌ [ERROR] Docker daemon is not running."
    echo "👉 Please start Docker Desktop and wait until it is fully active."
    exit 1
fi

# 2. Network Interface Setup
echo "📡 Configuring internal network matrix..."

# 3. Cluster Deployment
echo "🚀 Launching Tactical Operation Cluster (Frontend, Backend, DB, Redis)..."
docker-compose up --build -d

# 4. Success Visualization
echo "-----------------------------------------------------------------------"
echo "✅ DEPLOYMENT SUCCESSFUL: All systems are SYNCHRONIZED."
echo ""
echo "🖥️  [FRONTEND COMMAND PANE]: http://localhost:3000"
echo "⚙️  [BACKEND INTELLIGENCE]: http://localhost:4000"
echo ""
echo "📝 Note: It may take 10-15 seconds for hot-reloading to initialize."
echo "-----------------------------------------------------------------------"
echo "데이터가 흐르고, 비즈니스가 완성되는 곳. Ediya AX Core is now active."
