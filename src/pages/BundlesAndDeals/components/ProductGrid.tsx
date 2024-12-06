import { Star } from 'lucide-react';

interface ProductGridProps {
  viewType: 'grid4' | 'grid9';
}

const ProductGrid = ({ viewType }: ProductGridProps) => {
  const products = [
    {
      id: 1,
      name: "Glow Essentials Duo Kit",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Web_pic001_400x.png?v=1671778694",
      price: 1899,
      originalPrice: 2499,
      discount: 25,
      reviews: 128,
      rating: 4.8,
      tag: "Best Value"
    },
    {
      id: 2,
      name: "Hydration Trio Set",
      image: "https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731",
      price: 2499,
      originalPrice: 3299,
      discount: 30,
      reviews: 95,
      rating: 4.9,
      tag: "Most Popular"
    },
    {
      id: 3,
      name: "Anti-Aging Power Pack",
      image: "https://www.tuffyorganics.com/cdn/shop/products/SkinRescueBundle-web_400x.png?v=1675267403",
      price: 3299,
      originalPrice: 4499,
      discount: 35,
      reviews: 76,
      rating: 4.7,
      tag: "Limited Edition"
    },
    {
      id: 4,
      name: "Brightening Duo Kit",
      image: "https://www.tuffyorganics.com/cdn/shop/files/Group1_400x.jpg?v=1690554340",
      price: 1699,
      originalPrice: 2299,
      discount: 30,
      reviews: 112,
      rating: 4.8
    },
    {
      id: 5,
      name: "Acne Control Value Set",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Tinted-Lip-Treat-Bundle--product-image_400x.jpg?v=1681979111",
      price: 2199,
      originalPrice: 2999,
      discount: 40,
      reviews: 89,
      rating: 4.6,
      tag: "New"
    },
    {
      id: 6,
      name: "Complete Skincare Bundle",
      image: "https://www.tuffyorganics.com/cdn/shop/files/hair-essential-duo---product-image-01_400x.jpg?v=1687524443",
      price: 4499,
      originalPrice: 5999,
      discount: 45,
      reviews: 154,
      rating: 4.9,
      tag: "Best Seller"
    },
    {
      id: 7,
      name: "Morning Routine Trio",
      image: "https://www.tuffyorganics.com/cdn/shop/products/finalmas_400x.jpg?v=1667896859",
      price: 2799,
      originalPrice: 3599,
      discount: 35,
      reviews: 67,
      rating: 4.7
    },
    {
      id: 8,
      name: "Night Care Duo Kit",
      image: "https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109",
      price: 1999,
      originalPrice: 2599,
      discount: 30,
      reviews: 93,
      rating: 4.8,
      tag: "Trending"
    },
    {
      id: 9,
      name: "Luxury Skincare Collection",
      image: "https://www.tuffyorganics.com/cdn/shop/products/PicturePerfect_400x.png?v=1643889395",
      price: 5999,
      originalPrice: 7999,
      discount: 40,
      reviews: 45,
      rating: 4.9,
      tag: "Premium"
    },
    {
      id: 10,
      name: "Sensitive Skin Duo",
      image: "https://www.tuffyorganics.com/cdn/shop/products/serum-duo---product-image2_400x.png?v=1678266108",
      price: 1799,
      originalPrice: 2399,
      discount: 25,
      reviews: 78,
      rating: 4.7
    },
    {
      id: 11,
      name: "Pore Care Bundle",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Ad-6webcopy_400x.jpg?v=1666955126",
      price: 2299,
      originalPrice: 2999,
      discount: 30,
      reviews: 112,
      rating: 4.6,
      tag: "Popular"
    },
    {
      id: 12,
      name: "Vitamin C Power Set",
      image: "https://www.tuffyorganics.com/cdn/shop/files/intense-hydration-bundle-2_1_400x.png?v=1699996289",
      price: 2699,
      originalPrice: 3499,
      discount: 35,
      reviews: 89,
      rating: 4.8
    },
    {
      id: 13,
      name: "Ultimate Glow Kit",
      image: "https://www.tuffyorganics.com/cdn/shop/products/ultimate-skin-corrector-bundle---product-image_400x.png?v=1677241431",
      price: 3999,
      originalPrice: 5299,
      discount: 40,
      reviews: 156,
      rating: 4.9,
      tag: "Best Value"
    },
    {
      id: 14,
      name: "Hydration Heroes Set",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Saga_Rapid_Essential_400x.png?v=1675278467",
      price: 2899,
      originalPrice: 3799,
      discount: 30,
      reviews: 92,
      rating: 4.7
    },
    {
      id: 15,
      name: "Radiance Boost Duo",
      image: "https://www.tuffyorganics.com/cdn/shop/files/rn-image_picker_lib_temp_b70d48be-e9f7-4dff-9083-9759bb65205f_400x.png?v=1714890118",
      price: 1999,
      originalPrice: 2599,
      discount: 25,
      reviews: 78,
      rating: 4.6
    },
    {
      id: 16,
      name: "Anti-Aging Essentials",
      image: "https://www.tuffyorganics.com/cdn/shop/files/DSC6372_400x.png?v=1716401109",
      price: 4299,
      originalPrice: 5699,
      discount: 35,
      reviews: 134,
      rating: 4.8,
      tag: "Premium"
    },
    {
      id: 17,
      name: "Clear Skin Bundle",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Web_pic002_400x.png?v=1671778864",
      price: 2499,
      originalPrice: 3299,
      discount: 30,
      reviews: 167,
      rating: 4.7,
      tag: "Popular"
    },
    {
      id: 18,
      name: "Daily Essentials Kit",
      image: "https://www.tuffyorganics.com/cdn/shop/files/IMG-8316_73366387-5f49-45c0-b48c-4f74bcc57864_400x.jpg?v=1700684078",
      price: 1899,
      originalPrice: 2499,
      discount: 25,
      reviews: 89,
      rating: 4.6
    },
    {
      id: 19,
      name: "Luxury Night Care Set",
      image: "https://www.tuffyorganics.com/cdn/shop/products/TintTrio_img_400x.png?v=1675627371",
      price: 3799,
      originalPrice: 4999,
      discount: 35,
      reviews: 112,
      rating: 4.9,
      tag: "Limited Edition"
    },
    {
      id: 20,
      name: "Complete Beauty Bundle",
      image: "https://www.tuffyorganics.com/cdn/shop/products/FuchsiaDuo-web_400x.png?v=1675239814",
      price: 5999,
      originalPrice: 7999,
      discount: 40,
      reviews: 178,
      rating: 4.8,
      tag: "Best Seller"
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