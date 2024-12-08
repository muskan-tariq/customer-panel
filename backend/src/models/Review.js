const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  images: [{ type: String }], // Optional review images
  isVerifiedPurchase: { type: Boolean, default: false },
  helpfulVotes: { type: Number, default: 0 },
  reportCount: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Compound index to prevent multiple reviews from same user for same product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Post-save middleware to update product rating
reviewSchema.post('save', async function() {
  const Review = this.constructor;
  const Product = mongoose.model('Product');
  
  // Calculate average rating
  const stats = await Review.aggregate([
    { $match: { product: this.product, status: 'approved' } },
    { 
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        numReviews: { $sum: 1 }
      }
    }
  ]);

  // Update product
  if (stats.length > 0) {
    await Product.findByIdAndUpdate(this.product, {
      rating: stats[0].avgRating,
      numReviews: stats[0].numReviews
    });
  } else {
    await Product.findByIdAndUpdate(this.product, {
      rating: 0,
      numReviews: 0
    });
  }
});

module.exports = mongoose.model('Review', reviewSchema);