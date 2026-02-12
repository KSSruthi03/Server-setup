import express, { response } from 'express';
import dotenv, { config } from 'dotenv';
// import nodemon from 'nodemon';
import nodemailer from 'nodemailer';


const app = express();

dotenv.config();
const port = process.env.PORT || 6000;
app.use(express.json());

// //checking server health 
// app.get('/app-heal', (req, res) => {
//     res.status(200).json({
//         status: true,
//         message: "Server is running✔️"
//     })
// })


// //validating email
// app.post('/login', (req, res) => {
//     const bodyemail = req.body.email;
//     console.log("from postman:", bodyemail.email);
//     const envemail = process.env.EMAIL_USER
//     console.log("from .env:", envemail);


//     if (!bodyemail) {
//         return res.status(400).json({
//             status: false,
//             message: "No Email found!"
//         })
//     }

//     if (bodyemail !== envemail) {
//         return res.status(404).json({
//             satatus: false,
//             message: "Email is not matching!"
//         })
//     }
//     return res.status(200).json({
//         status: true,
//         message: "Email is matching!",
//         info: req.body
//     })

// })


//Login api
app.post('/send-msg', async (req, res) => {
    try {
        const userData = req.body;

        //nodemailer setup
        //Nodemail Transporter
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
        });

        //Email validation
        if (userData.email !== process.env.DEFAULT_EMAIL) {
            res.status(404).json({
                satatus: false,
                message: "Email is not matching!"
            });

        }

        if (userData.password !== process.env.DEFAULT_PASS) {
            res.status(404).json({
                satatus: false,
                message: "Password is not matching!"
            });

        }


        //Verify transporter
        transporter.verify((error, success) => {
            if (error) {
                console.log("Email server error:", error);
            } else {
                console.log("Email server ready");
            }
        });


        //send Mail Code
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userData.email,
            subject: "Login check",
            text: "Login Success"
        };

        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "Login successfully",
            // messageId : info.messageId,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
});

export default app;