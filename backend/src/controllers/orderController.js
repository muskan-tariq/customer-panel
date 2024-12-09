const Order = require('../models/Order');
const Cart = require('../models/Cart');
const PDFDocument = require('pdfkit');

// Helper function to generate invoice PDF
const generateInvoicePDF = async (order) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      
      // Collect PDF chunks
      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Add company logo and header
      doc.fontSize(20).text('Tuffy Beauty', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text('Invoice', { align: 'center' });
      doc.moveDown();

      // Add order details
      doc.fontSize(10)
        .text(`Order Number: ${order._id}`)
        .text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`)
        .text(`Payment Method: ${order.paymentMethod.toUpperCase()}`)
        .moveDown();

      // Add shipping address
      doc.fontSize(12).text('Shipping Address', { underline: true });
      doc.fontSize(10)
        .text(order.shippingAddress.street)
        .text(`${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.zipCode}`)
        .moveDown();

      // Add items table
      doc.fontSize(12).text('Order Items', { underline: true });
      doc.moveDown();

      // Table headers
      const startX = 50;
      let currentY = doc.y;
      
      doc.fontSize(10)
        .text('Item', startX, currentY)
        .text('Qty', 300, currentY)
        .text('Price', 400, currentY)
        .text('Total', 500, currentY);

      doc.moveDown();
      currentY = doc.y;

      // Table content
      order.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        doc.text(item.product.name, startX, currentY)
          .text(item.quantity.toString(), 300, currentY)
          .text(`₱${item.price.toLocaleString()}`, 400, currentY)
          .text(`₱${itemTotal.toLocaleString()}`, 500, currentY);
        
        doc.moveDown();
        currentY = doc.y;
      });

      doc.moveDown();

      // Add summary
      const summaryX = 400;
      currentY = doc.y;
      
      doc.text('Subtotal:', summaryX, currentY)
        .text(`₱${order.total.toLocaleString()}`, 500, currentY);
      
      doc.moveDown();
      currentY = doc.y;
      
      doc.text('Shipping:', summaryX, currentY)
        .text(order.total >= 1000 ? 'FREE' : '₱100', 500, currentY);
      
      if (order.discount) {
        doc.moveDown();
        currentY = doc.y;
        doc.text('Discount:', summaryX, currentY)
          .text(`-₱${order.discount.amount.toLocaleString()}`, 500, currentY);
      }
      
      doc.moveDown();
      currentY = doc.y;
      
      const finalTotal = order.total + (order.total >= 1000 ? 0 : 100) - (order.discount?.amount || 0);
      doc.fontSize(12)
        .text('Total:', summaryX, currentY)
        .text(`₱${finalTotal.toLocaleString()}`, 500, currentY);

      // Add footer
      doc.fontSize(10)
        .moveDown(2)
        .text('Thank you for shopping with Sam Glow Co!', { align: 'center' })
        .text('For any questions, please contact our support.', { align: 'center' });

      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};

// @desc    Create new order
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user.userId })
      .populate('items.product');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order data
    const orderData = {
      user: req.user.userId,
      items: cart.items.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price
      })),
      shippingAddress,
      paymentMethod,
      total: cart.total,
      deliveryFee: 100
    };

    // Only add discount if it exists
    if (cart.appliedDiscount && cart.appliedDiscount.code) {
      orderData.discount = {
        code: cart.appliedDiscount.code,
        amount: cart.appliedDiscount.amount
      };
    }

    const order = new Order(orderData);

    // If COD, set status to confirmed
    if (paymentMethod === 'cod') {
      order.orderStatus = 'confirmed';
    }

    await order.save();

    // Clear the cart
    cart.items = [];
    cart.total = 0;
    cart.appliedDiscount = null;
    await cart.save();

    // Populate order details
    await order.populate('items.product');

    res.status(201).json(order);
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

// @desc    Get user's orders
// @route   GET /api/orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate('items.product')
      .sort('-createdAt');

    res.json(orders);
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(order);
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get order invoice
// @route   GET /api/orders/:id/invoice
exports.getOrderInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF(order);

    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`);
    
    // Send PDF
    res.send(pdfBuffer);
  } catch (error) {
    console.error('Generate invoice error:', error);
    res.status(500).json({ message: 'Failed to generate invoice' });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
exports.updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentStatus = 'paid';
    order.orderStatus = 'confirmed';
    
    const updatedOrder = await order.save();
    await updatedOrder.populate('items.product');

    res.json(updatedOrder);
  } catch (error) {
    console.error('Update order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if order belongs to user
    if (order.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    // Only allow cancellation if order is pending
    if (order.status !== 'pending') {
      return res.status(400).json({ 
        message: 'Order cannot be cancelled. Please contact support.' 
      });
    }

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};