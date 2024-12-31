require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const walletRoutes = require('./routes/wallet.routes');
const exchangeRoutes = require('./routes/exchange.routes');
const portfolioRoutes = require('./routes/portfolio.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/wallets', walletRoutes);
app.use('/api/exchanges', exchangeRoutes);
app.use('/api/portfolio', portfolioRoutes);

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