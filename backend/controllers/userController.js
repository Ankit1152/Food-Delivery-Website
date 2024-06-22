import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Checking if user is already registered
    const existedUser = await userModel.findOne({ email: email });
    if (existedUser) {
      return res.json({
        success: false,
        message: "User already exists with this email",
      });
    }
    // Validating Email fromat and strong password
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password with at least 8 characters",
      });
    }

    // Hashing user password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const createdUser = await newUser.save();
    const token = createToken(createdUser._id);
    res.json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existedUser = await userModel.findOne({ email: email });
    if (!existedUser) {
      return res.json({
        success: false,
        message: "User does not exist with this email",
      });
    }
    const isMatch = await bcryptjs.compare(password, existedUser.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = createToken(existedUser._id);
    res.json({
      success: true,
      message: "User logged in successfully",
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error",
    });
  }
};

export { registerUser, loginUser };
