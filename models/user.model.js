import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profilePicture: {
        
        type: String,
        default:"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHF2MjBseGQ5ZHRicHl1aXhwcnVleWR2OTBxdmxqdHhuejV3c2s2YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2YWxUulKOk8EM4gg/giphy.gif"
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.methods.isPasswordValid=function(password){

    return bcrypt.compare(password,this.password);
}

userSchema.methods.createAccessToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.ACCESS_SECRET
        
    );
};

userSchema.methods.createRefreshToken = function () {
    return jwt.sign(
        { _id: this._id, email: this.email },
        process.env.REFRESH_SECRET
       
    );
};

export const User = mongoose.model("User", userSchema);
