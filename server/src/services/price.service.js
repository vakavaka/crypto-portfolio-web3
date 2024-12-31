const axios = require('axios');

exports.getTokenPrices = async (symbols) => {
  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price`,
      {
        params: {
          ids: symbols.join(','),
          vs_currencies: 'usd',
          include_24hr_change: true
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return {};
  }
};