import mongoose from "mongoose";

export const connectdb = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000, // Reduce timeout
      connectTimeoutMS: 5000, // Reduce connection timeout
      socketTimeoutMS: 45000, // Increase socket timeout
      maxPoolSize: 10, 
    })
    .then(()=>console.log("db connected"))
    .catch((error) => console.log("error in connecting db:", error));
}