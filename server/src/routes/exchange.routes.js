const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchange.controller');

router.post('/', exchangeController.addExchange);
router.get('/', exchangeController.getExchanges);
router.delete('/:id', exchangeController.deleteExchange);

module.exports = router;