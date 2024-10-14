import mongoose from "mongoose";

const userSchema= mongoose.Schema({
    email:{type:"string", required: true,unique: true},
    otp:{type:"string"}
})

export const User= mongoose.model("User",userSchema);

