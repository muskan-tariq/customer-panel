import React from 'react';
import { Link } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  description?: string;
  images: string[];
  rating: number;
  numReviews: number;
  category?: string;
  tag?: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    _id,
    name,
    price,
    originalPrice,
    discount,
    images,
    rating,
    numReviews,
    tag
  } = product;

  return (
    <Link to={`/product/${_id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg">
        {/* Discount Tag */}
        {discount && discount > 0 && (
          <div className="absolute left-0 top-0 z-10 bg-red-500 px-2 py-1 text-sm text-white">
            {discount}% OFF
          </div>
        )}
        
        {/* Product Tag */}
        {tag && (
          <div className="absolute right-0 top-0 z-10 bg-blue-500 px-2 py-1 text-sm text-white">
            {tag}
          </div>
        )}

        {/* Product Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={images[0]}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-medium text-gray-900">{name}</h3>
          
          <div className="mb-2 flex items-center">
            {/* Rating Stars */}
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`h-4 w-4 ${
                    index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({numReviews})</span>
          </div>

          {/* Price */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-gray-900">₹{price}</span>
            {originalPrice && originalPrice > price && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ₹{originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard; 