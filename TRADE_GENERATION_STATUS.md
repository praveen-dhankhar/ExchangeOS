# 🔄 Trade Generation Active

The `generate-trades` script is currently running in the background.

## 📊 Status
- **Action**: Generating market activity (Buy/Sell orders)
- **Target**: 1000 TATA volume
- **Users**: User 1 and User 2 (Funded with ₹1 Cr each)

## 🔍 What to expect
1. **Orderbook**: You will see bids and asks populating the orderbook in real-time.
2. **Trades**: Matches will occur occasionally, updating the trade history.
3. **Candles**: Chart candles will form as trades accumulate (might need refresh).

## 🛑 How to stop
If you want to stop the trade generation manually:
```bash
# Find the node process running the script and kill it
pkill -f generate-trades
```

## 📝 Logs
You can view the logs in the terminal where it's running.
