const { Spot } = require('@binance/connector');
const BitgetClient = require('bitget-api');

exports.getExchangeBalances = async (exchange, apiKey, apiSecret) => {
  switch (exchange) {
    case 'Binance':
      return getBinanceBalances(apiKey, apiSecret);
    case 'BitGet':
      return getBitgetBalances(apiKey, apiSecret);
    default:
      throw new Error('Unsupported exchange');
  }
};

async function getBinanceBalances(apiKey, apiSecret) {
  const client = new Spot(apiKey, apiSecret);
  const { data } = await client.account();
  
  return data.balances
    .filter(balance => parseFloat(balance.free) > 0)
    .map(balance => ({
      symbol: balance.asset,
      name: balance.asset,
      balance: parseFloat(balance.free) + parseFloat(balance.locked)
    }));
}

async function getBitgetBalances(apiKey, apiSecret) {
  const client = new BitgetClient({
    apiKey,
    apiSecret,
    apiPass: '' // BitGet requires an API passphrase
  });

  const balances = await client.spot().getAccounts();
  
  return balances
    .filter(balance => parseFloat(balance.available) > 0)
    .map(balance => ({
      symbol: balance.coinName,
      name: balance.coinName,
      balance: parseFloat(balance.available) + parseFloat(balance.frozen)
    }));
} 