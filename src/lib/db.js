import mongoose from "mongoose";

export const connectdb = async () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("db connected"))
    .catch((error) => console.log("error in connecting db:", error));
}