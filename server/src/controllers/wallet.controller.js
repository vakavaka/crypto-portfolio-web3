const Wallet = require('../models/Wallet');
const { Web3 } = require('web3');
const { getTokenBalances } = require('../services/web3.service');

const web3 = new Web3(process.env.ETH_NODE_URL || 'https://eth-mainnet.g.alchemy.com/v2/your-api-key');

exports.addWallet = async (req, res) => {
  try {
    const { address } = req.body;

    // Validate address
    if (!web3.utils.isAddress(address)) {
      return res.status(400).json({ message: 'Invalid Ethereum address' });
    }

    const wallet = new Wallet({
      address,
      userId: req.user.id, // You'll need to implement authentication
    });

    await wallet.save();
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ userId: req.user.id });
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteWallet = async (req, res) => {
  try {
    await Wallet.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 