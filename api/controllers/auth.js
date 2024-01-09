import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const register = async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  try {
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(200).send("User has been created");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    let userMatched = await User.findOne({ userName: req.body.userName });

    if (!userMatched) return next(createError(404, "User not found"));

    const isCorrectPassword = await bcrypt.compare(
      req.body.password,
      userMatched.password
    );

    if (!isCorrectPassword)
      return next(createError(400, "Password is not correct"));

    const token = jwt.sign(
      { id: userMatched._id, isAdmin: userMatched.isAdmin },
      process.env.JWT
    );

    const { password, isAdmin, ...otherDetails } = userMatched._doc;

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({ ...otherDetails });
  } catch (err) {
    return next(err);
  }
};
