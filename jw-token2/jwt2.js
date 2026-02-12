import express from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 2000;
const mykey =process.env.MYSECRETKEY;
console.log("my key;",mykey);

//create Acces token
const token = jwt.sign(
    { uesrId : 112, role : 'manager'},  //payload
    mykey,                              //key
    {expiresIn : '1hr'}                 //options
)
console.log("Token;",token);

//verify token
try{
    const decoded = jwt.verify(token, mykey);
    console.log("Decodede: ", decoded);
    }catch(err){
        console.log('Inavlid token',err.message);
    }


    //login api
    app.post('/login',(req,res)=>{
        const pass = req.body.password

        if(!pass){
            res.status(404).json({
                status:false,
                message:  'Password Required!'
            })
        }

        if(pass !== process.env.MYSECRETKEY){
            res.status(404).json({
                status: false,
                message:"Password is not matching!"
            })
        }

        res.status(200).json({
            status:true,
            message:"Login Successfull!",
            data:req.body,
            data2: token
        })
    })

app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})