import cookieParser from "cookie-parser"
import express, { urlencoded } from "express"
import userRoute from "./routes/user.route.js";
import { userAuth } from "./middleware/user.auth.js";
import tweetRoute from "./routes/tweet.route.js";
import likeRouter from "./routes/like.route.js";

const app = express()
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded())


app.use("/user",userRoute)
app.use("/tweet",userAuth,tweetRoute)
app.use("/like",likeRouter)

app.get("/",(req,res)=>{
res.send("ha bhai sab badiya code chal rha hai")
})



export default app