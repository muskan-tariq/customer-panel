import { Star } from 'lucide-react';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Moisturizers',
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop',
      productCount: 12
    },
    {
      id: 2,
      name: 'Serums',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop',
      productCount: 8
    },
    {
      id: 3,
      name: 'Cleansers',
      image: 'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=1374&auto=format&fit=crop',
      productCount: 6
    },
    {
      id: 4,
      name: 'Eye Care',
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1374&auto=format&fit=crop',
      productCount: 5
    },
    {
      id: 5,
      name: 'Lip Care',
      image: 'https://images.unsplash.com/photo-1599305090598-fe179d501227?q=80&w=1374&auto=format&fit=crop',
      productCount: 7
    },
    {
      id: 6,
      name: 'Face Masks',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1374&auto=format&fit=crop',
      productCount: 9
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium text-center mb-2">Shop By Category</h2>
        <p className="text-gray-500 text-center mb-12">Discover our range of skincare solutions</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <div className="aspect-square w-full overflow-hidden">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300"></div>
                
                {/* Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                  <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                  <p className="text-sm mb-4">{category.productCount} Products</p>
                  <button className="bg-white text-black px-6 py-2 hover:bg-[#FF66C4] hover:text-white transition-colors duration-300">
                    VIEW PRODUCTS
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;