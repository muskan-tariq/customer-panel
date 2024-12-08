import { motion } from 'framer-motion';

interface BlogCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const BlogCategories = ({ categories, selectedCategory, onSelectCategory }: BlogCategoriesProps) => {
  return (
    <div className="flex flex-wrap gap-8 justify-center">
      {categories.map((category) => (
        <div key={category} className="relative group">
          <motion.button
            onClick={() => onSelectCategory(category)}
            className={`px-2 py-1 text-sm font-[450] transition-colors duration-200 ${
              selectedCategory === category
                ? 'text-[#FF66C4]'
                : 'text-[#262626] hover:text-[#FF66C4]'
            }`}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            {category}
          </motion.button>
          <div 
            className={`absolute bottom-0 left-0 w-full h-[1px] transform origin-left transition-transform duration-300 ${
              selectedCategory === category 
                ? 'bg-[#FF66C4] scale-x-100' 
                : 'bg-[#262626] scale-x-0 group-hover:scale-x-100'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default BlogCategories; 