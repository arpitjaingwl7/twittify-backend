import { Like } from "../models/like.model.js";
export const createLikeOnTweet=async(req,res)=>{

    
// Let Like data 
// Like1    tw1  us2
// Like2    tw1  us2
// Like3    tw1  us1
// Like4    tw1  us2
// Like5    tw3  us1
// Like6    tw3  us2
// Like7    tw5  us3
// Like8    tw4  us1


    

    // we need userId who is liking the tweet
    // we need tweetId which we liking

    const userId= req.user._id;
    const tweetId=req.params.tweetId

    const existingLike = await Like.findOne({ tweet: tweetId, user: userId });

    if (existingLike) {
      return res.status(400).json({
        message: "You have already liked this tweet",
        result: false,
      });
    }
    let like= await Like({
        tweet:tweetId,
        user:userId
    })

   like= await like.save()

    return res.status(201).json({
        message: "You like it",
        result:true,
        like
      });




}