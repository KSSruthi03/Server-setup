const express = require('express');
const app4 = express();
const port =3000;

app4.use(express.json())

const course = [
    {
    id : 1,
    name : "Biology"
    },
    {
    id : 2,
    name : "Physics"
    },
    {
     id : 3,
    name : "Maths"
    },
    {
     id : 4,
    name : "English"
    },
    {
     id : 5,
    name : "Chemistry"
    },
    {
     id : 6,
    name : "Hindi"
    },
    {
     id : 7,
    name : "Computer"
    },
    {
     id : 8,
    name : "B com"
    },
    {
     id : 9,
    name : "Biochemistry"
    },
    {
     id : 10,
    name : "Arabic"
    },
    {
     id : 11,
    name : "Urudhu"
    },
    {
     id : 12,
    name : "Malayalam"
    }
];
//get all users fetching data
app4.get('/get-all' , (req, res) =>{
    res.status(200).json({
        status: true,
        message: "Get all users",
        course
    })
})


//get by id
app4.get("/id", (req,res) =>
{
    if (req.params === data.id)
})


app4.listen (port,() => {
    console.log(`Server is running on http://localhost:${port}`)
})