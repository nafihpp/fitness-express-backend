import mongoose from "mongoose";

const connectDb = async () => {
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
  }
  try {
    const { connection } = await mongoose.connect(`${mongoUrl}`);
    console.log(
      `Database Connected: ${connection.host} on Port ${connection.port}`
    );
  } catch (error: any) {
    console.log(error);
    throw new Error(`Error connecting to database ${error}`);
  }
};

export default connectDb;
