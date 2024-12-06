import { Star } from 'lucide-react';

const BestSellers = () => {
  const products = [
    {
      id: 1,
      name: 'Daily Duo Bundle',
      price: 973,
      originalPrice: 1498,
      discount: 35,
      reviews: 651,
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Vitamin C Serum',
      price: 599,
      originalPrice: 799,
      discount: 25,
      reviews: 428,
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Hydrating Face Cream',
      price: 449,
      originalPrice: 599,
      discount: 25,
      reviews: 312,
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Anti-Aging Night Cream',
      price: 799,
      originalPrice: 999,
      discount: 20,
      reviews: 245,
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium text-center mb-8">Best Sellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        
        {/* View All Button */}
        <div className="text-center mt-10">
          <a 
            href="/best-sellers" 
            className="inline-block px-6 py-2 border border-[#FF66C4] text-[#FF66C4] hover:bg-[#FF66C4] hover:text-white transition-colors duration-300 text-sm"
          >
            VIEW ALL
          </a>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;