const express = require('express');
const dotenv = require('dotenv');
const app     = express();

dotenv.config();

const port = process.env.PORT || 3000;

const key = process.env.SECRETKEY;
console.log(key)

app.use(express.json());

const  school = [
    {
        id    :  1,
        name  :  "St.joseph"
    },{
        id    :  2,
        name  :  "MMNS school"
    }
]


function checkappkey(req,res,next){
const appkey = req.headers['x-my-key'];

if (appkey == key){
    app.get('/test',checkappkey,(req,res)=>{
    res.json({ message: 'checking successful!'});
    next();
    });
}else{
    res.status(402).json({
        message : "Invalid key",
        status  : fail
    })
}
}



// app.get('/test',(req,res)=>{
//     console.send('Hello World!');
// });


// app.post ('/:id', (req,res) =>{
//     res.status(200).json({
//         status  : true,
//         message : "successfuly added",
//         Data   :  job
//     })
// })

app.listen(port, () =>{
    console.log(`Server is running on port http://localhost${port}`)
})

