
import { Router } from "express";
import { createUser, getUser, loginUser, updateProfile, userLogout, userTweetCount } from "../controllers/user.controller.js";
import { userAuth } from "../middleware/user.auth.js";
import { upload } from "../middleware/multer.middleware.js";

const userRoute=Router();

userRoute.post("/signup" ,createUser)
.post("/login",loginUser)
.get("/getuser",userAuth,getUser)
.post("/logout",userAuth,userLogout)
.patch("/updateprofile",userAuth,upload.fields([{name:"profilePicture",maxCount:1},]),updateProfile)
.get("/usertweetcount",userAuth, userTweetCount)



    

export default userRoute;