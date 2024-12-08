const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// @route   GET /api/products/search
// @desc    Search products across all fields
// @access  Public
router.get('/search', productController.searchProducts);

// @route   GET /api/products/filters
// @desc    Get filter options for a category
// @access  Public
router.get('/filters', productController.getFilterOptions);

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get('/', productController.getProducts);

// @route   GET /api/products/best-sellers
// @desc    Get best selling products
// @access  Public
router.get('/best-sellers', productController.getBestSellers);

// @route   GET /api/products/category/:category
// @desc    Get products by category
// @access  Public
router.get('/category/:category', productController.getProductsByCategory);

// @route   GET /api/products/:id
// @desc    Get product by ID
// @access  Public
router.get('/:id', productController.getProductById);

// @route   GET /api/products/:id/related
// @desc    Get related products
// @access  Public
router.get('/:id/related', productController.getRelatedProducts);

module.exports = router;