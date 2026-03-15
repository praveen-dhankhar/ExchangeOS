#!/bin/bash

# Start all services in separate terminal windows

PROJECT_DIR="/Users/praveendhankhar/ExchangeOS/ExchangeOs"

echo "🚀 Starting all Exchange Orderbook services..."
echo ""

# Function to start service in new terminal (macOS)
start_service() {
    local service_name=$1
    local service_dir=$2
    local command=$3
    
    echo "Starting $service_name in new terminal..."
    
    osascript -e "tell application \"Terminal\" to do script \"cd '$PROJECT_DIR/$service_dir' && echo '🚀 $service_name' && echo '================================' && $command\""
    
    sleep 1
}

# Start each service
start_service "Engine (Order Matching)" "engine" "npm run dev"
start_service "API Server" "api" "npm run dev"
start_service "WebSocket Server" "ws" "npm run dev"
start_service "DB Processor" "db" "npm run dev"
start_service "Frontend" "frontend" "npm run dev -- -p 3002"

echo ""
echo "✅ All services started in separate terminals!"
echo ""
echo "📱 Access the application:"
echo "   Frontend: http://localhost:3002/trade/TATA_INR"
echo "   API:      http://localhost:3000"
echo ""
echo "Optional: Start Market Maker for testing"
echo "   cd mm && npm run dev"
echo ""
