import React from 'react';

const products = [
  {
    id: 1,
    name: 'Organic Body Butter',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 2,
    name: 'Natural Face Cream',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 3,
    name: 'Organic Shampoo',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400',
  },
  {
    id: 4,
    name: 'Natural Soap Bar',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1600857062241-98e5dba7f214?auto=format&fit=crop&q=80&w=400',
  }
];

const Products = () => {
  return (
    <section className="py-16 bg-[#F7F3E9]">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#2A5234] mb-12">Best Sellers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative pb-[100%]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#2A5234]">{product.name}</h3>
                <p className="text-gray-600 mt-2">${product.price}</p>
                <button className="w-full mt-4 bg-[#2A5234] text-white py-2 rounded hover:bg-[#1F3D26] transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;