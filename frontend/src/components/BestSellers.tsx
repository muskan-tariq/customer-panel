import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';

const BestSellers = () => {
  const { products, loading, error } = useProducts('best-sellers');

  // Only show first 4 products
  const displayProducts = products.slice(0, 4);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium text-center mb-8">Best Sellers</h2>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF66C4]"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium text-center mb-8">Best Sellers</h2>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium text-center mb-8">Best Sellers</h2>
          <div className="text-center text-gray-500">No products found</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Best Sellers</h2>
          <Link 
            to="/products/best-sellers"
            className="text-sm text-[#FF66C4] hover:text-[#ff4db4] font-medium"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <Link 
              key={product._id} 
              to={`/products/best-sellers/${product._id}`}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative mb-3">
                {/* Discount Tag */}
                               {/* Discount Tag */}
                               {product.discount && product.discount > 0 && (
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
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              <h3 className="text-sm font-medium mb-1 group-hover:text-[#FF66C4] text-[#303030]">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className={`w-3 h-3 ${
                        i < Math.floor(product.rating)
                          ? 'fill-[#F6A429] text-[#F6A429]'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.numReviews})</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
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
    </section>
  );
};

export default BestSellers;