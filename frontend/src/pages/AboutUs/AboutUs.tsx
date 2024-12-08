import { motion } from 'framer-motion';
import { Heart, Star, Users, Award, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
  const navigate = useNavigate();
  
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "5000+", label: "Happy Customers" },
    { icon: <Star className="w-6 h-6" />, value: "100+", label: "Products" },
    { icon: <Heart className="w-6 h-6" />, value: "98%", label: "Satisfaction Rate" },
    { icon: <Award className="w-6 h-6" />, value: "10+", label: "Years Experience" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div 
        className="relative h-[400px] bg-gradient-to-r from-pink-100 to-purple-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('/images/about-pattern.png')] opacity-10" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center">
          <motion.div 
            className="text-center"
            {...fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-semibold text-[#303030] mb-4">
              Our Story
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Empowering beauty through natural skincare solutions since 2013
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mission Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-8 h-8 text-[#FF66C4] mx-auto mb-4" />
              <h2 className="text-3xl font-semibold text-[#303030] mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                At SAM E-GLOW Co, we're dedicated to transforming skincare routines with premium, natural products that enhance your natural beauty. Our commitment to quality, sustainability, and innovation drives everything we do.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="py-16 bg-gray-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-[#FF66C4] bg-opacity-10 rounded-full">
                    <div className="text-[#FF66C4]">{stat.icon}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-[#303030] mb-2">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        className="py-16 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold text-[#303030] text-center mb-12">Our Values</h2>
            <div className="grid gap-8">
              {[
                {
                  title: "Natural Ingredients",
                  description: "We source the finest natural ingredients to create products that are gentle yet effective."
                },
                {
                  title: "Sustainable Beauty",
                  description: "Our commitment to sustainability extends from our ingredients to our packaging."
                },
                {
                  title: "Customer First",
                  description: "Your satisfaction and skincare success is our top priority."
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-gray-50 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h3 className="text-xl font-semibold text-[#303030] mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Join Us Section */}
      <motion.section 
        className="py-16 bg-gradient-to-r from-pink-50 to-purple-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-[#303030] mb-6">Join Our Beauty Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Experience the transformation with SAM E-GLOW Co's premium skincare products. Let's glow together!
            </p>
            <motion.button
              onClick={() => navigate('/')}
              className="bg-[#FF66C4] text-white px-8 py-3 rounded-full hover:bg-[#ff4db7] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Shop Now
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutUs; 