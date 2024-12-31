const express = require('express');
const router = express.Router();
const walletController = require('../controllers/wallet.controller');

router.post('/', walletController.addWallet);
router.get('/', walletController.getWallets);
router.delete('/:id', walletController.deleteWallet);

module.exports = router; 