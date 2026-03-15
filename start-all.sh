#!/bin/bash

# Exchange Orderbook System - Automated Startup Script
# This script starts all services required to run the exchange

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Exchange Orderbook System Startup${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed!${NC}"
    echo -e "${YELLOW}Please install Docker Desktop from: https://www.docker.com/products/docker-desktop${NC}"
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo -e "${RED}❌ Docker is not running!${NC}"
    echo -e "${YELLOW}Please start Docker Desktop and try again.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Docker is installed and running${NC}"
echo ""

# Step 1: Start Docker services
echo -e "${BLUE}Step 1: Starting Docker services (Redis + TimescaleDB)...${NC}"
cd docker
docker compose up -d

echo -e "${YELLOW}Waiting 10 seconds for services to initialize...${NC}"
sleep 10

# Check if containers are running
if docker ps | grep -q "redis" && docker ps | grep -q "timescaledb"; then
    echo -e "${GREEN}✅ Docker services started successfully${NC}"
else
    echo -e "${RED}❌ Failed to start Docker services${NC}"
    exit 1
fi
echo ""

# Step 2: Initialize database
echo -e "${BLUE}Step 2: Initializing database tables...${NC}"
docker exec -i timescaledb psql -U your_user -d my_database << 'EOF'
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(50) PRIMARY KEY,
    market VARCHAR(20),
    price DECIMAL(18,8),
    quantity DECIMAL(18,8),
    side VARCHAR(10),
    user_id VARCHAR(50),
    executed_qty DECIMAL(18,8) DEFAULT 0,
    status VARCHAR(20) DEFAULT 'open',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS trades (
    id VARCHAR(50) PRIMARY KEY,
    market VARCHAR(20),
    price DECIMAL(18,8),
    quantity DECIMAL(18,8),
    buyer_id VARCHAR(50),
    seller_id VARCHAR(50),
    is_buyer_maker BOOLEAN,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tata_prices (
    time TIMESTAMPTZ NOT NULL,
    price DECIMAL(18,8),
    volume DECIMAL(18,8),
    currency_code VARCHAR(20)
);

SELECT create_hypertable('tata_prices', 'time', if_not_exists => TRUE);
EOF

echo -e "${GREEN}✅ Database initialized${NC}"
echo ""

# Step 3: Install dependencies if needed
echo -e "${BLUE}Step 3: Checking dependencies...${NC}"
cd ..

for dir in api engine ws db frontend mm; do
    if [ ! -d "$dir/node_modules" ]; then
        echo -e "${YELLOW}Installing dependencies for $dir...${NC}"
        cd $dir
        npm install
        cd ..
    else
        echo -e "${GREEN}✅ $dir dependencies already installed${NC}"
    fi
done
echo ""

# Step 4: Start all services
echo -e "${BLUE}Step 4: Starting all services...${NC}"
echo -e "${YELLOW}This will open multiple terminal windows.${NC}"
echo ""

# Function to start service in new terminal
start_service() {
    local service_name=$1
    local service_dir=$2
    local command=$3
    
    echo -e "${BLUE}Starting $service_name...${NC}"
    
    # For macOS, use osascript to open new terminal
    osascript -e "tell application \"Terminal\" to do script \"cd '$PWD/$service_dir' && echo '🚀 Starting $service_name...' && $command\""
    
    sleep 2
}

# Start each service in a new terminal window
start_service "Engine (Order Matching)" "engine" "npm run dev"
start_service "API Server" "api" "npm run dev"
start_service "WebSocket Server" "ws" "npm run dev"
start_service "DB Processor" "db" "npm run dev"
start_service "Frontend" "frontend" "npm run dev -- -p 3002"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  All services started successfully!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Access the application at:${NC}"
echo -e "  ${GREEN}Frontend:${NC} http://localhost:3002/trade/TATA_INR"
echo -e "  ${GREEN}API:${NC}      http://localhost:3000"
echo -e "  ${GREEN}WebSocket:${NC} ws://localhost:3001"
echo ""
echo -e "${YELLOW}Optional: Start Market Maker for testing${NC}"
echo -e "  cd mm && npm run dev"
echo ""
echo -e "${BLUE}To stop all services:${NC}"
echo -e "  1. Close all terminal windows"
echo -e "  2. Run: ${YELLOW}docker compose -f docker/docker-compose.yml down${NC}"
echo ""
