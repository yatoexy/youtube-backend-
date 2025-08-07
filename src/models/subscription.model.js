import mongoose, { Schema, mongo } from "mongoose";

const subscriptionSchema = new Schema({
    subcriber:{
        type:Schema.Types.ObjectId, //one to whom  is subcribing
        ref:"User"
    },
    channel:{
        type:Schema.Types.ObjectId, //one to whom 'subcriber' is subcribing
        ref:"User"
    }
})


export const Subscription = mongoose.model("Subscription",subscriptionSchema)