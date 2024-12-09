import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ChevronDown, Truck, Shield, ArrowLeft, Check } from 'lucide-react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import ImageGallery from './components/ImageGallery';
import { useCart } from '../../contexts/CartContext';
import { API_URL } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';
import ReviewList from './components/ReviewList';
import ReviewForm from './components/ReviewForm';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  stock: number;
  images: string[];
  rating: number;
  numReviews: number;
  seller: {
    _id: string;
    name: string;
  };
  discount: number;
  soldCount: number;
  skinType: Record<string, boolean>;
  concern: Record<string, boolean>;
  ingredients: string[];
  features: string[];
  isBundle: boolean;
  bundleItems?: Array<{
    product: Product;
    quantity: number;
  }>;
  howToUse?: string;
  createdAt: string;
  relatedProducts?: Product[];
}

const ProductDetails = () => {
  const { category, id } = useParams<{ category: string; id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'ingredients' | 'how-to-use'>('description');
  const { addItem, setIsCartOpen } = useCart();
  const { user } = useAuth();

  const tabs = ['description', 'ingredients', 'how-to-use'];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err: any) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (newQuantity: number) => {
    if (!product) return;
    if (newQuantity < 1) return;
    if (newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      await addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        image: product.images[0],
        category: product.category
      });
      setIsCartOpen(true);
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      alert(err.message || 'Failed to add item to cart. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FF66C4]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            {error || 'Product not found'}
          </h2>
          <Link
            to="/"
            className="text-[#FF66C4] hover:text-[#ff4db7]"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ImageGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-medium text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-gray-900">₱{product.price.toLocaleString()}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="p-2 border rounded-l hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-t border-b">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="p-2 border rounded-r hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className={`w-full py-3 px-6 rounded-md text-white font-medium
                ${product.stock ? 'bg-[#FF66C4] hover:bg-[#ff4db7]' : 'bg-gray-300 cursor-not-allowed'}
              `}
            >
              {product.stock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Details Tabs */}
            <div className="mt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab as any)}
                      className={`pb-2 ${
                        selectedTab === tab
                          ? 'border-b-2 border-[#FF66C4] text-[#FF66C4]'
                          : 'text-gray-600'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="prose max-w-none">
                {selectedTab === 'description' && (
                  <>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <Check className="w-5 h-5 text-green-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {selectedTab === 'ingredients' && (
                  <ul className="space-y-2">
                    {product.ingredients?.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-600">
                        <Check className="w-5 h-5 text-green-500" />
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
                {selectedTab === 'how-to-use' && (
                  <p className="text-gray-600">{product.howToUse || 'No usage instructions available.'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-medium text-gray-900">Customer Reviews</h2>
              {user ? (
                <button
                  onClick={() => setIsReviewModalOpen(true)}
                  className="px-6 py-2 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
                >
                  Write a Review
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-6 py-2 bg-[#FF66C4] text-white rounded-md hover:bg-[#ff4db7] transition-colors"
                >
                  Login to Review
                </Link>
              )}
            </div>

            <ReviewList productId={product._id} />
          </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && (
          <ReviewForm
            productId={product._id}
            onSubmit={() => {
              // Force refresh of reviews after submission
              window.location.reload();
            }}
            onClose={() => setIsReviewModalOpen(false)}
          />
        )}

        {/* Related Products */}
        <div className="mt-16">
          <RelatedProducts 
            category={product.category} 
            currentProductId={product._id} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 