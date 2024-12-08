import { Star } from 'lucide-react';

const RecentlyViewed = () => {
  const recentProducts = [
    {
      id: 1,
      name: "Glow Essentials Duo Kit",
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2574&auto=format&fit=crop",
      price: 1899,
      originalPrice: 2499,
      discount: 25,
      reviews: 128,
      rating: 4.8
    },
    {
      id: 2,
      name: "Hydration Trio Set",
      image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=2574&auto=format&fit=crop",
      price: 2499,
      originalPrice: 3299,
      discount: 30,
      reviews: 95,
      rating: 4.9
    },
    {
      id: 3,
      name: "Anti-Aging Power Pack",
      image: "https://images.unsplash.com/photo-1614806687394-7e093b514592?q=80&w=2574&auto=format&fit=crop",
      price: 3299,
      originalPrice: 4499,
      discount: 35,
      reviews: 76,
      rating: 4.7
    },
    {
      id: 4,
      name: "Brightening Duo Kit",
      image: "https://images.unsplash.com/photo-1611080002340-38def1d7c2d5?q=80&w=2574&auto=format&fit=crop",
      price: 1699,
      originalPrice: 2299,
      discount: 30,
      reviews: 112,
      rating: 4.8
    }
  ];

  return (
    <div>
      {/* Title */}
      <div className="text-center mt-16 mb-8">
        <h2 className="text-2xl font-medium text-[#303030]">Recently Viewed</h2>
      </div>

      {/* Border Line */}
      <div className="border-b border-gray-200 mb-8"></div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recentProducts.map((product) => (
          <div key={product.id} className="group text-center mb-4">
            <div className="relative mb-3">
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5">
                  {product.discount}% OFF
                </span>
              )}
              <div className="aspect-square w-full overflow-hidden max-w-[230px] mx-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="font-medium text-[#E31837]">₱{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  ₱{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed; 