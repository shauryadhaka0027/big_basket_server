import Cart from "../model/addCart.js"
import Product from "../model/product.js"

export const getItem= async(req,res)=>{
    try {
        const product= await Product.find().limit(4)
        res.status(200).json({message:"success",data:product})
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const getProduct=async(req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        if(!product) return res.status(404).json({message:"Product not found"})
            
        res.status(200).json({message:"success",data:product})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

export const addCart=async(req,res)=>{
  try {
    const response= new Cart({userId:req.userId,...req.body})
    await response.save()
    res.status(201).json({message:"Product added to cart successfully",data:response})
  } catch (error) {
    res.status(500).json({Message:error})
  }
}