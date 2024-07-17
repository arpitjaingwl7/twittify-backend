import mongoose from "mongoose";
import { Schema } from "mongoose";




const tweetSchema = new mongoose.Schema({
   tweetText:{
    type:String,
    required:true
   },


   user:{
    type: Schema.Types.ObjectId, 
    ref:"User"
   }
    
}, { timestamps: true });


export const Tweet = mongoose.model("Tweet", tweetSchema);



