import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import { AppError } from "../utils/errorhandler.js";
const registerService = async(data)=>{
    const {fullName, age, address, phoneNumber, email, password} = data; // Data is req.body

    // 1. Check if all info is filled 
    if(!fullName || !age || !address || !phoneNumber || !email || !password){
        throw new AppError("Fill all required fields", 400);
    }

    // 2. Check if the user already exist
    if(await User.findOne({email})){
        throw new AppError("Email is already registered", 401);
    }

    // 3.Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // 4. Create new user
    const newUser = await User.create({
        fullName,
        age,
        address,
        phoneNumber,
        email,
        passwordHash
    });

    // 5. Return data
    return{
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        age: newUser.age,
        address: newUser.address,
        phoneNumber: newUser.phoneNumber,
        createdAt: newUser.createdAt
    }
}
export default registerService