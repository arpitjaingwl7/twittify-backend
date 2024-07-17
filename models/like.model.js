
import mongoose from "mongoose";
import { Schema } from "mongoose";




const likeSchema = new mongoose.Schema({
  
    tweet:{
 type:Schema.Types.ObjectId,
 ref:"Tweet"

    },


   user:{
    type: Schema.Types.ObjectId, 
    ref:"User"
   }
    
}, { timestamps: true });


export const Like = mongoose.model("Like", likeSchema);
