import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  const { connection } = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`Mongodb is running at ${connection.host}`);
};

export default connectDB;
