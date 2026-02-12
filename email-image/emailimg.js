import express from 'express';
import dotenv from 'dotenv';
import nodemon from 'nodemon';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const port = process.env.PORT || 8000;
app.use(express.json());
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Login api
app.post('/login',async (req,res)=>{
    try{
        const userbody = req.body;

        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            }
        });

        //email validTION
        if( userbody.email !== process.env.DEFAULT_EMAIL){
            res.status(404).json({
                status:false,
                message:"Email is not matching👎"
            });
        }

        //verify transporter
        transporter.verify((error,success)=>{
            if(error){
                console.log("Email server error:",error);
            }else{
                console.log("Email server is ready")
            }
        })

        //send mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to:userbody.email,
            subject:"Image Check",
            text:"IMAGE",

            html: `<h1>hello Krishna...</h1>
            <p>This is a sample mail to check the image attachment in sending Email</p>
            <img src= "cid:myEmailImage"  />`,
            attachments: [
                {
                    filename: 'email.jpg',
                    path: path.join(__dirname,'email.jpg'),
                    cid: 'myEmailImage'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({
            status:true,
            message:"Image send successfully!"
        });
    } catch(error){
        res.status(500).json({
            status:false,
            message:"server error",
            error: error.message,
        })
    }

})


app.listen(port,()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})


export default app;