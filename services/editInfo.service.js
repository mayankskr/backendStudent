import User from "../models/user.model.js";
import { AppError } from "../utils/errorhandler.js";

export const editInfoService = async (userId, data, file) => {
  const { fullName, age, phoneNumber, address, email } = data;

  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  // Email uniqueness check
  if (email && email !== user.email) {
    const emailExists = await User.findOne({ email });
    if (emailExists) throw new AppError("Email already in use", 409);
  }

  // Update fields
  user.fullName = fullName || user.fullName;
  user.age = age || user.age;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.address = address || user.address;
  user.email = email || user.email;

  // Update avatar
  if (file) {
    user.avatar = file.filename;
  }

  await user.save();

  return {
    id: user._id,
    fullName: user.fullName,
    age: user.age,
    phoneNumber: user.phoneNumber,
    address: user.address,
    email: user.email,
    avatar: user.avatar
  };
};
