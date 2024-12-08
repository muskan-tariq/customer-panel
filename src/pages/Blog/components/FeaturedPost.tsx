import { motion } from "framer-motion";
import { Clock, ArrowRight } from "lucide-react";

interface FeaturedPostProps {
  post: {
    title: string;
    excerpt: string;
    author: string;
    authorImage: string;
    category: string;
    readTime: string;
    image: string;
  };
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <motion.div 
      className="relative bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg overflow-hidden max-w-5xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-6 items-center p-5">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="px-2"
          >
            <motion.span 
              className="inline-block bg-[#FF66C4] text-white text-[10px] px-2 py-0.5 rounded-full mb-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              Featured Post
            </motion.span>
            <motion.h2 
              className="text-xl font-[450] text-[#262626] mb-2 hover:text-[#FF66C4] transition-colors duration-200 tracking-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {post.title}
            </motion.h2>
            <motion.p 
              className="text-sm text-gray-600 mb-3 leading-relaxed font-[350]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {post.excerpt}
            </motion.p>

            {/* Meta Info */}
            <motion.div 
              className="flex items-center gap-3 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-[450] text-[#262626]">{post.author}</p>
                  <p className="text-[10px] text-gray-500 font-[350]">{post.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500 text-xs font-[350]">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.button
              className="inline-flex items-center gap-1.5 bg-[#FF66C4] text-white px-3 py-1.5 rounded-full hover:bg-[#ff4db7] transition-colors duration-200 text-xs font-[450]"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              Read More
              <ArrowRight className="h-3 w-3" />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            className="relative h-[250px] rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover scale-125 transform hover:scale-[1.35] transition-transform duration-500"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1.25 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost;