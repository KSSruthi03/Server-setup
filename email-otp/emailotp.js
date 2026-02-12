import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';


dotenv.config();
const port = process.env.PORT || 4000;

const app = express();

app.use(express.json());

//sending otp-login api
app.post('/login',async (req,res)=>{
    try{
        
        const otp =parseInt( process.env.DEFAULT_OTP);
        const userbody = req.body;
        const transporter= nodemailer.createTransport({
            service:"gmail",
            auth: {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS,
            }
        });

        //email validation 
        if( userbody.email !== process.env.DEFAULT_EMAIL){
           return  res.status(404).json({
                status:false,
                message:"Email is not matching!"
            });
        }

        //verify transporter
        transporter.verify((error,success)=>{
            if (error){
                console.log("Email server error:",error);
            }else{
                console.log("Email server is ready")
            }
        })

        //send mail
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userbody.email,
            subject:"Sending OTP",
            html:`<p> Please do not share it with anyone for security reasons.
                      Your OTP: ${otp}</p>`,
           
        };

        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({
            status:true,
            message:"Email send successfully!"
        });

       

    }
     catch(error){
        res.status(500).json({
            status:false,
            message:"Server error",
            error: error.message,
        })
    }



})

 //otp validation
        app.post('/verifyotp',(req,res)=>{
            const bodyotp = parseInt(req.body.otp);
            const envotp = parseInt(process.env.DEFAULT_OTP)
            console.log("Body OTP:",bodyotp);
            if ( bodyotp !== envotp){
                return res.status(404).json({
                    status:false,
                    message: "OTP is not matching!" 
                })
            }

            return res.status(200).json({
                status:true,
                message:"Login successful!"
            })
        })


app.listen(port,()=>{
    console.log(`Server is running on port: http://localhost:${port}`)
})

export default app;