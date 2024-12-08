import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../hooks/useProducts';

interface ProductGridProps {
  products: Product[];
  viewType?: 'grid4' | 'grid5';
}

const ProductGrid = ({ products, viewType = 'grid4' }: ProductGridProps) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No products found in this category.
      </div>
    );
  }

  return (
    <div className="border-t border-gray-200 pt-8">
      <div className={`grid ${viewType === 'grid4' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4 md:gap-6`}>
        {products.map((product) => (
          <Link 
            key={product._id} 
            to={`/products/${product.category}/${product._id}`}
            className="group text-center mb-4 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative mb-3">
              {/* Discount Tag */}
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5 z-10">
                  {product.discount}% OFF
                </span>
              )}
              
              {/* Product Tag */}
              {product.tag && (
                <span className="absolute top-2 right-2 bg-[#FF66C4] text-white text-[10px] px-1.5 py-0.5 z-10">
                  {product.tag}
                </span>
              )}

              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden max-w-[230px] mx-auto">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            <h3 className="text-sm font-medium mb-1 group-hover:text-[#FF66C4] px-2 text-[#333333]">
              {product.name}
            </h3>

            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-2.5 w-2.5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-[#F6A429] text-[#F6A429]'
                        : 'fill-gray-200 text-gray-200'
                    } stroke-[1.5]`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.numReviews} reviews)</span>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="font-medium text-[#E31837]">₱{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid; 