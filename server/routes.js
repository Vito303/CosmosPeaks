const express = require('express');
const router = express.Router();

const peakService = require('./peak.service');

router.get('/peaks', (req, res) => {
  peakService.getPeaks(req, res);
});

router.post('/peak', (req, res) => {
  peakService.postPeak(req, res);
});

module.exports = router;
