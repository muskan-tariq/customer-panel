const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Product = require('../models/Product');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const checkProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all products
    const products = await Product.find({})
      .populate('seller', 'name email')
      .populate('bundleItems.product', 'name');

    console.log('\nTotal products found:', products.length);
    
    // Log each product
    products.forEach((product, index) => {
      console.log(`\n--- Product ${index + 1} ---`);
      console.log('Name:', product.name);
      console.log('Category:', product.category);
      console.log('Price:', product.price);
      console.log('Stock:', product.stock);
      console.log('Is Bundle:', product.isBundle);
      if (product.isBundle && product.bundleItems.length > 0) {
        console.log('Bundle Items:');
        product.bundleItems.forEach(item => {
          console.log(`- ${item.product.name} (Quantity: ${item.quantity})`);
        });
      }
    });

    // Group products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('\n--- Products by Category ---');
    productsByCategory.forEach(category => {
      console.log(`${category._id}: ${category.count} products`);
    });

  } catch (error) {
    console.error('Error checking products:', error);
  } finally {
    await mongoose.disconnect();
    console.log('\nDisconnected from MongoDB');
  }
};

// Run the check
checkProducts();