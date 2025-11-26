import Order from "../models/Order.js";

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Public
 */
export const createOrder = async (req, res, next) => {
  try {
    const { items, totalPrice, customerName, address } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Order items are required" });
    }

    if (!customerName || !address) {
      return res
        .status(400)
        .json({ message: "Customer name and address are required" });
    }

    if (totalPrice === undefined) {
      return res.status(400).json({ message: "Total price is required" });
    }

    const order = new Order({
      items,
      totalPrice,
      customerName,
      address
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all orders
 * @route   GET /api/orders
 * @access  Public (for demo)
 */
export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
      .populate("items.food", "name price")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};


