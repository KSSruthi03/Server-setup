const express = require('express');
const app2 = express();
const port = 4100;

app2.use (express.json());

const students = [
    {id:1, name:"sruthi"},
    {id:2, name:"anagha"},
    {id:3, name:"lakshmi"},
    {id:4, name:"sneha"}
];

app2.get(
    '/', (req, res) => {
        res.status(200).json({ 
            status: true,
            students: students,
            message: " welcome to sruthi's server2"
         });
            }
)

// post request
app2.post('/create', (req, res) => {
    console.log(req.body)
    res.status(201).json({
        status: true,
        data: req.body,
        message: "User Created"
    })
})

app2.listen (port,() =>{
    console.log(" server is running http://localhost:4100")
})