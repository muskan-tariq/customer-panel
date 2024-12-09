const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ 
      product: req.params.productId,
      status: { $in: ['approved', 'pending'] } // Include both approved and pending reviews
    })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

    // Format the reviews to match the frontend interface
    const formattedReviews = reviews.map(review => ({
      _id: review._id,
      user: {
        name: review.user.name
      },
      rating: review.rating,
      title: review.title,
      comment: review.comment,
      images: review.images || [],
      createdAt: review.createdAt,
      helpfulVotes: review.helpfulVotes,
      isVerifiedPurchase: review.isVerifiedPurchase
    }));

    res.json(formattedReviews);
  } catch (error) {
    console.error('Error getting reviews:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Create a review
// @route   POST /api/reviews
const createReview = async (req, res) => {
  try {
    const { productId, rating, title, comment, images } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if user has already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user.userId,
      product: productId
    });

    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    // Create the review with images
    const review = new Review({
      user: req.user.userId,
      product: productId,
      rating,
      title,
      comment,
      images: images || [],
      status: 'approved', // Auto-approve reviews for now
      isVerifiedPurchase: false // You can update this based on your requirements
    });

    await review.save();

    // Update product rating and review count
    const allProductReviews = await Review.find({ 
      product: productId,
      status: 'approved'
    });

    const totalRating = allProductReviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / allProductReviews.length;

    product.rating = averageRating;
    product.numReviews = allProductReviews.length;
    await product.save();

    // Populate user information before sending response
    await review.populate('user', 'name');

    // Get updated product data
    const updatedProduct = await Product.findById(productId)
      .select('rating numReviews')
      .lean();

    res.status(201).json({
      success: true,
      review,
      product: {
        _id: productId,
        rating: updatedProduct.rating,
        numReviews: updatedProduct.numReviews
      }
    });
  } catch (error) {
    console.error('Review creation error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
const updateReview = async (req, res) => {
  try {
    const { rating, title, comment, images } = req.body;

    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the review belongs to the user
    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;
    review.images = images || review.images;
    review.status = 'pending'; // Reset status for re-approval

    await review.save();

    // Populate user information before sending response
    await review.populate('user', 'name');

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Check if the review belongs to the user or if user is admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await review.remove();

    res.json({ message: 'Review removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/user
const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('product', 'name images')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Mark review as helpful
// @route   PUT /api/reviews/:id/helpful
const markReviewHelpful = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.helpfulVotes += 1;
    await review.save();

    res.json({ helpfulVotes: review.helpfulVotes });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Report a review
// @route   PUT /api/reviews/:id/report
const reportReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.reportCount += 1;
    
    // If report count exceeds threshold, mark for moderation
    if (review.reportCount >= 5) {
      review.status = 'pending';
    }
    
    await review.save();

    res.json({ message: 'Review reported' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin: Get all reviews (with filters)
// @route   GET /api/reviews/admin
const getAdminReviews = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status, product } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (product) filter.product = product;

    const reviews = await Review.find(filter)
      .populate('user', 'name')
      .populate('product', 'name')
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Admin: Update review status
// @route   PUT /api/reviews/:id/status
const updateReviewStatus = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { status } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getUserReviews,
  markReviewHelpful,
  reportReview,
  getAdminReviews,
  updateReviewStatus
};