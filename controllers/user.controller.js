// function(req,res){
//     var name = req.body.name;
//     var email =req.body.email;
//     var pass = req.body.password;
//     var phone =req.body.phone;

import bcrypt from "bcrypt";

const generateAccessAndRefreshToken = async function (user) {
  const accessToken = user.createAccessToken();
  const refreshToken = user.createRefreshToken();

  return { accessToken, refreshToken };
};

import { genSalt } from "bcrypt";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utility/cloundinary.js";
import { Tweet } from "../models/tweet.model.js";

//     var data = {
//         "name": name,
//         "email":email,
//         "password":pass,
//         "phone":phone
//     }

export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    // user exist or not
    // password hashing and credentials
    // Accesstoken and refresh token set
    // user create
    // save user in db

    let user = await User.findOne({ email: email });

    if (user) {
      console.log(user.email);
      return res.send({ message: "user already exist", result: false });
    }

    const newUser = new User(req.body);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      newUser
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    return res
      .status(201)
      .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
      .json({
        result: true,
        message: "user created",
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "user not created", error, result: false });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({
      message: "user hai hi nahi bhai",
      result: false,
    });
  }
  let validPass = await user.isPasswordValid(password);

  console.log(validPass);

  if (!validPass) {
    return res.status(401).json({
      message: "Incorrect Password",
      result: false,
    });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user
  );

  user.refreshToken = refreshToken;
  // await newUser.save();

  return res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json({
      result: true,
      message: "user logged in",
    });
};

// creating a protected route
export const getUser = (req, res) => {
  const user = req.user;

  return res.status(200).json({
    message: "got the user",
    result: true,
    user,
  });
};

export const userLogout = (req, res) => {
  const user = req.user;

  res.clearCookie("accessToken").clearCookie("refreshToken").json({
    message: "user logged out",
    result: true,
  });

  user.refreshToken = null;
};

export const updateProfile = async (req, res) => {
  const user = req.user;
  const localFilePath = req.files.profilePicture[0].path;

  const response = await uploadOnCloudinary(localFilePath);

  const updatedUser = await User.findByIdAndUpdate(
    user._id, // Provide the user ID directly
    { profilePicture: response.url }, // Update object
    { new: true } // Options: `new: true` returns the updated document
  );
  return res
    .status(200)
    .json({ message: "profile picture updated", result: true, updatedUser });
};

export const userTweetCount = async (req, res) => {
  // get the user from req;
  // Tweet DB
  //
  // in aggregate function ->match user then ->group tweets using user
  // then we will just fund the

  const user = req.user;

  const data = await Tweet.aggregate([
    // Let tweet data
    // Twt1  user1   “ dcwwrvfrv”
    // Twt2  user2   “ dcwwrvfrv”
    // Twt3  user1   “ dcwwrvfrv”
    // Twt4  user3   “ dcwwrvfrv”
    // Twt5  user1   “ dcwwrvfrv”
    // Twt6  user2   “ dcwwrvfrv”

    { $match: { user: user._id } },

    { $group: { _id: user._id, tweetCount: { $sum: 1 } } },
  ]);
  console.log(data);

  const tweetCount = data[0] ? data[0].tweetCount : 0;

  return res.status(200).json({
    message: "got tweet count",
    result: true,
    tweetCount,
  });
};
