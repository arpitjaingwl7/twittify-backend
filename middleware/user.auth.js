import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import errorHandler from "../utility/errorHandler.js";

export const userAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        if (!token) {
                return next(errorHandler(401,"Unauthorized user"))
                // return res.status(401).json({
                    //     message: "Unauthorized user",
                    //     result: false
                    // });
                }
                
                const verifiedToken = jwt.verify(token, process.env.ACCESS_SECRET);
                const email = verifiedToken.email;
                
                const user = await User.findOne({ email: email });
                
                if (!user) {
                    return next(errorHandler(401,"Unauthorized user"))
                    //         return res.status(401).json({
                        //     message: "Unauthorized user",
                        //     result: false
                        // });
                    }
                    
                    req.user = user; // You can attach the user object directly
                    next();
                } catch (error) {
                    
                    return next(errorHandler(500,"Internal Server Error"))
        // return res.status(500).json({
        //     message: "Internal Server Error",
        //     result: false,
        //     error: error.message
        // });
    }
};

