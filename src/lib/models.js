import mongoose from "mongoose";

let Society;
let User;

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
}, { timestamps: true})

const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    image_public_id: {
        type: String,
        unique: true,
        // required: true,
        trim: true,
    },
    secretary: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, {timestamps: true})

try {
  // Try to get the existing model
  User = mongoose.model("User");
} catch (error) {
  // If the model does not exist, create a new one
  User = mongoose.model("User", userSchema);
}

try {
  // Try to get the existing model
  Society = mongoose.model("Society");
} catch (error) {
  // If the model does not exist, create a new one
  Society = mongoose.model("Society", societySchema);
}


const models = { User, Society }
export default models;