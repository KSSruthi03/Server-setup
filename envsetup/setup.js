const express = require('express');
const dotenv = require("dotenv")
const  app = express();

dotenv.config();

const port = process.env.PORT || 3000;

app.use(express.json());

const  job = [
    {
        id    :  1,
        name  :  "Tutor"
    },{
        id    :  2,
        name  :  "Manager"
    },{
        id    :  3,
        name  :  "Assistant"
    }
]

app.get('/get', (req,res) =>{
    res.status(200).json({
        status  : true,
        message : "successfuly fetched!",
        Data   :  job
    })
})

app.listen(port, () =>{
    console.log(`Server is running on port http://localhost${port}`)
})