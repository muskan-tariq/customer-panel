import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductGridProps {
  viewType: 'grid4' | 'grid9';
}

const ProductGrid = ({ viewType }: ProductGridProps) => {
  const products = [
    // ... existing products array ...
  ];

  return (
    <div className={`grid ${viewType === 'grid4' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5'} gap-4 md:gap-6`}>
      {products.map((product) => (
        <Link 
          key={product.id} 
          to={`/products/sunscreen/${product.id}`}
          className="group hover:shadow-lg transition-shadow duration-300"
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
                {[...Array(product.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="h-3 w-3 fill-[#F6A429] text-[#F6A429]"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
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
      ))}
    </div>
  );
};

export default ProductGrid;
