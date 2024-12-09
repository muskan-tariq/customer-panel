import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../hooks/useProducts';

interface ProductGridProps {
  products: Product[];
  viewType?: 'grid4' | 'grid5';
  isSearchResult?: boolean;
}

const ProductGrid = ({ products, viewType = 'grid4', isSearchResult = false }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8 bg-white">
        No products found.
      </div>
    );
  }

  const getGridClass = () => {
    return viewType === 'grid5'
      ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'
      : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4';
  };

  return (
    <div className={`grid ${getGridClass()} bg-white`}>
      {products.map((product) => (
        <Link 
          key={product._id} 
          to={`/products/${product.category}/${product._id}`}
          className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          {/* Product Image */}
          <div className="relative aspect-square">
            {/* Discount Tag */}
            {product.discount > 0 && (
              <span className="absolute top-2 left-2 bg-white text-black text-xs px-2 py-1 rounded-full z-10">
                {product.discount}% OFF
              </span>
            )}
            
            {/* Product Tag */}
            {product.tag && (
              <span className="absolute top-2 right-2 bg-[#FF66C4] text-white text-xs px-2 py-1 rounded-full z-10">
                {product.tag}
              </span>
            )}

            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Product Info */}
          <div className="p-4 bg-white">
            <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
              {product.name}
            </h3>

            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-200 fill-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.numReviews})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                ₱{product.price.toLocaleString()}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid; 