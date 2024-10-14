import mongoose from "mongoose";

const cartSchema=mongoose.Schema({
    name:String,
    price:Number,
    originalPrice:Number,
    discount:Number,
    image:String,
    category:String,
    userId:{type:mongoose.Schema.Types.ObjectId ,ref:"user"}
  
})

const Cart=mongoose.model("Cart",cartSchema);

export default Cart;