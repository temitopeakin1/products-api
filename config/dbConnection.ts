import mongoose from "mongoose";


const connectDb = async (): Promise<void> => {
  const connect = await mongoose.connect(
    process.env.MONGODB_CONNECTION_STRING || "",
    {}
  );
  console.log(
    "Database connected:",
    connect.connection.host,
    connect.connection.name
  );
};

export default connectDb;
