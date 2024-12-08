const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const auth = require('../middleware/auth');

// @route   GET /api/cart
// @desc    Get user's cart
// @access  Private
router.get('/', auth, cartController.getUserCart);

// @route   POST /api/cart/items
// @desc    Add item to cart
// @access  Private
router.post('/items', auth, cartController.addToCart);

// @route   PUT /api/cart/items/:productId
// @desc    Update cart item quantity
// @access  Private
router.put('/items/:productId', auth, cartController.updateCartItem);

// @route   DELETE /api/cart/items/:productId
// @desc    Remove item from cart
// @access  Private
router.delete('/items/:productId', auth, cartController.removeFromCart);

// @route   POST /api/cart/discount
// @desc    Apply discount to cart
// @access  Private
router.post('/discount', auth, cartController.applyDiscount);

// @route   DELETE /api/cart
// @desc    Clear cart
// @access  Private
router.delete('/', auth, cartController.clearCart);

module.exports = router;