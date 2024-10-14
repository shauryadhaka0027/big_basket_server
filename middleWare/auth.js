import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const auth=async(req,res,next)=>{
 
    try {
        const token=req.cookies["token"]
        if(!token) return res.status(401).json({message:"Token is required"})
         console.log("token",token)
      jwt.verify(token,process.env.SECERT_KEY,async(err, decode)=>{
      if(err){
        return res.status(403).json({message:"Token is not valid"})
      }
      req.userId=decode.id
      next()
      })
     
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}