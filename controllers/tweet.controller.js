import { Tweet } from "../models/tweet.model.js";

export const createTweet = async (req, res) => {
  const tweetText = req.body.tweetText;

  if (!tweetText) {
    return res.status(400).json({
      message: "bhai haramkhori mat kro,tweet khali choda hai",
      result: false,
    });
  }

  const tweet = new Tweet({
    tweetText,
    user: req.user._id,
  });

  const savedTweet = await tweet.save();
  res.status(201).json({
    message: "mubarak ho aapka ho gya...tweet",
    result: true,
    savedTweet,
  });
};

export const getAllTweet = async (req, res) => {
  const tweetData = await Tweet.find({});

  return res
    .status(200)
    .json({ tweetData, message: "lele tweet sare", result: true });
};

export const getMyTweet = async (req, res) => {
  const userId = req.user._id;

  const tweetData = await Tweet.find({ user: userId });

  if (!tweetData) {
    return res.status(400).json({
      message: "bhai tweet kro fir dekho",
      result: false,
    });
  }

  return res
    .status(200)
    .json({ tweetData, message: "lele tweet sare", result: true });
};
// export const  getTweetById=(req,res)=>{

// }



export  const getTweetLikeCount=async(req , res)=>{

// Let tweet data
// Twt1  user1   “ dcwwrvfrv”     
// Twt2  user2   “ dcwwrvfrv”
// Twt3  user1   “ dcwwrvfrv”
// Twt4  user3   “ dcwwrvfrv”
// Twt5  user1   “ dcwwrvfrv”
// Twt6  user2   “ dcwwrvfrv”




// Let Like data
// Like1    tw1  us2
// Like2   tw1  us2
// Like3    tw1  us1
// Like4    tw1  us2
// Like5    tw3  us1
// Like6    tw3  us2
// Like7    tw5  us3
// Like8    tw4  us1


/* create a aggregation pipeline on tweet data
    ->lookup and add like inside tweet
    ->find the length of like object 
    ->add a field count and give it  value of that length


*/

const data=await Tweet.aggregate(

  [
    {$lookup:{
      from:"likes",
      localField:"_id",
      foreignField:"tweet",
      as:"likes"
    }},

    // Twt1  user1   “ dcwwrvfrv” likes:[like1, like2 ....]


    {$addFields:{likeCount:{$size:"$likes"}}},
    {$project:{
      likeCount:1,
      tweetText:1,
    }}
  ]
)

return res.status(200).json({message:"like count on tweet recieved ",
  result:true,
  data
})


}
