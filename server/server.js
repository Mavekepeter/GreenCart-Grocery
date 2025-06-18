import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';


const app = express();
const port = process.env.PORT || 4000;
const allowedOrigins = ['http://localhost:5173']

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credential:true}));
await connectDB()

app.get('/',(req,res)=>res.send("API IS WORKING"))
app.use('/api/user',userRouter)


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
    
})