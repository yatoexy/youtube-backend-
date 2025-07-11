
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import express from "express";
import connectToDatabase from "./db/inndex.js";
connectToDatabase();


/*
import express from "express";
const app = express();
;(async()=>{
    try{
 await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
 app.on("error",(error)=>{
        console.error("ERROR",error);
        throw err;

    })

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}catch(error){
        console.error("ERROR",error)
        throw err
    }
})()*/