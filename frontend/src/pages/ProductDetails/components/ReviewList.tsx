import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { API_URL } from '../../../config/api';
import { useAuth } from '../../../contexts/AuthContext';

interface Review {
  _id: string;
  user: {
    name: string;
  };
  rating: number;
  title: string;
  comment: string;
  images: string[];
  createdAt: string;
  helpfulVotes: number;
  isVerifiedPurchase: boolean;
}

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch(`${API_URL}/reviews/product/${productId}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch reviews');
      }
      
      const data = await response.json();
      console.log('Fetched reviews:', data); // Debug log
      setReviews(data);
    } catch (err: any) {
      console.error('Error fetching reviews:', err);
      setError(err.message || 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleHelpfulClick = async (reviewId: string) => {
    if (!token) {
      setError('Please log in to mark reviews as helpful');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/reviews/${reviewId}/helpful`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to mark review as helpful');
      }
      
      const data = await response.json();
      
      // Update the helpfulVotes count in the UI
      setReviews(prevReviews => 
        prevReviews.map(review => 
          review._id === reviewId 
            ? { ...review, helpfulVotes: data.helpfulVotes }
            : review
        )
      );
    } catch (error: any) {
      console.error('Error marking review as helpful:', error);
      setError(error.message || 'Failed to mark review as helpful');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF66C4]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="space-y-8">
      {/* Reviews Summary */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= averageRating
                    ? 'fill-[#F6A429] text-[#F6A429]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <p className="text-lg font-medium">
            {averageRating.toFixed(1)} out of 5
          </p>
          <p className="text-gray-500">
            Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-200 pb-8">
            {/* Review Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-medium">{review.user.name}</h3>
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
                  {review.isVerifiedPurchase && (
                    <span className="text-xs text-green-600 font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Review Title & Content */}
            <h4 className="font-medium mb-2">{review.title}</h4>
            <p className="text-gray-600 mb-4">{review.comment}</p>

            {/* Review Images */}
            {review.images && review.images.length > 0 && (
              <div className="flex gap-4 mb-4">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Helpful Button */}
            <button
              onClick={() => handleHelpfulClick(review._id)}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#FF66C4] transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful ({review.helpfulVotes})
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList; 