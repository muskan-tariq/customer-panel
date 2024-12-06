import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from 'react-slick';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Mitchell",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
      rating: 5,
      review: "I've been using their skincare products for 3 months now, and my skin has never looked better! The Vitamin C serum is a game-changer.",
      date: "December 15, 2023",
      product: "Vitamin C Serum"
    },
    {
      id: 2,
      name: "Emily Wang",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
      rating: 5,
      review: "The hydrating face cream is perfect for my sensitive skin. It's lightweight yet deeply moisturizing.",
      date: "January 2, 2024",
      product: "Hydrating Face Cream"
    },
    {
      id: 3,
      name: "Jessica Brown",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=2787&auto=format&fit=crop",
      rating: 5,
      review: "Their beauty box subscription is amazing value for money. I love trying new products each month!",
      date: "January 10, 2024",
      product: "Beauty Sleep Bundle"
    },
    {
      id: 4,
      name: "Lisa Chen",
      image: "https://images.unsplash.com/photo-1557555187-23d685287bc3?q=80&w=2787&auto=format&fit=crop",
      rating: 5,
      review: "The anti-aging serum has made such a difference. My skin looks more radiant and youthful.",
      date: "January 15, 2024",
      product: "Retinol Night Serum"
    },
    {
      id: 5,
      name: "Maria Garcia",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2787&auto=format&fit=crop",
      rating: 5,
      review: "Best face masks I've ever tried. My skin feels so refreshed and clean after each use.",
      date: "January 18, 2024",
      product: "Pore Minimizing Mask"
    },
    {
      id: 6,
      name: "Anna Kim",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2787&auto=format&fit=crop",
      rating: 5,
      review: "The lip care set is amazing! My lips have never been softer. Will definitely repurchase.",
      date: "January 20, 2024",
      product: "Lip Care Set"
    }
  ];

  const CustomPrevArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-[#FF66C4] border border-gray-100"
    >
      <ChevronLeft className="w-6 h-6" />
    </button>
  );

  const CustomNextArrow = ({ onClick }: any) => (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-400 hover:text-[#FF66C4] border border-gray-100"
    >
      <ChevronRight className="w-6 h-6" />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: false,
    cssEase: 'ease-in-out',
    arrows: true,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    pauseOnHover: false,
    pauseOnFocus: false,
    swipe: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <h2 className="text-2xl font-medium text-center mb-2">Customer Reviews</h2>
        <p className="text-gray-500 text-center mb-12">What our customers are saying about us</p>
        
        <div className="px-16">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-3">
                <div className="bg-white p-4 shadow-[0_2px_10px_rgba(0,0,0,0.08)] h-[220px] relative w-[220px] mx-auto border border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-xs text-[#333333] truncate max-w-[140px]">{testimonial.name}</h3>
                      <div className="flex items-center gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-2 w-2 fill-[#F6A429] text-[#F6A429] stroke-[1.5]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[90px] overflow-hidden mb-2">
                    <p className="text-[#666666] text-xs leading-relaxed">
                      {testimonial.review}
                    </p>
                  </div>
                  
                  <div className="flex justify-between items-center text-[10px] text-gray-500 absolute bottom-4 left-4 right-4">
                    <span>{testimonial.date}</span>
                    <span className="text-[#FF66C4] truncate ml-2">Verified: {testimonial.product}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;