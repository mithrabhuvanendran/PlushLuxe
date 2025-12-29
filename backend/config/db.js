import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDb connected successfully at ${conn.connection.host}`);
    // console.log(conn);
  } catch (err) {
    console.log("MongoDb connection failed.", err);
    process.exit(1)
  }
};

export default connectDB;
