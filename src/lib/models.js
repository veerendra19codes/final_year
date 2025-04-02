import mongoose from "mongoose";

let Society;
let User;
let Registry;
let Event;
let Complaint;
let Utility;
let Announcements;
let Visitor;


let Budget; 

// Existing User schema
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: {
        type: String,
        enum: ["watchman", "secretary", "member", "committeeMember", "guest"],
        default: "guest", 
        required: true,
    },
    maintenanceAmount: { type: Number, default: 10000 },
    maintenanceStatus: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
    datePaid: { type: Date, default: null },
    society: { type: String, trim: true },
    societyId: { type: mongoose.Schema.Types.ObjectId, ref: "Society" },
    phoneNumber: { type: String, trim: true },  // New field
    address: { type: String, trim: true },  // New field
    dob: { type: Date },  // New field
    gender: { type: String, enum: ["male", "female", "other"] },  // New field
    profileImage: { type: String },  // New field for profile image
    
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
    image: {
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
    ],
    inviteLink: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        trim: true,
    }
}, {timestamps: true});


// New Complaint schema
const complaintSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    dateAdded: {
        type: Date,
        default: Date.now, // Automatically set to the current date and time
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    societyId: {
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

const announcementsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      // required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    society: {
      type: String,
    },
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },
    secretary: {
      type: String,
    },
  },
  { timestamps: true }
);


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
    description: {
        type: String,
        trim: true
    },
    image: {
        type: String,
    },
    scheduledAt: {
        type: Date,
    },
    listedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society",
        required: true,
    },
    society: {
        type: String,
        trim: true
    }
}, { timestamps: true });


const utilitySchema = new mongoose.Schema({
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
        // required: true,
        trim: true,
        }
    ],
    image:{
        type: String,
        // required: true,
        trim: true,
    },
    
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    societyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Society", 
        required: true,
    },
    society: {
        type: String
    }
}, {timestamps: true});

//budget ka schema
const budgetSchema = new mongoose.Schema({
    month: {
      type: String, // e.g. "2023-06"
      required: true,
    },
    societyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Society",
      required: true,
    },
    totalBudget: {
      type: Number,
      default: 300000,
    },
    expenses: [
      {
        name: String,
        date: Date,
        amount: Number,
        category: String,
      }
    ],
  }, { timestamps: true });

  const visitorSchema = new mongoose.Schema(
    {
      name: { type: String, required: true, trim: true },
      attendingHouse: { type: String, required: true, trim: true },
      time: { type: Date, default: Date.now, required: true },
      societyId: { type: mongoose.Schema.Types.ObjectId, ref: "Society", required: true },
    },
    { timestamps: true }
  );

  try {
    Visitor = mongoose.model("Visitor");
  } catch (error) {
    Visitor = mongoose.model("Visitor", visitorSchema);
  }

try {
    User = mongoose.model("User");
} catch (error) {
    User = mongoose.model("User", userSchema);
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

try {
    Utility = mongoose.model("Utility");
} catch (error) {
    Utility= mongoose.model("Utility", utilitySchema);
}

try {
    Announcements = mongoose.model("Announcements");
} catch (error) {
    Announcements= mongoose.model("Announcements", announcementsSchema);
}

try {
    Budget = mongoose.model("Budget");
  } catch (error) {
    Budget = mongoose.model("Budget", budgetSchema);
  }
const models = { User, Society, Registry, Event, Complaint, Utility, Announcements ,Budget,Visitor};
export default models;
