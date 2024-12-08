import React from 'react';
import { Leaf, Recycle, Heart, Truck } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Leaf className="w-12 h-12" />,
      title: '100% Organic',
      description: 'All natural ingredients, carefully sourced'
    },
    {

      icon: <Recycle className="w-12 h-12" />,
      title: 'Eco-Friendly',
      description: 'Sustainable packaging and practices'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Cruelty-Free',
      description: 'Never tested on animals'
    },
    {
      icon: <Truck className="w-12 h-12" />,
      title: 'Free Shipping',
      description: 'On orders over $50'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="text-[#2A5234] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#2A5234] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;