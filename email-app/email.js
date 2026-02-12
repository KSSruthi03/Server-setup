// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
const app = express();
// const dotenv = require('dotenv');
// const nodemailer = require('nodemailer');

dotenv.config();

const port = process.env.PORT || 8000;

app.use(express.json());

//test api
app.get('/api-status',(req,res)=>{
  res.status(200).json({
    status:true,
    message:"Server is running successfully!"
  })
})

//Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth:{
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  }
});

//verify transporter
transporter.verify((error,success) =>{
  if(error){
    console.log("❌ Email server error:",error);
  }else{
    console.log("✅ Email server ready");
  }
});

//send mail api
app.post('/send-mail', async (req,res) =>{
  try{
    const { to, subject, text, html } = req.body;

    const mailOptions = {
      from : `"My Email-App" <${process.env.EMAIL_USER}>`,

      to,
      subject,
      text,
      html,
    };

const info = await transporter.sendMail(mailOptions);

res.status(200).json({
  success : true,
  message:"Email sent successfully",
  messageId : info.messageId,
});

  }catch(error){
    res.status(500).json({
      success:false,
      message:"Failed to send email",
      error: error.message,
    });
  }
});

//server start
app.listen(port,() =>{
    console.log(`Server is running on http://localhost:${port}`)
})

export default app;