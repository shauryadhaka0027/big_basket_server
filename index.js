import express from 'express';
import dotenv from "dotenv"
import userRouter from "./routes/user.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import connection from './config/db.js';
import productRouter from "./routes/product.js"

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors({
    origin: "https://big-basket-client.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH']
}))
app.use(cookieParser())
app.use("/",userRouter)
app.use("/product",productRouter)


app.listen(port,async()=>{
    await  connection
    console.log(`Server is running on port ${port}`);
}
);