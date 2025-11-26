import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"]
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    items: {
      type: [orderItemSchema],
      validate: {
        validator: function (items) {
          return Array.isArray(items) && items.length > 0;
        },
        message: "Order must contain at least one item"
      }
    },
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Total price must be a positive number"]
    },
    customerName: {
      type: String,
      required: [true, "Customer name is required"],
      trim: true
    },
    address: {
      type: String,
      required: [true, "Delivery address is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["pending", "preparing", "on-the-way", "delivered", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;


