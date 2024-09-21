import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})
let User;

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model does not exist, create a new one
  User = mongoose.model("User", userSchema);
}

const models = {User}
export default models;