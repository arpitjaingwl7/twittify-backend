import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized user",
                result: false
            });
        }

        const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET);
        const email = verifiedToken.email;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(401).json({
                message: "Unauthorized user",
                result: false
            });
        }

        req.user = user; // You can attach the user object directly
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            result: false,
            error: error.message
        });
    }
};

