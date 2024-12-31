/**
 * 🎁 Crypto Portfolio Tracker
 * ========================
 * 
 * A modern, mobile-first web application for tracking your cryptocurrency portfolio
 * across multiple wallets and exchanges. Built with React and Node.js.
 * 
 * Features:
 * 🔗 ERC20 Wallet Integration
 * 📊 Exchange API Support (Binance, BitGet)
 * 💰 Real-time Portfolio Valuation
 * 📈 Token Distribution Charts
 * 📱 Mobile-Responsive Design
 * 
 * Tech Stack:
 * - Frontend: React, Chakra UI, Chart.js
 * - Backend: Node.js, Express, MongoDB
 * - APIs: Web3, Binance, BitGet, CoinGecko
 * 
 * Created with ❤️ for the crypto community
 * 
 * Getting Started:
 * 1. Set up your environment variables in .env
 * 2. Install dependencies with npm install
 * 3. Run the server with npm start
 * 4. Connect your wallets and exchanges
 * 5. Start tracking your portfolio!
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./middleware/auth');

const authRoutes = require('./routes/auth.routes');
const walletRoutes = require('./routes/wallet.routes');
const exchangeRoutes = require('./routes/exchange.routes');
const portfolioRoutes = require('./routes/portfolio.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/wallets', auth, walletRoutes);
app.use('/api/exchanges', auth, exchangeRoutes);
app.use('/api/portfolio', auth, portfolioRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  }); 