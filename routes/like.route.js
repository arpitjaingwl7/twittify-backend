import { Router } from "express"
import { userAuth } from "../middleware/user.auth.js";
import { createLikeOnTweet } from "../controllers/like.controller.js";


const likeRouter=Router();


likeRouter.post("/createLike/:tweetId",userAuth,createLikeOnTweet)


export default likeRouter;