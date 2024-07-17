import app from "./app.js";
import 'dotenv/config'
import connectDB from "./db/index.js";

app.listen(process.env.PORT,()=>{
    console.log("server running on port "+process.env.PORT)

});

connectDB();



// midlewares
// server connect
// db connect
