import { Star } from 'lucide-react';

interface ProductGridProps {
  viewType: 'grid4' | 'grid9';
}

const ProductGrid = ({ viewType }: ProductGridProps) => {
  const products = [
    {
      id: 1,
      name: 'Daily Duo Bundle',
      price: 973,
      originalPrice: 1498,
      discount: 35,
      reviews: 651,
      image: 'https://img.freepik.com/premium-psd/skin-care-moisturizing-cosmetic-premium-products_99236-254.jpg'
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      price: 599,
      originalPrice: 799,
      discount: 25,
      reviews: 428,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 3,
      name: 'Hydrating Face Cream',
      price: 449,
      originalPrice: 599,
      discount: 25,
      reviews: 312,
      image: 'https://plus.unsplash.com/premium_photo-1661630984481-e29093921ff7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D'
    },
    {
      id: 4,
      name: 'Anti-Aging Night Cream',
      price: 799,
      originalPrice: 999,
      discount: 20,
      reviews: 245,
      image: 'https://images.pexels.com/photos/6621329/pexels-photo-6621329.jpeg'
    },
    {
      id: 5,
      name: 'Gentle Cleansing Foam',
      price: 349,
      originalPrice: 449,
      discount: 22,
      reviews: 189,
      image: 'https://images.pexels.com/photos/6621334/pexels-photo-6621334.jpeg'
    },
    {
      id: 6,
      name: 'Ultimate Skincare Bundle',
      price: 1499,
      originalPrice: 2499,
      discount: 40,
      reviews: 523,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 7,
      name: 'Brightening Eye Cream',
      price: 599,
      originalPrice: 749,
      discount: 20,
      reviews: 167,
      image: 'https://images.pexels.com/photos/6724350/pexels-photo-6724350.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      id: 8,
      name: 'Lip Care Set',
      price: 299,
      originalPrice: 399,
      discount: 25,
      reviews: 234,
      image: 'https://images.unsplash.com/photo-1564594326930-17381130fd2e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 9,
      name: 'Acne Treatment Gel',
      price: 449,
      originalPrice: 549,
      discount: 18,
      reviews: 378,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 10,
      name: 'Sunscreen SPF 50',
      price: 499,
      originalPrice: 649,
      discount: 23,
      reviews: 456,
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 11,
      name: 'Collagen Boost Serum',
      price: 899,
      originalPrice: 1199,
      discount: 25,
      reviews: 289,
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 12,
      name: 'Hydrating Toner',
      price: 399,
      originalPrice: 499,
      discount: 20,
      reviews: 178,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 13,
      name: 'Beauty Sleep Bundle',
      price: 1299,
      originalPrice: 1999,
      discount: 35,
      reviews: 423,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 14,
      name: 'Pore Minimizing Mask',
      price: 549,
      originalPrice: 699,
      discount: 21,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 15,
      name: 'Lip Plumping Gloss',
      price: 299,
      originalPrice: 399,
      discount: 25,
      reviews: 267,
      image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 16,
      name: 'Retinol Night Serum',
      price: 799,
      originalPrice: 999,
      discount: 20,
      reviews: 345,
      image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 17,
      name: 'Glow Boost Kit',
      price: 1099,
      originalPrice: 1599,
      discount: 31,
      reviews: 412,
      image: 'https://images.unsplash.com/photo-1615397349754-cfa2066a298e?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 18,
      name: 'Exfoliating Scrub',
      price: 449,
      originalPrice: 549,
      discount: 18,
      reviews: 198,
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 19,
      name: 'Moisturizing Hand Cream',
      price: 249,
      originalPrice: 299,
      discount: 17,
      reviews: 145,
      image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 20,
      name: 'Anti-Dark Spot Serum',
      price: 699,
      originalPrice: 899,
      discount: 22,
      reviews: 278,
      image: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 21,
      name: 'Hydrating Sheet Masks Set',
      price: 399,
      originalPrice: 499,
      discount: 20,
      reviews: 167,
      image: 'https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 22,
      name: 'Neck Firming Cream',
      price: 599,
      originalPrice: 799,
      discount: 25,
      reviews: 189,
      image: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 23,
      name: 'Complete Beauty Box',
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      reviews: 534,
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 24,
      name: 'Hyaluronic Acid Serum',
      price: 649,
      originalPrice: 849,
      discount: 24,
      reviews: 367,
      image: 'https://images.unsplash.com/photo-1592136957897-b2b6ca21e10d?q=80&w=1374&auto=format&fit=crop'
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Products Grid */}
      <div className={`grid gap-6 ${
        viewType === 'grid4' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
      }`}>
        {products.map((product) => (
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
                    className="h-2.5 w-2.5 fill-[#F6A429] text-[#F6A429] stroke-[1.5]"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="font-medium text-[#E31837]">Rs.{product.price}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through">
                  Rs.{product.originalPrice}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Best Sellers Title */}
      <div className="text-center mt-16 mb-8">
        <h1 className="text-2xl font-medium text-[#303030]">Best Sellers</h1>
      </div>

      {/* Border Line */}
      <div className="border-b border-gray-200 mb-16"></div>

      {/* Recently Viewed Section */}
      <div className="mb-16">
        <h2 className="text-xl font-medium text-center mb-8 text-[#303030]">Recently Viewed</h2>
        <div className={`grid gap-6 ${
          viewType === 'grid4' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'
        }`}>
          {products.slice(0, 4).map((product) => (
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
                      className="h-2.5 w-2.5 fill-[#F6A429] text-[#F6A429] stroke-[1.5]"
                    />
                  ))}
                </div>
                <span className="text-xs text-gray-500">({product.reviews} reviews)</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="font-medium text-[#E31837]">Rs.{product.price}</span>
                {product.originalPrice && (
                  <span className="text-gray-400 line-through">
                    Rs.{product.originalPrice}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid; 