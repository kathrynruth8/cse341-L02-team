// routes/professionalRoutes.js

const express = require('express');
const router = express.Router();
const {
  getProfessionalData,
} = require('../controllers/professionalController');

// GET /professional
router.get('/professional', getProfessionalData);

module.exports = router;
