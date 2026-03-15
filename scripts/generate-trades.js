"use strict";
/**
 * Script to generate real trades for the candle chart
 * Run this to populate the orderbook and create trades
 *
 * Usage: npx ts-node scripts/generate-trades.ts
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var API_URL = 'http://localhost:3000/api/v1';
function placeOrder(market, price, quantity, side, userId) {
    return __awaiter(this, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/order"), {
                        market: market,
                        price: price,
                        quantity: quantity,
                        side: side,
                        userId: userId
                    })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.data];
            }
        });
    });
}
function sleep(ms) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
        });
    });
}
function onramp(userId, amount) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1.default.post("".concat(API_URL, "/onramp"), {
                        userId: userId,
                        amount: amount
                    })];
                case 1:
                    _a.sent();
                    console.log("\uD83D\uDCB0 Added \u20B9".concat(amount, " to User ").concat(userId));
                    return [2 /*return*/];
            }
        });
    });
}
function generateTrades() {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, market, basePrice, totalVolume, tradeCount, i, price, quantity, i, price, quantity, priceChange, price, quantity, side, userId, result, qty, error_1, error_2;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    console.log('🚀 Starting trade generation for TATA_INR...\n');
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, onramp('1', 10000000)];
                case 2:
                    _d.sent();
                    return [4 /*yield*/, onramp('2', 10000000)];
                case 3:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _d.sent();
                    console.log('⚠️ Failed to onramp (maybe API not ready yet?)');
                    return [3 /*break*/, 5];
                case 5:
                    market = 'TATA_INR';
                    basePrice = 1000;
                    totalVolume = 0;
                    tradeCount = 0;
                    _d.label = 6;
                case 6:
                    _d.trys.push([6, 22, , 23]);
                    // First, place some sell orders at various prices (user 2)
                    console.log('📊 Placing initial sell orders...');
                    i = 0;
                    _d.label = 7;
                case 7:
                    if (!(i < 10)) return [3 /*break*/, 10];
                    price = (basePrice + i * 2).toString();
                    quantity = (Math.random() * 50 + 10).toFixed(2);
                    return [4 /*yield*/, placeOrder(market, price, quantity, 'sell', '2')];
                case 8:
                    _d.sent();
                    console.log("  Sell order: ".concat(quantity, " @ ").concat(price));
                    _d.label = 9;
                case 9:
                    i++;
                    return [3 /*break*/, 7];
                case 10:
                    // Place some buy orders at various prices (user 1)
                    console.log('\n📊 Placing initial buy orders...');
                    i = 0;
                    _d.label = 11;
                case 11:
                    if (!(i < 10)) return [3 /*break*/, 14];
                    price = (basePrice - i * 2).toString();
                    quantity = (Math.random() * 50 + 10).toFixed(2);
                    return [4 /*yield*/, placeOrder(market, price, quantity, 'buy', '1')];
                case 12:
                    _d.sent();
                    console.log("  Buy order: ".concat(quantity, " @ ").concat(price));
                    _d.label = 13;
                case 13:
                    i++;
                    return [3 /*break*/, 11];
                case 14:
                    console.log('\n💹 Generating matching trades...\n');
                    _d.label = 15;
                case 15:
                    if (!(totalVolume < 1000)) return [3 /*break*/, 21];
                    priceChange = (Math.random() - 0.5) * 10;
                    basePrice = Math.max(950, Math.min(1050, basePrice + priceChange));
                    price = basePrice.toFixed(2);
                    quantity = (Math.random() * 30 + 5).toFixed(2);
                    side = tradeCount % 2 === 0 ? 'buy' : 'sell';
                    userId = side === 'buy' ? '1' : '2';
                    _d.label = 16;
                case 16:
                    _d.trys.push([16, 18, , 19]);
                    return [4 /*yield*/, placeOrder(market, price, quantity, side, userId)];
                case 17:
                    result = _d.sent();
                    if (result.executedQty > 0) {
                        qty = parseFloat(result.executedQty.toString());
                        totalVolume += qty;
                        tradeCount++;
                        console.log("\u2705 Trade #".concat(tradeCount, ": ").concat(side.toUpperCase(), " ").concat(result.executedQty, " @ ").concat(price, " | Total Volume: ").concat(totalVolume.toFixed(2)));
                    }
                    else {
                        console.log("\uD83D\uDCDD Order placed in book: ".concat(side.toUpperCase(), " ").concat(quantity, " @ ").concat(price));
                    }
                    return [3 /*break*/, 19];
                case 18:
                    error_1 = _d.sent();
                    console.log("\u26A0\uFE0F Order failed: ".concat(((_b = (_a = error_1.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error) || error_1.message));
                    return [3 /*break*/, 19];
                case 19: 
                // Small delay between orders
                return [4 /*yield*/, sleep(100)];
                case 20:
                    // Small delay between orders
                    _d.sent();
                    return [3 /*break*/, 15];
                case 21:
                    console.log('\n✨ Trade generation complete!');
                    console.log("\uD83D\uDCC8 Total trades: ".concat(tradeCount));
                    console.log("\uD83D\uDCCA Total volume: ".concat(totalVolume.toFixed(2), " TATA"));
                    console.log('\n⏳ Wait for cron job to refresh materialized views (10 seconds)');
                    console.log('🔄 Then refresh your browser to see the new candles!');
                    return [3 /*break*/, 23];
                case 22:
                    error_2 = _d.sent();
                    console.error('❌ Error:', ((_c = error_2.response) === null || _c === void 0 ? void 0 : _c.data) || error_2.message);
                    console.log('\n⚠️ Make sure these services are running:');
                    console.log('  1. Engine: cd engine && npm run dev');
                    console.log('  2. API: cd api && npm run dev');
                    console.log('  3. Redis: docker-compose up -d');
                    return [3 /*break*/, 23];
                case 23: return [2 /*return*/];
            }
        });
    });
}
generateTrades();
