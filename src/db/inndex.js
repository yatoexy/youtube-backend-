import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";
const  connectToDatabase = async () => {
    try {
      const connectioninstance=  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`, )
        console.log(`MongoDB connected! DB HOST: ${connectioninstance.connection.host}`);
      
    } catch (error) {
        console.error("Database connection error:", error);
        process.exit(1);
    }
}

export default connectToDatabase;
