const express = require('express');
const router = express.Router();
const { enhanceSummary, improveBullets, suggestSkills, atsScore } = require('../controllers/aiController');

router.post('/enhance-summary', enhanceSummary);
router.post('/improve-bullets', improveBullets);
router.post('/suggest-skills', suggestSkills);
router.post('/ats-score', atsScore);

module.exports = router; 