import React from 'react';
import { Link } from 'react-router-dom';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Moisturizers',
      image: 'https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?q=80&w=1374&auto=format&fit=crop',
      slug: 'moisturizer'
    },
    {
      id: 2,
      name: 'Serums',
      image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1374&auto=format&fit=crop',
      slug: 'serum'
    },
    {
      id: 3,
      name: 'Face Wash',
      image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=1374&auto=format&fit=crop',
      slug: 'facewash'
    },
    {
      id: 4,
      name: 'Toner',
      image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=1374&auto=format&fit=crop',
      slug: 'toner'
    },
    {
      id: 5,
      name: 'Sunscreen',
      image: 'https://images.unsplash.com/photo-1556227834-09f1de7a7d14?q=80&w=1374&auto=format&fit=crop',
      slug: 'sunscreen'
    },
    {
      id: 6,
      name: 'Bundles & Deals',
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?q=80&w=1374&auto=format&fit=crop',
      slug: 'bundles'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-medium text-center mb-2">Shop By Category</h2>
        <p className="text-gray-500 text-center mb-12">Discover our range of skincare solutions</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/products/${category.slug}`}
              className="group relative"
            >
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
                  <button className="bg-white text-black px-6 py-2 hover:bg-[#FF66C4] hover:text-white transition-colors duration-300">
                    VIEW PRODUCTS
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
