import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import ReviewForm from './ReviewForm';
import { fetchProductReviews, markReviewHelpful } from '../../../services/api';

interface Review {
  _id: string;
  user: {
    _id: string;
    name: string;
  };
  rating: number;
  title: string;
  comment: string;
  images: string[];
  createdAt: string;
  isVerifiedPurchase: boolean;
  helpfulVotes: number;
  status: string;
}

interface ProductReviewsProps {
  productId: string;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ productId }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await fetchProductReviews(productId);
      setReviews(data);
    } catch (error) {
      console.error('Fetch reviews error:', error);
      setError('Failed to load reviews. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleHelpful = async (reviewId: string) => {
    try {
      const data = await markReviewHelpful(reviewId);
      // Update the helpfulVotes count in the UI
      setReviews(reviews.map(review =>
        review._id === reviewId
          ? { ...review, helpfulVotes: data.helpfulVotes }
          : review
      ));
    } catch (error) {
      console.error('Mark helpful error:', error);
    }
  };

  const averageRating = reviews.length
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF66C4]"></div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Reviews Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-medium text-gray-900">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-5 h-5 ${
                    star <= Math.round(averageRating)
                      ? 'fill-[#F6A429] text-[#F6A429]'
                      : 'fill-gray-200 text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              Based on {reviews.length} reviews
            </span>
          </div>
        </div>

        {user && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="px-6 py-2 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {error ? (
        <div className="text-center text-red-500 py-4">{error}</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No reviews yet. Be the first to review this product!
        </div>
      ) : (
        /* Review List */
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review._id} className="border-b border-gray-200 pb-8">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user.name}</span>
                    {review.isVerifiedPurchase && (
                      <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= review.rating
                              ? 'fill-[#F6A429] text-[#F6A429]'
                              : 'fill-gray-200 text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleHelpful(review._id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpfulVotes})</span>
                </button>
              </div>

              <h3 className="font-medium mt-4 mb-2">{review.title}</h3>
              <p className="text-gray-600 mb-4">{review.comment}</p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="grid grid-cols-4 gap-4 mt-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative aspect-square">
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={productId}
          onSubmit={() => {
            fetchReviews();
            setShowReviewForm(false);
          }}
          onClose={() => setShowReviewForm(false)}
        />
      )}
    </div>
  );
};

export default ProductReviews; 