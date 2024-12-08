import { Star } from 'lucide-react';

const RecentlyViewed = () => {
  const recentProducts = [
    {
      id: 1,
      name: "Daily Defense SPF 50+ Sunscreen",
      price: 999,
      originalPrice: 1299,
      discount: 23,
      rating: 5,
      reviews: 156,
      image: "https://www.tuffyorganics.com/cdn/shop/files/DSC6874_400x.png?v=1717482337"
    },
    {
      id: 2,
      name: "Ultra Light SPF 30 Sunscreen",
      price: 899,
      originalPrice: 1199,
      discount: 25,
      rating: 5,
      reviews: 142,
      image: "https://www.tuffyorganics.com/cdn/shop/files/DSC6902_400x.png?v=1719389704"
    },
    {
      id: 3,
      name: "SPF Power Trio Bundle",
      price: 1099,
      originalPrice: 1399,
      discount: 21,
      rating: 5,
      reviews: 128,
      image: "https://www.tuffyorganics.com/cdn/shop/files/SPF-Power-Trio---product-image_400x.jpg?v=1682590509"
    },
    {
      id: 4,
      name: "Mineral SPF 40 Sunscreen",
      price: 1199,
      originalPrice: 1499,
      discount: 20,
      rating: 5,
      reviews: 98,
      image: "https://www.tuffyorganics.com/cdn/shop/products/001-WebImg_1_400x.png?v=1675257393"
    }
  ];

  return (
    <div className="mt-16 mb-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-8 text-[#303030]">Recently Viewed</h2>
        <div className="h-[0.5px] bg-gray-200 w-screen -mx-4 md:-mx-8"></div>
      </div>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {recentProducts.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="relative mb-3">
              {/* Discount Tag */}
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5">
                  {product.discount}% OFF
                </span>
              )}

              {/* Product Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentlyViewed; 