const Wallet = require('../models/Wallet');
const Exchange = require('../models/Exchange');
const { getTokenBalances } = require('../services/web3.service');
const { getExchangeBalances } = require('../services/exchange.service');
const { getTokenPrices } = require('../services/price.service');

exports.getPortfolioData = async (req, res) => {
  try {
    // Get all wallets and exchanges for the user
    const wallets = await Wallet.find({ userId: req.user.id });
    const exchanges = await Exchange.find({ userId: req.user.id });

    // Fetch balances from wallets
    const walletBalances = await Promise.all(
      wallets.map(wallet => getTokenBalances(wallet.address))
    );

    // Fetch balances from exchanges
    const exchangeBalances = await Promise.all(
      exchanges.map(exchange => 
        getExchangeBalances(exchange.name, exchange.apiKey, exchange.apiSecret)
      )
    );

    // Combine all balances
    const allBalances = [...walletBalances.flat(), ...exchangeBalances.flat()];

    // Group balances by token
    const groupedBalances = allBalances.reduce((acc, balance) => {
      if (!acc[balance.symbol]) {
        acc[balance.symbol] = {
          symbol: balance.symbol,
          name: balance.name,
          balance: 0,
          valueUSD: 0
        };
      }
      acc[balance.symbol].balance += parseFloat(balance.balance);
      return acc;
    }, {});

    // Get current prices and calculate total values
    const symbols = Object.keys(groupedBalances);
    const prices = await getTokenPrices(symbols);

    const tokens = Object.values(groupedBalances).map(token => ({
      ...token,
      valueUSD: token.balance * (prices[token.symbol]?.usd || 0),
      change24h: prices[token.symbol]?.usd_24h_change || 0
    }));

    res.json({
      tokens,
      totalValueUSD: tokens.reduce((sum, token) => sum + token.valueUSD, 0)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 