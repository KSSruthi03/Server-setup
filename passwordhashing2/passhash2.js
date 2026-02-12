import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

const app = express();

dotenv.config();

const port = 8000;

app.use(express.json());

app.post('/login',async(req,res)=>{
    try{
        const userdata = req.body;

        const envEmail = process.env.EMAIL;
        const envPass  = process.env.PASS;

        //Email validation
        if( userdata.email !== envEmail){
            res.status(401).json({
                status: false,
                message:" Email is not matching!"
            })
        }

        //Password validation
       const hahedPassword = await bcrypt.hash(envPass,10);
       //Password matching
       const PasswordMatching = await bcrypt.compare(userdata.password,hahedPassword);

       if(!PasswordMatching){
        res.status(400).json({
            status:false,
            message:"Password is not matching!"
        })
       }

       res.status(200).json({
        status: true,
        message:"Login Successfull!",
        response:{
            user:{
                email: userdata.email,
                password:hahedPassword
            }
        }
       })
    }
    catch(error){
        res.status(500).json({
            status: false,
            message:"Internal Server Error",
            response: error.message
        })
    }
   
})


app.listen(port,()=>{
    console.log(`Server is runnning on port: http://localhost:${port}`);
})