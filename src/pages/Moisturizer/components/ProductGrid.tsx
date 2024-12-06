import { Star } from 'lucide-react';

interface ProductGridProps {
  viewType: 'grid4' | 'grid9';
}

const ProductGrid = ({ viewType }: ProductGridProps) => {
  const products = [
    {
      id: 1,
      name: "Hydrating Face Moisturizer",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer_400x.png?v=1675278467",
      price: 899,
      originalPrice: 1299,
      discount: 30,
      reviews: 128,
      rating: 4.8,
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Nourishing Night Cream",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer2_400x.png?v=1675278468",
      price: 999,
      originalPrice: 1499,
      discount: 33,
      reviews: 95,
      rating: 4.9,
      tag: "Most Popular"
    },
    {
      id: 3,
      name: "Oil-Free Daily Moisturizer",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer3_400x.png?v=1675278469",
      price: 799,
      originalPrice: 1199,
      discount: 33,
      reviews: 76,
      rating: 4.7,
      tag: "New"
    },
    {
      id: 4,
      name: "Anti-Aging Moisturizer",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer4_400x.png?v=1675278470",
      price: 1299,
      originalPrice: 1799,
      discount: 28,
      reviews: 112,
      rating: 4.8
    },
    {
      id: 5,
      name: "Sensitive Skin Moisturizer",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer5_400x.png?v=1675278471",
      price: 849,
      originalPrice: 1199,
      discount: 29,
      reviews: 89,
      rating: 4.6,
      tag: "Gentle"
    },
    {
      id: 6,
      name: "Brightening Day Cream",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer6_400x.png?v=1675278472",
      price: 1099,
      originalPrice: 1599,
      discount: 31,
      reviews: 154,
      rating: 4.9,
      tag: "Popular"
    },
    {
      id: 7,
      name: "Hydra-Boost Gel Cream",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer7_400x.png?v=1675278473",
      price: 949,
      originalPrice: 1399,
      discount: 32,
      reviews: 67,
      rating: 4.7
    },
    {
      id: 8,
      name: "Collagen Moisture Cream",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer8_400x.png?v=1675278474",
      price: 1199,
      originalPrice: 1699,
      discount: 29,
      reviews: 93,
      rating: 4.8,
      tag: "Anti-Aging"
    },
    {
      id: 9,
      name: "Natural Daily Moisturizer",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer9_400x.png?v=1675278475",
      price: 749,
      originalPrice: 999,
      discount: 25,
      reviews: 45,
      rating: 4.6
    },
    {
      id: 10,
      name: "Advanced Repair Cream",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Moisturizer10_400x.png?v=1675278476",
      price: 1399,
      originalPrice: 1999,
      discount: 30,
      reviews: 78,
      rating: 4.9,
      tag: "Premium"
    }
  ];

  return (
    <>
      <div className={`grid gap-4 ${
        viewType === 'grid4' 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
      } max-w-[1536px] mx-auto`}>
        {products.map((product) => (
          <div key={product.id} className="group text-center bg-white p-2 relative">
            <div className="relative mb-2">
              {/* Discount Tag */}
              {product.discount > 0 && (
                <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5 z-10">
                  {product.discount}% OFF
                </span>
              )}
              
              {/* Special Tag */}
              {product.tag && (
                <span className="absolute top-2 right-2 bg-[#FF66C4] text-white text-[10px] px-1.5 py-0.5 z-10">
                  {product.tag}
                </span>
              )}

              {/* Product Image */}
              <div className="aspect-square w-full overflow-hidden max-w-[280px] mx-auto">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Product Info */}
            <h3 className="text-sm font-medium mb-0 group-hover:text-[#FF66C4] px-2 text-[#333333] line-clamp-2 min-h-[32px]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center justify-center gap-1.5 -mt-1">
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

            {/* Price */}
            <div className="flex items-center justify-center gap-1.5 -mt-0.5">
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

      {/* Recently Viewed Section */}
      <div className="max-w-[1536px] mx-auto mt-16">
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-medium text-[#303030]">Recently Viewed</h2>
        </div>

        {/* Border Line */}
        <div className="border-b border-gray-200 mb-8"></div>

        {/* Recently Viewed Products Grid */}
        <div className={`grid gap-4 ${
          viewType === 'grid4' 
            ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
            : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
        }`}>
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="group text-center bg-white p-2 relative">
              <div className="relative mb-2">
                {/* Discount Tag */}
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-white text-black text-[10px] px-1.5 py-0.5 z-10">
                    {product.discount}% OFF
                  </span>
                )}
                
                {/* Special Tag */}
                {product.tag && (
                  <span className="absolute top-2 right-2 bg-[#FF66C4] text-white text-[10px] px-1.5 py-0.5 z-10">
                    {product.tag}
                  </span>
                )}

                {/* Product Image */}
                <div className="aspect-square w-full overflow-hidden max-w-[280px] mx-auto">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Product Info */}
              <h3 className="text-sm font-medium mb-0 group-hover:text-[#FF66C4] px-2 text-[#333333] line-clamp-2 min-h-[32px]">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center justify-center gap-1.5 -mt-1">
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

              {/* Price */}
              <div className="flex items-center justify-center gap-1.5 -mt-0.5">
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
    </>
  );
};

export default ProductGrid; 