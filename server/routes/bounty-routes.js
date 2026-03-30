const express = require('express');
const { getBounties } = require('../controllers/bounty-controller');
const router = express.Router();

router.get('/list', getBounties);

module.exports = router;
