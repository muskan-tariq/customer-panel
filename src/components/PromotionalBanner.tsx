import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromotionalBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-[1536px]">
        <div 
          onClick={() => navigate('/best-sellers')}
          className="relative h-[300px] mx-8 cursor-pointer overflow-hidden group"
        >
          {/* Image */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=2574&auto=format&fit=crop"
              alt="Best Sellers Collection"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="px-16">
              <h2 className="text-4xl font-medium text-white mb-4">
                Discover Our Best Sellers
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-xl">
                Shop our most-loved products and see why customers can't get enough of these skincare essentials.
              </p>
              <button className="bg-[#FF66C4] text-white px-6 py-2.5 flex items-center gap-2 hover:bg-[#ff4db8] transition-colors duration-300 group/btn">
                Shop Best Sellers
                <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionalBanner; 