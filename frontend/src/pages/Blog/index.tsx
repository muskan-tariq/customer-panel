import { useState } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './components/BlogCard';
import FeaturedPost from './components/FeaturedPost';
import BlogCategories from './components/BlogCategories';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const blogPosts = [
    {
      id: 1,
      title: "The Ultimate Guide to Skincare Layering",
      excerpt: "Learn the correct order to apply your skincare products for maximum effectiveness.",
      category: "Skincare Tips",
      date: "March 15, 2024",
      readTime: "5 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/articles/close-up-portrait-beautiful-woman_400x.jpg?v=1693331259",
      author: "Sarah Johnson",
      authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Natural Ingredients for Glowing Skin",
      excerpt: "Discover the power of natural ingredients that can transform your skin.",
      category: "Natural Beauty",
      date: "March 14, 2024",
      readTime: "4 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/products/finalmas_400x.jpg?v=1667896859",
      author: "Emily Chen",
      authorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Understanding Your Skin Type",
      excerpt: "A comprehensive guide to identifying and caring for your skin type.",
      category: "Skin Health",
      date: "March 13, 2024",
      readTime: "6 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Saga_Rapid_Essential_400x.png?v=1675278467",
      author: "Dr. Maria Santos",
      authorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 4,
      title: "The Science Behind Hyaluronic Acid",
      excerpt: "Deep dive into how hyaluronic acid works to hydrate your skin.",
      category: "Ingredients",
      date: "March 12, 2024",
      readTime: "7 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/products/Tinted-Lip-Treat-Bundle--product-image_400x.jpg?v=1681979111",
      author: "Dr. James Wilson",
      authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 5,
      title: "Morning Skincare Routine for Busy People",
      excerpt: "Quick and effective morning skincare routine for those on the go.",
      category: "Skincare Tips",
      date: "March 11, 2024",
      readTime: "4 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/products/SkinRescueBundle-web_400x.png?v=1675267403",
      author: "Lisa Park",
      authorImage: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    },
    {
      id: 6,
      title: "Anti-Aging Ingredients That Actually Work",
      excerpt: "Scientific evidence behind effective anti-aging ingredients.",
      category: "Anti-Aging",
      date: "March 10, 2024",
      readTime: "8 min read",
      image: "https://www.tuffyorganics.com/cdn/shop/products/rosaline---product-image2_1_400x.png?v=1676986731",
      author: "Dr. Rachel Green",
      authorImage: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
    }
  ];

  const categories = [
    'All',
    'Skincare Tips',
    'Natural Beauty',
    'Skin Health',
    'Ingredients',
    'Anti-Aging'
  ];

  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

  return (
    <div className="min-h-screen bg-white">
      {/* Page Title */}
      <div className="text-center py-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative inline-block"
        >
          <motion.h1 
            className="text-4xl font-[450] text-[#262626] mb-4 tracking-tight relative z-10"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="bg-white/80 px-6 py-2 rounded-lg">
              SAM E-GLOW Blog
            </span>
          </motion.h1>
        </motion.div>
        <motion.p 
          className="text-gray-600 max-w-2xl mx-auto px-4 font-[350]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Discover the latest skincare tips, beauty trends, and expert advice for your best skin ever.
        </motion.p>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <FeaturedPost post={featuredPost} />
        </motion.div>
      </div>

      {/* Categories and Posts */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <BlogCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog; 