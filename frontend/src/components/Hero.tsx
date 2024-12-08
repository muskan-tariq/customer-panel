import { ChevronRight } from 'lucide-react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=2574&auto=format&fit=crop",
      title: "Discover Your Natural Beauty",
      description: "Premium skincare products made with natural ingredients. Transform your skincare routine with our award-winning formulas."
    },
    {
      image: "https://images.unsplash.com/photo-1570554886111-e80fcca6a029?q=80&w=2670&auto=format&fit=crop",
      title: "Glow From Within",
      description: "Experience the power of natural ingredients with our luxurious skincare collection."
    },
    {
      image: "https://images.unsplash.com/photo-1619451334792-150fd785ee74?q=80&w=2574&auto=format&fit=crop",
      title: "Beauty Meets Science",
      description: "Advanced formulations that deliver real results. Your journey to radiant skin starts here."
    },
    {
      image: "https://images.unsplash.com/photo-1576426863848-c21f53c60b19?q=80&w=2574&auto=format&fit=crop",
      title: "Self-Care Simplified",
      description: "Elevate your daily routine with our carefully curated selection of premium skincare essentials."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: 'ease-in-out',
    arrows: false,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    customPaging: () => (
      <div className="w-2 h-2 bg-white/50 rounded-full mt-[-50px] hover:bg-[#FF66C4] transition-colors duration-300"></div>
    ),
    dotsClass: 'slick-dots !flex !gap-3 !justify-center'
  };

  return (
    <section className="relative h-[600px] overflow-hidden">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative h-[600px]">
            <div className="absolute inset-x-8 md:inset-x-12 lg:inset-x-16 h-full">
            <div className="relative h-full rounded-lg overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/40 to-black/50"></div>
              </div>
            </div>

            <div className="relative h-full mx-auto max-w-[1536px] px-8 md:px-12 lg:px-16">
              <div className="h-full flex items-center justify-center">
                <div 
                  className="max-w-xl text-center"
                  style={{ 
                    animation: 'fadeInUp 0.3s ease-out',
                    animationFillMode: 'both'
                  }}
                >
                  <h1 className="text-5xl font-medium text-white mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg text-white/90 mb-8">
                    {slide.description}
                  </p>
                  <button className="bg-[#FF66C4] text-white px-8 py-3 flex items-center gap-2 hover:bg-[#ff4db8] transition-colors duration-300 mx-auto">
                    Shop Now
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;