import express from 'express';
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";


const app = express();
dotenv.config();

const port =  process.env.PORT || 3000

app.use(express.json());


//Login api
app.post('/login',async(req,res)=>{
    const {name,password} = req.body;
    console.log(req.body);
  
    
    const pass = (req.body.password);
    const envpass=  (process.env.DEFAULT_PASS);

    console.log("body pass:",pass);
    console.log("default pass:", envpass);


if( !envpass){
    console.error("Password not found in .env");
    process.exit(1);
}


    const hashedpass = await bcrypt.hash(envpass,10);
     console.log("Hashed password",hashedpass);



      const isMatch = await bcrypt.compare(pass,hashedpass);
       if (isMatch){
            return res.json({ message: 'pasword is correct'});
        }else{
            return res.json({ message: 'pasword is not correct'});
        }


});   

    

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
});