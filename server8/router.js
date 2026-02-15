import express from 'express';
import dotenv from 'dotenv';

const app = express();

app.use(express.json());

const port = 6000;

dotenv.config();




app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`)
})