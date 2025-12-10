const express = require('express');
const router = express.Router();
const coinController = require('../controllers/coin.controller')

router.get('/', coinController.getCoins);

router.get('/:id', coinController.getCoinDetailsById);

module.exports = router;