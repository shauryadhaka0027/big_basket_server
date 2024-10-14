import mongoose from "mongoose";

const productSchema=mongoose.Schema({
    id:Number,
    name:String,
    price:Number,
    originalPrice:Number,
    discount:Number,
    image:String,
    category:String,
  
})

const Product=mongoose.model("Product",productSchema);

export default Product;