import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartButtonProps {
  itemCount: number;
  onClick: () => void;
}

const CartButton = ({ itemCount, onClick }: CartButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="relative hover:text-primary transition-colors"
      aria-label="Shopping Cart"
    >
      <ShoppingCart className="h-5 w-5" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-[#FF66C4] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
          >
            {itemCount}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default CartButton; 