import express from 'express';
import dotenv from 'dotenv';

import indexRouter  from './routes/index.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api', indexRouter)

app.use('/pass-fun',indexRouter)

const port = 5000;

//api-get
app.get('/get', (req,res)=>{
    res.status(200).json({
        status: true,
        message: "Server successfully created"
    })
})

//api-post
app.post('/login', (req,res)=>{
    const data = req.body;
    res.status(200).json({
        status: true,
        message: "login successfully ",
        info: data
    })
})



app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
