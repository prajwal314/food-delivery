import dotenv from "dotenv";
import mongoose from "mongoose";
import Food from "../models/Food.js";
import connectDB from "../config/db.js";

dotenv.config();

// Seed data: >30 diverse food items for the catalog
const foods = [
  {
    name: "Margherita Pizza",
    description: "Classic pizza with fresh mozzarella, tomato sauce and basil.",
    price: 8.99,
    category: "Pizza",
    imageUrl: "https://images.pexels.com/photos/1435907/pexels-photo-1435907.jpeg",
    isAvailable: true
  },
  {
    name: "Pepperoni Pizza",
    description: "Thin-crust pizza loaded with spicy pepperoni and cheese.",
    price: 9.99,
    category: "Pizza",
    imageUrl: "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg",
    isAvailable: true
  },
  {
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken, smoky BBQ sauce and red onions.",
    price: 10.49,
    category: "Pizza",
    imageUrl: "https://images.pexels.com/photos/4109128/pexels-photo-4109128.jpeg",
    isAvailable: true
  },
  {
    name: "Veggie Supreme Pizza",
    description: "Bell peppers, olives, onions, mushrooms and sweet corn.",
    price: 9.49,
    category: "Pizza",
    imageUrl: "https://images.pexels.com/photos/5908246/pexels-photo-5908246.jpeg",
    isAvailable: true
  },
  {
    name: "Cheese Burst Pizza",
    description: "Extra cheese and extra flavor with a cheesy crust.",
    price: 11.99,
    category: "Pizza",
    imageUrl: "https://images.pexels.com/photos/3762069/pexels-photo-3762069.jpeg",
    isAvailable: true
  },
  {
    name: "Classic Burger",
    description: "Grilled beef patty, lettuce, tomato, onions and house sauce.",
    price: 7.49,
    category: "Burger",
    imageUrl: "https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg",
    isAvailable: true
  },
  {
    name: "Chicken Burger",
    description: "Crispy chicken fillet with mayo and lettuce on a toasted bun.",
    price: 7.99,
    category: "Burger",
    imageUrl: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    isAvailable: true
  },
  {
    name: "Veggie Burger",
    description: "Grilled veggie patty with fresh greens and tangy sauce.",
    price: 6.99,
    category: "Burger",
    imageUrl: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
    isAvailable: true
  },
  {
    name: "Double Cheese Burger",
    description: "Double beef patties with double cheese and caramelized onions.",
    price: 9.49,
    category: "Burger",
    imageUrl: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
    isAvailable: true
  },
  {
    name: "Spicy Paneer Burger",
    description: "Crispy paneer patty with spicy mayo and onion rings.",
    price: 7.29,
    category: "Burger",
    imageUrl: "https://images.pexels.com/photos/1431305/pexels-photo-1431305.jpeg",
    isAvailable: true
  },
  {
    name: "Chicken Biryani",
    description: "Fragrant basmati rice cooked with marinated chicken and spices.",
    price: 10.99,
    category: "Biryani",
    imageUrl: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg",
    isAvailable: true
  },
  {
    name: "Veg Biryani",
    description: "Aromatic rice with mixed vegetables and classic biryani masala.",
    price: 9.49,
    category: "Biryani",
    imageUrl: "https://images.pexels.com/photos/1438672/pexels-photo-1438672.jpeg",
    isAvailable: true
  },
  {
    name: "Mutton Biryani",
    description: "Slow-cooked mutton with long-grain rice and rich spices.",
    price: 12.99,
    category: "Biryani",
    imageUrl: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    isAvailable: true
  },
  {
    name: "Hyderabadi Dum Biryani",
    description: "Layered dum biryani with intense flavors and raita.",
    price: 11.99,
    category: "Biryani",
    imageUrl: "https://images.pexels.com/photos/11178640/pexels-photo-11178640.jpeg",
    isAvailable: true
  },
  {
    name: "Paneer Tikka",
    description: "Char-grilled paneer cubes marinated in yogurt and spices.",
    price: 8.49,
    category: "Indian",
    imageUrl: "https://images.pexels.com/photos/9609854/pexels-photo-9609854.jpeg",
    isAvailable: true
  },
  {
    name: "Butter Chicken",
    description: "Creamy tomato-based curry with tender chicken pieces.",
    price: 11.49,
    category: "Indian",
    imageUrl: "https://images.pexels.com/photos/9609856/pexels-photo-9609856.jpeg",
    isAvailable: true
  },
  {
    name: "Dal Tadka",
    description: "Yellow lentils tempered with ghee, garlic and spices.",
    price: 7.49,
    category: "Indian",
    imageUrl: "https://images.pexels.com/photos/2474661/pexels-photo-2474661.jpeg",
    isAvailable: true
  },
  {
    name: "Garlic Naan",
    description: "Soft tandoori naan topped with garlic and coriander.",
    price: 2.49,
    category: "Bread",
    imageUrl: "https://images.pexels.com/photos/461431/pexels-photo-461431.jpeg",
    isAvailable: true
  },
  {
    name: "Tandoori Roti",
    description: "Whole wheat flatbread cooked in a clay oven.",
    price: 1.99,
    category: "Bread",
    imageUrl: "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    isAvailable: true
  },
  {
    name: "Pasta Alfredo",
    description: "Creamy white sauce pasta with mushrooms and herbs.",
    price: 9.29,
    category: "Pasta",
    imageUrl: "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg",
    isAvailable: true
  },
  {
    name: "Pasta Arrabbiata",
    description: "Penne tossed in a spicy tomato and chili sauce.",
    price: 8.99,
    category: "Pasta",
    imageUrl:
      "https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg",
    isAvailable: true
  },
  {
    name: "Grilled Chicken Salad",
    description:
      "Mixed greens with grilled chicken, cherry tomatoes and vinaigrette.",
    price: 8.49,
    category: "Salad",
    imageUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    isAvailable: true
  },
  {
    name: "Greek Salad",
    description: "Cucumber, tomatoes, olives, feta cheese and olive oil.",
    price: 7.99,
    category: "Salad",
    imageUrl: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg",
    isAvailable: true
  },
  {
    name: "French Fries",
    description: "Crispy golden fries with a side of ketchup.",
    price: 3.49,
    category: "Sides",
    imageUrl: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
    isAvailable: true
  },
  {
    name: "Chicken Wings",
    description: "Spicy and tangy wings served with blue cheese dip.",
    price: 7.99,
    category: "Sides",
    imageUrl: "https://images.pexels.com/photos/1639569/pexels-photo-1639569.jpeg",
    isAvailable: true
  },
  {
    name: "Chocolate Brownie",
    description: "Warm fudge brownie served with chocolate sauce.",
    price: 4.49,
    category: "Dessert",
    imageUrl: "https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg",
    isAvailable: true
  },
  {
    name: "Cheesecake",
    description: "Creamy baked cheesecake with berry topping.",
    price: 5.49,
    category: "Dessert",
    imageUrl: "https://images.pexels.com/photos/704569/pexels-photo-704569.jpeg",
    isAvailable: true
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream topped with nuts, syrup and cherries.",
    price: 4.99,
    category: "Dessert",
    imageUrl: "https://images.pexels.com/photos/1352296/pexels-photo-1352296.jpeg",
    isAvailable: true
  },
  {
    name: "Mango Smoothie",
    description: "Fresh mango blended with yogurt and ice.",
    price: 3.99,
    category: "Beverage",
    imageUrl: "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg",
    isAvailable: true
  },
  {
    name: "Cold Coffee",
    description: "Iced coffee with milk and a hint of vanilla.",
    price: 3.49,
    category: "Beverage",
    imageUrl: "https://images.pexels.com/photos/2968889/pexels-photo-2968889.jpeg",
    isAvailable: true
  },
  {
    name: "Lemon Iced Tea",
    description: "Refreshing iced tea with lemon and mint.",
    price: 2.99,
    category: "Beverage",
    imageUrl: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
    isAvailable: true
  }
];

const seedFoods = async () => {
  try {
    await connectDB();
    console.log("Connected to MongoDB, clearing existing foods...");
    await Food.deleteMany({});
    console.log("Inserting seed foods...");
    await Food.insertMany(foods);
    console.log(`Seeded ${foods.length} food items successfully.`);
  } catch (err) {
    console.error("Error seeding foods:", err.message);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

seedFoods();


