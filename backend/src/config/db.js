import mongoose from "mongoose";

/**
 * Establish a connection to the MongoDB database using Mongoose.
 * Connection string is read from the MONGO_URI environment variable.
 */
const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI not set in environment variables");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      autoIndex: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;


