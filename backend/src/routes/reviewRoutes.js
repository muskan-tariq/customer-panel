const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const auth = require('../middleware/auth');

// @route   GET /api/reviews/product/:productId
// @desc    Get reviews for a product
// @access  Public
router.get('/product/:productId', reviewController.getProductReviews);

// @route   POST /api/reviews
// @desc    Create a review
// @access  Private
router.post('/', auth, reviewController.createReview);

// @route   PUT /api/reviews/:id
// @desc    Update a review
// @access  Private
router.put('/:id', auth, reviewController.updateReview);

// @route   DELETE /api/reviews/:id
// @desc    Delete a review
// @access  Private
router.delete('/:id', auth, reviewController.deleteReview);

// @route   GET /api/reviews/user
// @desc    Get user's reviews
// @access  Private
router.get('/user', auth, reviewController.getUserReviews);

// @route   PUT /api/reviews/:id/helpful
// @desc    Mark review as helpful
// @access  Public
router.put('/:id/helpful', reviewController.markReviewHelpful);

// @route   PUT /api/reviews/:id/report
// @desc    Report a review
// @access  Public
router.put('/:id/report', reviewController.reportReview);

// @route   GET /api/reviews/admin
// @desc    Admin: Get all reviews
// @access  Private/Admin
router.get('/admin', auth, reviewController.getAdminReviews);

// @route   PUT /api/reviews/:id/status
// @desc    Admin: Update review status
// @access  Private/Admin
router.put('/:id/status', auth, reviewController.updateReviewStatus);

module.exports = router;