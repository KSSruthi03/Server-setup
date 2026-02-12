import express from 'express';
import dotenv from 'dotenv';

const app = express();


dotenv.config();



const port = process.env.PORT || 4000;


app.use(express.json());

const  details = { 
   items : [ {
        id    :  1,
        name  :  "joseph",
        payment: "credit card"
    },{
        id    :  2,
        name  :  "harry",
        payment: "debit card"
    },
    {
        id    :  3,
        name  :  "ron",
        payment: "upi"
    },{
        id    :  4,
        name  :  "hermione",
        payment: "net banking"
    },
    {
        id    :  5, 
        name  :  "luna",
        payment: "paypal"
    }
]

}

//Middleware setup
const Middleware = (req, res, next) => {
    const y_api_key = req.headers['y-api-key'];
    const y_version = req.headers['y-version'];
    console.log('y_api_key')
    console.log('y_version')

    if(!y_api_key){
        res.status(404).json({
            status: false,
            message:"key is not found!"
        })
    }

    if(!y_version){
        res.status(404).json({
            status:false,
            message:"version is not found!"
        })
    }

    //if key is there, go check the key is matching
    if(y_api_key !== process.env.SECRETKEY){
        res.status(404).json({
            status:false,
            message:"key is not matching!"
        })
    }
    //check version
    if(y_version  !== process.env.Y_VERSION){
        res.status(404).json({
            status:false,
            message:"version is not matching!"
        })
    }
    next();
    }

    app.use(Middleware);

    //login
    app.post('/login',(req,res)=>{
        const { email} = req.body;
        const { password} = req.body;
        const default_email= process.env.DEFAULT_EMAIL;
        const default_password=process.env.DEFAULT_PASSWORD;

        if( email !== default_email){
            res.status(404).json({
                status:false,
                message:"email is not matching!"
            })
        }

        if(password !== default_password){
            res.status(404).json({
                status:false,
                message:"password is not matching!"
            })
        }

        return res.status(200).json({
            status:true,
            message:"Login successfull!",
            response:req.body
        });

    });

    //get all details
    app.get('/get-all', (req,res)=>{
        res.status(200).json({
            status:true,
            message:"fetching all details..",
            data: details
        })
    })

// app.get('/not-secure', (req,res) =>{
//     res.status(200).json({
//         status : true,
//         message: 'Not Secure'
//     })
// })


//registration using post
app.post('/reg',(req,res) =>{
    res.status(200).json({
        status:true,
        message:"Registartion successfull!",
        deta : req.body
    })
})

//new details adding using post
app.post('/new',(req,res) =>{
    res.status(200).json({
        status:true,
        message:"New details updated",
        data:req.body
    })
})

//updating name using put
app.put('/:id',(req,res) =>{
    res.status(200).json({
        status:true,
        message:"Succesfully Updated1",
        data:req.body
    })
})

//deleting using id
app.delete('/:id',(req,res) =>{
const {id} =req.params;
const deleteitem = details.items.find((deleteitem) => deleteitem.id === parseInt(id));
if (deleteitem){
    const index = details.items.indexOf(deleteitem);
    details.items.splice(index,1);
    res.status(200).json({
        status:true,
        message:"id deleted successfully!",
        info:deleteitem
    })
}
else{
    res.status(404).json({
        status:false,
        message:"id not found!"
    })
}

})

app.listen(port,() =>{
    console.log(`server is running on port http://localhost:${port}`)
})

export default app;