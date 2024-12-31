const Exchange = require('../models/Exchange');
const { getExchangeBalances } = require('../services/exchange.service');

exports.addExchange = async (req, res) => {
  try {
    const { name, apiKey, apiSecret } = req.body;

    // Validate exchange credentials
    try {
      await getExchangeBalances(name, apiKey, apiSecret);
    } catch (error) {
      return res.status(400).json({ message: 'Invalid API credentials' });
    }

    const exchange = new Exchange({
      name,
      apiKey,
      apiSecret,
      userId: req.user.id, // You'll need to implement authentication
    });

    await exchange.save();
    res.status(201).json({
      id: exchange._id,
      name: exchange.name,
      createdAt: exchange.createdAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getExchanges = async (req, res) => {
  try {
    const exchanges = await Exchange.find({ userId: req.user.id })
      .select('-apiKey -apiSecret');
    res.json(exchanges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteExchange = async (req, res) => {
  try {
    await Exchange.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 