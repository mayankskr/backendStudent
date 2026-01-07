// Import 
import mongoose from "mongoose";

// Schemas

// Course Progress Schema
const courseProgressSchema = new mongoose.Schema(
    {
        courseId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
          required: true
        },
        code:{
            type:String
        },
        title:{
            type:String
        },
        modulesCompleted:{
            type: Number,
            default:0
        },
        totalModules:{
            type: Number,
            default:0
        },
        percent: {
            type: Number,
            min: 0,
            max: 100,
            default:0
        },
        lastActivityAt:{
            type: Date,
        },
        status:{
            type: String,
            enum: ["active", "completed", "paused"],
            default: "active"
        }
    },
    {_id: false}
)

// Result Schema
const resultSchema = new mongoose.Schema(
    {
        quizId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Quiz",
            required: true
        },
        courseId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required:true
        },
        title:{
            type: String
        },
        score:{
            type: Number
        },
        maxScore:{
            type: Number
        },
        percent:{
            type: Number
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { _id: false }
)

// user Schema
const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true
        },
        lastName:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            index: true
        },
        passwordHash: {
            type: String,
            required: true
        },
        bio:{
            type:String,
        },
        className:{
            type:String,
        },
        phone:{
            type:String,
            match: /^[0-9]{10}$/
        },
        isActive:{
            type:Boolean,
            default:true,
        },
        overallProgress:{
            type:Number,
            default:0
        },
        avatar:{
            type:String,
        },
        studentId:{
            type:String,
            unique: true,
            sparse: true
        },
        courses: [courseProgressSchema],
        recentResults: [resultSchema],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        lastLoginAt: {
            type: Date
        },
        loginCount: {
            type: Number,
            default: 0
        },
    },
    {
        timestamps: true
    }
)

// Model
const User = mongoose.model("User", userSchema);

// Export
export default User
