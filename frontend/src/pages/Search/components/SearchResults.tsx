import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface SearchResultsProps {
  viewType: 'grid4' | 'grid9';
}

const SearchResults = ({ viewType }: SearchResultsProps) => {
  // Sample data - replace with actual data from your backend
  const products = [
    {
      id: 1,
      name: "Hydrating Face Cream",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 4.8,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      price: 1299,
      originalPrice: 1599,
      discount: 19,
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Nourishing Night Cream",
      price: 1099,
      originalPrice: 1399,
      discount: 21,
      rating: 4.7,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Anti-Aging Eye Cream",
      price: 1399,
      originalPrice: 1799,
      discount: 22,
      rating: 4.6,
      reviews: 98,
      image: "https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340"
    }
  ];

  return (
    <div className="w-full">
      <div 
        className={`grid gap-6 ${
          viewType === 'grid4' 
            ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        }`}
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link 
              to={`/products/search/${product.id}`}
              className="group block hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative mb-3">
                {/* Discount Tag */}
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5 z-10">
                    {product.discount}% OFF
                  </span>
                )}

                {/* Product Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center">
                <h3 className="text-sm font-medium mb-1 group-hover:text-[#FF66C4] text-[#303030]">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center justify-center gap-2 mb-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#F6A429] text-[#F6A429]'
                            : 'fill-gray-200 text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-center gap-2 text-sm">
                  <span className="font-medium text-[#E31837]">₱{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through">
                      ₱{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults; 