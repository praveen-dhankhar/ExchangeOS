#!/bin/bash

# Check status of all Exchange Orderbook services

echo "=========================================="
echo "  Exchange Orderbook - Service Status"
echo "=========================================="
echo ""

# Check Docker containers
echo "🐳 Docker Services:"
echo "-------------------"
if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "redis|timescaledb" > /dev/null 2>&1; then
    docker ps --format "table {{.Names}}\t{{.Status}}" | grep -E "redis|timescaledb"
    echo "✅ Docker services running"
else
    echo "❌ Docker services not running"
    echo "   Run: cd docker && docker compose up -d"
fi
echo ""

# Check Node services
echo "🚀 Node.js Services:"
echo "-------------------"

check_port() {
    local port=$1
    local name=$2
    if lsof -i :$port | grep LISTEN > /dev/null 2>&1; then
        echo "✅ $name (port $port) - RUNNING"
    else
        echo "❌ $name (port $port) - NOT RUNNING"
    fi
}

check_port 3000 "API Server     "
check_port 3001 "WebSocket      "
check_port 3002 "Frontend       "

echo ""
echo "📊 Quick Test:"
echo "-------------------"
if curl -s http://localhost:3000/api/v1/depth?symbol=TATA_INR > /dev/null 2>&1; then
    echo "✅ API responding"
    echo "   Response: $(curl -s 'http://localhost:3000/api/v1/depth?symbol=TATA_INR')"
else
    echo "❌ API not responding"
fi

echo ""
echo "=========================================="
echo "Access URLs:"
echo "  Frontend: http://localhost:3002/trade/TATA_INR"
echo "  API:      http://localhost:3000"
echo "=========================================="
