import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Minus, Plus, ChevronDown, Truck, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductReviews from './components/ProductReviews';
import RelatedProducts from './components/RelatedProducts';
import ImageGallery from './components/ImageGallery';
import { useCart } from '../../contexts/CartContext';
import { API_URL } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

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
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState<'description' | 'ingredients' | 'how-to-use'>('description');
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { addItem } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/products/${id}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {error || 'Product not found'}
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Go Back
        </button>
      </div>
    );
  }

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert('Please log in to add items to cart');
      return;
    }

    try {
      await addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: quantity
      });
      // Success notification or redirect logic here
    } catch (err) {
      console.error('Error adding to cart:', err);
      // Error notification logic here
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <ImageGallery images={product.images} />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <span className="ml-2 text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                  <span className="ml-2 text-sm text-green-600">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-5 h-5 ${
                      index < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.numReviews} reviews)</span>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border rounded-l hover:bg-gray-50"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-t border-b">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 border rounded-r hover:bg-gray-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.stock}
              className={`w-full py-3 px-6 rounded-md text-white font-medium mb-6 ${
                product.stock ? 'bg-[#FF66C4] hover:bg-[#ff4db7]' : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {product.stock ? 'Add to Cart' : 'Out of Stock'}
            </button>

            {/* Product Information Tabs */}
            <div className="border-t pt-6">
              <div className="flex space-x-6 mb-6">
                {['description', 'ingredients', 'how-to-use'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab as any)}
                    className={`pb-2 ${
                      selectedTab === tab
                        ? 'border-b-2 border-[#FF66C4] text-[#FF66C4]'
                        : 'text-gray-600'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace(/-/g, ' ')}
                  </button>
                ))}
              </div>

              <div className="prose max-w-none">
                {selectedTab === 'description' && (
                  <>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                    <ul className="space-y-2">
                      {product.features?.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-600">
                          <span className="w-1.5 h-1.5 bg-[#FF66C4] rounded-full"></span>
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
                        <span className="w-1.5 h-1.5 bg-[#FF66C4] rounded-full"></span>
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
          <ProductReviews productId={product._id} />
        </div>

        {/* Related Products */}
        {product.relatedProducts && product.relatedProducts.length > 0 && (
          <div className="mt-16">
            <RelatedProducts products={product.relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails; 