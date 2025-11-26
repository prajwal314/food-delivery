import Food from "../models/Food.js";

/**
 * @desc    Get all foods
 * @route   GET /api/foods
 * @access  Public
 */
export const getFoods = async (req, res, next) => {
  try {
    const foods = await Food.find().sort({ createdAt: -1 });
    res.status(200).json(foods);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Add a new food item
 * @route   POST /api/foods
 * @access  Admin (no auth implemented, UI only)
 */
export const addFood = async (req, res, next) => {
  try {
    const { name, description, price, category, imageUrl, isAvailable } = req.body;

    if (!name || price === undefined) {
      return res.status(400).json({ message: "Name and price are required" });
    }

    const food = new Food({
      name,
      description,
      price,
      category,
      imageUrl,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    const createdFood = await food.save();

    res.status(201).json(createdFood);
  } catch (error) {
    next(error);
  }
};


