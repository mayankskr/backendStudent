import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/errorhandler.js";

const loginService = async({email, password})=>{ // We are destructing the parameter passed to loginService
    // 1. Check if email and password are filled
    if(!email || !password){
        throw new AppError("Email and password required",400)
    }

    // 2. Check if the email is registered or not
    const user = await User.findOne({email})
    if(!user){
        console.error("User Not registered")
        throw new AppError("User not registered",401)
    }

    // 3. Compare the password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        throw new AppError("Invalid email or password", 401);
    }

    // 4. Generate token
    const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    // 5. Return safe data + token
    return {
        token,
        user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        age: user.age,
        address: user.address,
        phoneNumber: user.phoneNumber
        }
    };
}
export default loginService;