import { motion } from 'framer-motion';
import { Clock, ChevronRight } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
  authorImage: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden border border-gray-300 hover:border-gray-400 shadow-sm hover:shadow-md transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-500"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute top-3 left-3">
          <motion.span 
            className="bg-[#FF66C4] text-white text-[10px] px-2 py-0.5 rounded-full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {post.category}
          </motion.span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Meta Info */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex items-center gap-1.5 text-gray-500 text-xs">
            <Clock className="h-3 w-3" />
            <span>{post.readTime}</span>
          </div>
          <span className="text-gray-300">•</span>
          <span className="text-gray-500 text-xs">{post.date}</span>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-[450] text-[#262626] mb-1.5 line-clamp-2 hover:text-[#FF66C4] transition-colors duration-200 tracking-tight">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed font-[350]">
          {post.excerpt}
        </p>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={post.authorImage}
              alt={post.author}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs text-gray-600 font-[350]">{post.author}</span>
          </div>
          
          <motion.button 
            className="text-[#FF66C4] hover:text-[#ff4db7] transition-colors duration-200"
            whileHover={{ scale: 1.1, x: 2 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard; 