import mongoose from "mongoose";

let Society;
let User;
let Registry;
let Event;
let Complaint;


// Existing User schema
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
    role: {
        type: String,
        enum: ["watchman", "secretary", "member", "committeeMember"],
        default: "member", 
        required: true,
    },
    maintenanceAmount: {
        type: Number,
        default: 10000, 
    },
    maintenanceStatus: {
        type: String,
        enum: ["paid", "unpaid"],
        default: "unpaid", 
    },
    datePaid: {
        type: Date, 
        default: null, 
    },
}, { timestamps: true });

// Existing Society schema
const societySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    image_public_id: {
        type: String,
        unique: true,
        trim: true,
    },
    secretary: {
        type: String,
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
}, {timestamps: true});

// Existing Registry schema
const registrySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    intime: {
        type: String,
        required: true,
        trim: true,
    },
    outtime: {
        type: String,
        trim: true,
    },
    desc:{
        type: String,
        trim: true,
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
        required: true, // Each registry must be linked to a society
    }
}, {timestamps: true});

// New Event schema
const eventSchema = new mongoose.Schema({
    eventname: {
        type: String,
        required: true,
        trim: true,
    },
    timings: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
        required: true,
    }
}, { timestamps: true });



const Utility= new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    rating:{
        type: String,
        default: 0,
    },
    review:[
        {
        type:String,
        required: true,
        trim: true,
        }
    ],
    image:{
        type: String,
        required: true,
        trim: true,
    },
    utilityType: {
        type: String,
        required: true,
        trim: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society", 
        required: true,
    },
    
});

// New Complaint schema
const complaintSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    society: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society", // Reference to the Society model
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "resolved"],
        default: "pending", // Complaint status (pending or resolved)
    }
}, { timestamps: true });


try {
    User = mongoose.model("User");
} catch (error) {
    User = mongoose.model("User", userSchema);
}

try {
    User = mongoose.model("Utility");
} catch (error) {
    User = mongoose.model("Utility", Utility);
}


try {
    Society = mongoose.model("Society");
} catch (error) {
    Society = mongoose.model("Society", societySchema);
}

try {
    Registry = mongoose.model("Registry");
} catch (error) {
    Registry = mongoose.model("Registry", registrySchema);
}

try {
    Event = mongoose.model("Event");
} catch (error) {
    Event = mongoose.model("Event", eventSchema);
}

try {
    Complaint = mongoose.model("Complaint");
} catch (error) {
    Complaint = mongoose.model("Complaint", complaintSchema);
}


const models = { User, Society, Registry, Event,Complaint,Utility};
export default models;
