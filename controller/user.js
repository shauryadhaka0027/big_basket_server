import { User } from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import mailsender from "../utils/sendingEmail.js";

dotenv.config();

export const signup=async(req,res)=>{
    try {
        const {email}=req.body;
        const existingUser=await User.findOne({email});
        const randomNumber = Math.floor(Math.random() * 900000) + 100000;
        let emaildata = {
            toMail: email,
            subject: "OTP LOGIN",
            fromMail: "skdj@gmail.com",
            html: `
                    <html>
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>OTP Verification</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                margin: 0;
                                padding: 0;
                                background-color: #f4f4f4;
                            }
                    
                            .container {
                                max-width: 600px;
                                margin: 20px auto;
                                padding: 20px;
                                background-color: #fff;
                                border-radius: 5px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                    
                            h2 {
                                color: #333;
                            }
                    
                            p {
                                color: #555;
                                line-height: 1.6;
                            }
                    
                            .otp {
                                font-size: 24px;
                                font-weight: bold;
                                color: #4caf50;
                                margin: 20px 0;
                            }
                    
                            .btn-verify {
                                display: inline-block;
                                padding: 10px 20px;
                                background-color: #4caf50;
                                color: white;
                                text-decoration: none;
                                border-radius: 5px;
                                margin-top: 20px;
                            }
                    
                            .btn-verify:hover {
                                background-color: #45a049;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h2>OTP Verification</h2>
                            
                            <p>To complete your login, please use the following One-Time Password (OTP):</p>
                            <div class="otp">${randomNumber}</div>
                            <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
                           
                            <p>If you did not request this OTP, please ignore this email.</p>
                            <p>Best regards,<br />Your Company Name</p>
                        </div>
                    </body>
                    </html>
                    
                  `,
          };
        
        if(existingUser){
            existingUser.otp=randomNumber
            await existingUser.save();
            mailsender(emaildata)
          
            return res.status(200).json({message:"User already exists",data:existingUser});
        }
        const user=new User({otp:randomNumber,email});
        await user.save();
        mailsender(emaildata)
     
        res.status(201).json({message:"User created successfully",data:user});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

export const verifyOTP = async (req, res) => {
    try {
      const { email, otp } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      // console.log(otp ,user.otp)
      if (user.otp === otp) {
        const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY, { expiresIn: "30m" });
        // console.log("token",token)
         user.otp=""
         await user.save();
        res.cookie("token", token, {
          httpOnly:false,
          secure:false,
          maxAge:  24 * 60 * 60 * 1000, // 10 days
          sameSite:"Lax", 
        });
  
        return res.status(200).json({
          message: "Login successful",
          data: user,
          token: token,
        });
      } else {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.error(error); // Log the error
      res.status(500).json({ message: "Internal server error" });
    }
  };
  