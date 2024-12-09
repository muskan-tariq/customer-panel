const Product = require('../models/Product');

// Get products with filters
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    let category = req.query.category;
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder || 'desc';

    console.log('Getting products with params:', {
      category,
      page,
      limit,
      sortBy,
      sortOrder,
      filters: req.query
    });

    // Build filter query
    let filterQuery = {};

    // Add category filter if provided
    if (category) {
      // Handle category variations
      const categoryMappings = {
        'serum': 'serums',
        'facewash': 'face-wash',
        'face-wash': 'face-wash',
        'moisturizer': 'moisturizer',
        'sunscreen': 'sunscreen',
        'toner': 'toner',
        'best-sellers': 'best-sellers',
        'bundles': 'bundles'
      };

      // Map the category if it exists in our mappings
      if (categoryMappings[category]) {
        category = categoryMappings[category];
      }

      filterQuery.category = category;
    }

    // Apply common filters
    if (req.query.priceRange) {
      const [min, max] = req.query.priceRange.split('-');
      if (!isNaN(min) && !isNaN(max)) {
        filterQuery.price = { 
          $gte: Number(min), 
          $lte: Number(max) 
        };
      }
    }

    // Skin Type Filter
    if (req.query.skinTypes) {
      const skinTypes = req.query.skinTypes.split(',');
      const skinTypeQuery = {};
      skinTypes.forEach(type => {
        skinTypeQuery[`skinType.${type}`] = true;
      });
      Object.assign(filterQuery, skinTypeQuery);
    }

    // Concerns Filter
    if (req.query.concerns) {
      const concerns = req.query.concerns.split(',');
      const concernQuery = {};
      concerns.forEach(concern => {
        concernQuery[`concern.${concern}`] = true;
      });
      Object.assign(filterQuery, concernQuery);
    }

    // Ingredients Filter
    if (req.query.ingredients) {
      filterQuery.ingredients = { 
        $in: req.query.ingredients.split(',')
      };
    }

    console.log('Final filter query:', filterQuery);

    // Build sort object
    let sortObject = {};
    switch (sortBy) {
      case 'featured':
        sortObject = { rating: -1, numReviews: -1 };
        break;
      case 'name_asc':
        sortObject.name = 1;
        break;
      case 'name_desc':
        sortObject.name = -1;
        break;
      case 'price_asc':
        sortObject.price = 1;
        break;
      case 'price_desc':
        sortObject.price = -1;
        break;
      case 'newest':
        sortObject.createdAt = -1;
        break;
      default:
        sortObject.createdAt = -1;
    }

    // For best-sellers, always prioritize by rating and sales
    if (category === 'best-sellers') {
      sortObject = {
        rating: -1,
        numReviews: -1,
        soldCount: -1
      };
    }

    // Execute query with pagination
    const totalProducts = await Product.countDocuments(filterQuery);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await Product.find(filterQuery)
      .sort(sortObject)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('seller', 'name');

    console.log('Found products:', products.length);

    res.json({
      products,
      currentPage: page,
      totalPages,
      total: totalProducts
    });
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: error.message || 'Error getting products' });
  }
};

// Get filter options for a category
exports.getFilterOptions = async (req, res) => {
  try {
    const { category } = req.query;
    
    // Get products for the specific category
    const query = category ? { category } : {};
    const products = await Product.find(query);

    // Get unique values and counts for each filter type
    const skinTypes = new Map();
    const concerns = new Map();
    const ingredients = new Map();

    // Collect all unique values
    products.forEach(product => {
      // Count skin types
      if (product.skinType) {
        Object.entries(product.skinType).forEach(([type, value]) => {
          if (value === true) {
            skinTypes.set(type, (skinTypes.get(type) || 0) + 1);
          }
        });
      }

      // Count concerns
      if (product.concern) {
        Object.entries(product.concern).forEach(([concern, value]) => {
          if (value === true) {
            concerns.set(concern, (concerns.get(concern) || 0) + 1);
          }
        });
      }

      // Count ingredients
      if (product.ingredients) {
        product.ingredients.forEach(ingredient => {
          ingredients.set(ingredient, (ingredients.get(ingredient) || 0) + 1);
        });
      }
    });

    const filterOptions = {
      skinTypes: Array.from(skinTypes, ([type, count]) => ({ type, count })),
      concerns: Array.from(concerns, ([concern, count]) => ({ type: concern, count })),
      ingredients: Array.from(ingredients, ([ingredient, count]) => ({ type: ingredient, count }))
    };

    res.json(filterOptions);
  } catch (error) {
    console.error('Error getting filter options:', error);
    res.status(500).json({ message: error.message || 'Error getting filter options' });
  }
};

// Get best sellers
exports.getBestSellers = async (req, res) => {
  try {
    const bestSellers = await Product.find()
      .sort({ numReviews: -1, rating: -1 })
      .limit(8)
      .populate('seller', 'name');

    res.json(bestSellers);
  } catch (error) {
    console.error('Get best sellers error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('seller', 'name')
      .populate({
        path: 'reviews.user',
        select: 'name avatar'
      });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Get related products
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .limit(4)
      .select('name images price rating numReviews')
      .populate('seller', 'name');
    
    res.json({
      ...product.toObject(),
      relatedProducts
    });
  } catch (error) {
    console.error('Error getting product:', error);
    res.status(500).json({ message: 'Error getting product details' });
  }
};

// Get related products
exports.getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id }
    })
      .limit(4)
      .populate('seller', 'name');

    res.json(relatedProducts);
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { sort = 'featured', page = 1, limit = 16 } = req.query;

    let sortObj = {};
    switch (sort) {
      case 'price-low-high':
        sortObj = { price: 1 };
        break;
      case 'price-high-low':
        sortObj = { price: -1 };
        break;
      case 'newest':
        sortObj = { createdAt: -1 };
        break;
      case 'best-selling':
        sortObj = { numReviews: -1, rating: -1 };
        break;
      default:
        sortObj = { rating: -1 }; // featured
    }

    const products = await Product.find({ category })
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('seller', 'name');

    const total = await Product.countDocuments({ category });

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search products
exports.searchProducts = async (req, res) => {
  try {
    const { query, page = 1, limit = 12, sortBy = 'featured' } = req.query;
    
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    console.log('Search query:', query);

    // Build search criteria
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } }
      ]
    };

    // Build sort criteria
    let sortCriteria = {};
    switch (sortBy) {
      case 'price-low-to-high':
        sortCriteria = { price: 1 };
        break;
      case 'price-high-to-low':
        sortCriteria = { price: -1 };
        break;
      case 'newest':
        sortCriteria = { createdAt: -1 };
        break;
      case 'rating':
        sortCriteria = { rating: -1 };
        break;
      default:
        sortCriteria = { createdAt: -1 }; // Default sort by newest
    }

    // Get total count
    const total = await Product.countDocuments(searchCriteria);

    // Get paginated and sorted results
    const products = await Product.find(searchCriteria)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(limit)
      .select('name description price images rating numReviews category'); // Select only needed fields

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });

  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
};