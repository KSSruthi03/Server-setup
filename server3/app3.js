const express = require('express');
const app3 = express() ;
const port = 4200;

app3.use (express.json());

const names = [
    {id: 1, name:" Manu"},
    {id: 2, name:" Sam"},
    {id: 3, name:" Ram"},
    {id: 4, name:" Sree"},
    {id: 5, name:" Rose"}
];

app3.get ('/',  (req, res)=> {
    res.status (200).json({
        status: true,
        message: "server3 is sucesfully running!"
    }
        
    )
    })

    app3.post ('/create',(req,res) => {
        console.log(req.body)
        res.status (201).json({
            status: true,
            data: req.body,
            message: "User created"
        })
    })



app3.listen(port, () => {
    console.log(`server is running http://localhost:${port}`)
})