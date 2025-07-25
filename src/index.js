
import dotenv from "dotenv";
dotenv.config({ path: './env' });
import express from "express";
import connectToDatabase from "./db/inndex.js";
import { app } from "./app.js"; // Import the app from app.js


connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on port :${process.env.PORT || 8000}`);
        });
    })
    .catch(err => {
        console.error("Database connection failed error:", err);
    });

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