const express =require('express');
const dotenv =require('dotenv');
const app =express();
 
dotenv.config();
const port
 
app.use(express.json());
const school=[
    {
        id:1,
        name:'sndp hss'
    },
    {
        id:2,
        name:'nss'
    }
]
app.post('/:id',(req,res)=>{
    res.status(200).json({
        status:true,
        message:"successfuly",
       data:job 
    })
})
app.listen(port,()=>{
    console.log(`Server is running on port http://localhost${port}`)
})