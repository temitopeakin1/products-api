import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register user
const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(404);
    throw new Error("User already registered");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hashed Password: ", hashPassword);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
  res.json({ message: "Register User" });
});

// login user
const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please complete all fields");
  }
  const user = await User.findOne({ email });
  //compare both passwords
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign({
        user: {
          username: user.username,
          email: user.email, 
          id: user.id,
        },
      }, process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "3m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401)
    throw new Error("email and password is not valid");
  }
});

// current user info (private)
const currentUser = asyncHandler(async (req: Request, res: Response) => {
  res.json(req.user);
});

export { registerUser, loginUser, currentUser };
