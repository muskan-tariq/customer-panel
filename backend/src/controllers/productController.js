const Product = require('../models/Product');

// Get products with filters
exports.getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const category = req.query.category;
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

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Build filter query
    let filterQuery = {};
    if (category === 'best-sellers') {
      // Products must be in best-sellers category AND match any applied filters
      filterQuery = { 
        category: 'best-sellers'
      };
    } else if (category === 'bundles') {
      // Products must be in bundles category AND match any applied filters
      filterQuery = { 
        category: 'bundles'
      };
    } else {
      filterQuery = { category };
    }

    // Apply common filters for all categories including best-sellers and bundles
    // Price Range Filter
    if (req.query.priceRange) {
      const [min, max] = req.query.priceRange.split('-').map(Number);
      filterQuery.price = { $gte: min, $lte: max };
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
      case 'price-low-high':
        sortObject.price = 1;
        break;
      case 'price-high-low':
        sortObject.price = -1;
        break;
      case 'newest':
        sortObject.createdAt = -1;
        break;
      case 'best-selling':
        sortObject.soldCount = -1;
        break;
      case 'highest-discount':
        sortObject.discount = -1;
        break;
      case 'rating':
        sortObject.rating = -1;
        break;
      default:
        sortObject[sortBy] = sortOrder === 'asc' ? 1 : -1;
    }

    // For best-sellers, prioritize by rating and sales
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
    res.status(500).json({ message: 'Error getting products' });
  }
};

// Get filter options for a category
exports.getFilterOptions = async (req, res) => {
  try {
    const { category } = req.query;
    console.log('Getting filter options for category:', category);

    if (!category) {
      return res.status(400).json({ message: 'Category is required' });
    }

    // Get products for the specific category
    const query = { category };
    const products = await Product.find(query);
    console.log('Found products:', products.length);

    // Get unique values and counts for each filter type
    const priceRanges = [
      { range: '0-500', count: 0 },
      { range: '501-1000', count: 0 },
      { range: '1001-1500', count: 0 },
      { range: '1501-2000', count: 0 },
      { range: '2000+', count: 0 }
    ];

    const skinTypes = new Map();
    const concerns = new Map();
    const ingredients = new Map();

    products.forEach(product => {
      // Count price ranges
      const price = product.price;
      if (price <= 500) priceRanges[0].count++;
      else if (price <= 1000) priceRanges[1].count++;
      else if (price <= 1500) priceRanges[2].count++;
      else if (price <= 2000) priceRanges[3].count++;
      else priceRanges[4].count++;

      // Count skin types
      Object.entries(product.skinType || {}).forEach(([type, value]) => {
        if (value === true) {
          skinTypes.set(type, (skinTypes.get(type) || 0) + 1);
        }
      });

      // Count concerns
      Object.entries(product.concern || {}).forEach(([concern, value]) => {
        if (value === true) {
          concerns.set(concern, (concerns.get(concern) || 0) + 1);
        }
      });

      // Count ingredients
      product.ingredients?.forEach(ingredient => {
        ingredients.set(ingredient, (ingredients.get(ingredient) || 0) + 1);
      });
    });

    const filterOptions = {
      priceRanges,
      skinTypes: Array.from(skinTypes, ([type, count]) => ({ type, count })),
      concerns: Array.from(concerns, ([concern, count]) => ({ type: concern, count })),
      ingredients: Array.from(ingredients, ([ingredient, count]) => ({ type: ingredient, count }))
    };

    console.log('Generated filter options:', filterOptions);
    res.json(filterOptions);
  } catch (error) {
    console.error('Error getting filter options:', error);
    res.status(500).json({ message: 'Error getting filter options' });
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
    const { 
      query, 
      page = 1, 
      limit = 12,
      sortBy = 'featured',
      priceRange,
      skinTypes,
      concerns,
      ingredients
    } = req.query;

    // Build search criteria to search across multiple fields
    const searchCriteria = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { ingredients: { $elemMatch: { $regex: query, $options: 'i' } } },
        { 'skinType': { $regex: query, $options: 'i' } },
        { 'concern': { $regex: query, $options: 'i' } },
        { features: { $elemMatch: { $regex: query, $options: 'i' } } }
      ]
    };

    // Add filters if provided
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      searchCriteria.price = { $gte: min, $lte: max };
    }

    if (skinTypes) {
      const types = skinTypes.split(',');
      searchCriteria['skinType'] = { $in: types };
    }

    if (concerns) {
      const concernList = concerns.split(',');
      searchCriteria['concern'] = { $in: concernList };
    }

    if (ingredients) {
      const ingredientList = ingredients.split(',');
      searchCriteria['ingredients'] = { $in: ingredientList };
    }

    // Build sort criteria
    let sortCriteria = {};
    switch (sortBy) {
      case 'a-to-z':
        sortCriteria = { name: 1 };
        break;
      case 'z-to-a':
        sortCriteria = { name: -1 };
        break;
      case 'price-low-to-high':
        sortCriteria = { price: 1 };
        break;
      case 'price-high-to-low':
        sortCriteria = { price: -1 };
        break;
      case 'newest':
        sortCriteria = { createdAt: -1 };
        break;
      default:
        // 'featured' - sort by rating and then by number of reviews
        sortCriteria = { rating: -1, numReviews: -1 };
    }

    // Count total results
    const total = await Product.countDocuments(searchCriteria);

    // Get paginated and sorted results
    const products = await Product.find(searchCriteria)
      .sort(sortCriteria)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate('seller', 'name');

    // Get filter options based on search results
    const allMatchingProducts = await Product.find(searchCriteria);
    
    const filterOptions = {
      priceRanges: [
        { range: '0-500', count: allMatchingProducts.filter(p => p.price <= 500).length },
        { range: '501-1000', count: allMatchingProducts.filter(p => p.price > 500 && p.price <= 1000).length },
        { range: '1001-1500', count: allMatchingProducts.filter(p => p.price > 1000 && p.price <= 1500).length },
        { range: '1501-2000', count: allMatchingProducts.filter(p => p.price > 1500 && p.price <= 2000).length },
        { range: '2000+', count: allMatchingProducts.filter(p => p.price > 2000).length }
      ],
      skinTypes: Object.keys(allMatchingProducts[0]?.skinType || {}).map(type => ({
        type,
        count: allMatchingProducts.filter(p => p.skinType[type]).length
      })),
      concerns: Object.keys(allMatchingProducts[0]?.concern || {}).map(concern => ({
        type: concern,
        count: allMatchingProducts.filter(p => p.concern[concern]).length
      })),
      ingredients: [...new Set(allMatchingProducts.flatMap(p => p.ingredients))].map(ingredient => ({
        type: ingredient,
        count: allMatchingProducts.filter(p => p.ingredients.includes(ingredient)).length
      }))
    };

    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total,
      filterOptions
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Error searching products' });
  }
};