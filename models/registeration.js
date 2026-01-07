import mongoose from "mongoose";

// Schema
const registrationSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    classNumber:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        match: /^[0-9]{10}$/,
        required: true,
    },
    email:{
        type: String,
        lowercase: true,
        trim: true,
        unique:true,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    lastLoginAt: {
      type: Date
    }
},
{ timestamps: true }
)

// Model
const Register = mongoose.model("Register", registrationSchema);

// Export model
export default Register;