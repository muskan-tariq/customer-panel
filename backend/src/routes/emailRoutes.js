const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// @route   POST /api/email/contact
// @desc    Send contact form email
// @access  Public
router.post('/contact', emailController.sendContactEmail);

module.exports = router; 