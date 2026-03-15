# ✅ Exchange Orderbook System - RUNNING!

## 🎉 Success! All services are running

Your Exchange Orderbook System is now running locally with all components active.

---

## 📱 Access Your Application

### Main Application
**Frontend Trading Interface:**
```
http://localhost:3002/trade/TATA_INR
```

### API Endpoints
**API Server:**
```
http://localhost:3000
```

**Example API calls:**
- Get orderbook depth: `http://localhost:3000/api/v1/depth?symbol=TATA_INR`
- Get trades: `http://localhost:3000/api/v1/trades?symbol=TATA_INR`
- Get balances: `http://localhost:3000/api/v1/balance?userId=1`

**WebSocket Server:**
```
ws://localhost:3001
```

---

## 🔧 Running Services

You should see **5 terminal windows** running:

1. **Engine** (Order Matching) - Port: Internal
2. **API Server** - Port: 3000
3. **WebSocket Server** - Port: 3001
4. **DB Processor** - Port: Internal
5. **Frontend** - Port: 3002

Plus Docker containers:
- **Redis** - Port: 6379
- **TimescaleDB** - Port: 5432

---

## 🧪 Test the System

### Option 1: Use the Frontend
1. Open: http://localhost:3002/trade/TATA_INR
2. Place buy/sell orders
3. Watch real-time orderbook updates

### Option 2: Use the Market Maker (Automated Trading)
Start the market maker to generate test orders:

```bash
cd /Users/praveendhankhar/ExchangeOS/ExchangeOs/mm
npm run dev
```

This will automatically place buy/sell orders to populate the orderbook.

### Option 3: Use API Directly
```bash
# Place a buy order
curl -X POST http://localhost:3000/api/v1/order \
  -H "Content-Type: application/json" \
  -d '{
    "market": "TATA_INR",
    "price": "1000",
    "quantity": "10",
    "side": "buy",
    "userId": "user1"
  }'

# Place a sell order
curl -X POST http://localhost:3000/api/v1/order \
  -H "Content-Type: application/json" \
  -d '{
    "market": "TATA_INR",
    "price": "1010",
    "quantity": "5",
    "side": "sell",
    "userId": "user2"
  }'

# Check orderbook
curl http://localhost:3000/api/v1/depth?symbol=TATA_INR
```

---

## 🛑 Stopping the System

### Stop All Services:
1. Close all terminal windows (or press Ctrl+C in each)
2. Stop Docker containers:
   ```bash
   cd /Users/praveendhankhar/ExchangeOS/ExchangeOs/docker
   docker compose down
   ```

---

## 🔄 Restarting the System

### Quick Restart:
```bash
cd /Users/praveendhankhar/ExchangeOS/ExchangeOs

# Start Docker (if not running)
cd docker && docker compose up -d && cd ..

# Start all services
./start-services.sh
```

---

## 📊 System Architecture

```
Frontend (3002) → API (3000) → Redis Queue → Engine (matching)
                                    ↓
                              DB Processor → TimescaleDB
                                    ↓
                              WebSocket (3001) → Frontend
```

---

## 🐛 Troubleshooting

### Service not starting?
Check the terminal window for that service for error messages.

### Port already in use?
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or change the port in the service's package.json
```

### Redis connection error?
```bash
# Check if Redis is running
docker ps | grep redis

# Restart Redis
docker restart redis
```

### Database connection error?
```bash
# Check if TimescaleDB is running
docker ps | grep timescaledb

# Restart TimescaleDB
docker restart timescaledb
```

### Frontend not loading?
- Make sure all services are running (check terminal windows)
- Wait 10-20 seconds for all services to fully initialize
- Check browser console for errors

---

## 📚 Learn More

- **Full Documentation**: See `README.md` for detailed architecture
- **Testing Guide**: See `TESTING_GUIDE.md`
- **Run Tests**: `cd engine && npm test`

---

## 🎯 Next Steps

1. **Explore the Frontend**: http://localhost:3002/trade/TATA_INR
2. **Start Market Maker**: Generate test orders automatically
3. **Read the Code**: Understand the order matching engine
4. **Run Tests**: `cd engine && npm test` (30 tests)
5. **Experiment**: Try placing orders and watching them match!

---

**Happy Trading! 🚀📈**
