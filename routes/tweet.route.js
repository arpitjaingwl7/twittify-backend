import { Router } from "express";
import { createTweet, getAllTweet, getMyTweet, getTweetLikeCount } from "../controllers/tweet.controller.js";


const tweetRoute=Router();

tweetRoute.post("/createTweet",createTweet)
.get("/alltweet",getAllTweet)
.get("/mytweet",getMyTweet)
.get("/tweetlikecount",getTweetLikeCount)



export default tweetRoute;