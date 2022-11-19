import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  const { connection } = await mongoose.connect(process.env.MONGODB_URL);
  console.log(`Mongodb is running at ${connection.host}`);
};

export default connectDB;
