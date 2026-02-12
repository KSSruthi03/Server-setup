const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/not-secure', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Api is not Secure"
    })
})

// Middleware Setup

const MiddleWareSetup = (req, res, next) => {
    const api_key = req.headers['x-api-key'];

    if(!api_key){
        return res.status(401).json({
            status: false,
            message: "Api key Not Found"
        })
    }

    // Both Key Check

    if(api_key !== process.env.SECRET_KEY) {
        return res.status(401).json({
            status: false,
            message: "Api Key is Not Matching"
        })
    }

    next();
}

app.use(MiddleWareSetup)

app.get('/secure-app', (req, res) => {
    res.status(200).json({
        status: true,
        message: "Api Key Is Secure"
    })
})

app.listen(port, ()=> {
    console.log(`Server is Running on http://localhost:${port}`);
})