const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());
// Port

const port = process.env.PORT || 4000;

const cart = {
    items:[
        { 
      pdtid : 1,
      name: "redmi",
      quantity: 2
    },
    {
      pdtid : 2,
      name: "apple",
      quantity:1
    },
    {
      pdtid : 3,
      name: "vivo",
      quantity:2
    },
    {
     pdtid : 4,
      name: "pocox2",
      quantity:1
    },
    {
     pdtid : 5,
      name: "realme",
      quantity:2
    }
]
}

// Middleware setup

const Middleware = (req, res, next) => {
    const x_api_key = req.headers['x-api-key'];
    const x_version = req.headers['x-version'];
    console.log('x-api-key');

    if(!x_api_key){
        return res.status(401).json({
            status: false,
            message: "Key is not found"
        })
    }

    if(!x_version){
        return res.status(401).json({
            status: false,
            message: "Version is not found"
        })
    }

    // Above key, versions are checking

    // Key
    if(x_api_key !== process.env.SECURITY_KEY){
        return res.status(401).json({
            status: false,
            message: "Key is Not matching"
        })
    }

    // Version

    if(x_version !== process.env.VERSION){
        return res.status(401).json({
            status: false,
            message: "Version is not Matching"
        })
    }

    next();
}


app.use(Middleware);


// Login API 

// app.post('/login', (req, res) => {
//     // Postman Req

//     const data = req.body;

//     console.log(data);
    

//     const {email} = req.body.email;
//     const {password} = req.body.password;

//     const default_email = process.env.DEFAULT_EMAIL;
//     const default_password = process.env.DEFAULT_PASSWORD;

//     if(email !== default_email){
//         res.status(400).json({
//             status: false,
//             message: "Email Is not Matching"
//         })
//     }

//     if(password !== default_password){
//         res.status(400).json({
//             status: false,
//             message: "Password is not Matching"
//         })
//     }

//     res.status(200).json({
//         status: true,
//         message: "Login Success",
//         response: req.body
//     })
// })


//get-all products API
app.get('/get-all',(req,res) =>{
    res.status(200).json({
        status: true,
        message:" Fetching all produts",
        data: cart
    })
})





app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log(req.body);

    const default_email = process.env.DEFAULT_EMAIL;
    const default_password = process.env.DEFAULT_PASSWORD;

    if (email !== default_email) {
        return res.status(400).json({
            status: false,
            message: "Email is not matching"
        });
    }

    if (password !== default_password) {
        return res.status(400).json({
            status: false,
            message: "Password is not matching"
        });
    }

    return res.status(200).json({
        status: true,
        message: "Login Success",
        response: req.body
    });
});


//rEGISTRATION API
app.post('/reg',(req,res)=>{
    res.status(200).json({
        status:true,
        message: "Registration successful!",
        data: req.body
    })
})


//cART API
app.post('/cart',(req,res) =>{
    res.status(200).json({
        status : true,
        message: "Product added to cart!",
        data : req.body,
        // info : cart
    })

})

// //update quantity
// app.put('/:id',(req,res) =>{
//     res.status(200).json({
//         status : true,
//         message :"Product quantity updated",
//         data: req.body
//     })
// })

//purchase API
app.put('/:id',(req,res) =>{
    const pdt =req.params.id;
    

    if(!pdt){
        res.status(404).json({
            status:false,
            message:"Product id required!"
        })
    }
    const item = cart.items.find((item)=> String(item.pdtid) === String(pdt));
    if(!item){
        return res.status(404).json({
            status: false,
            message:"Product not found in cart!"
        });
    }else{
        return res.status(200).json({
            status: true,
            message: "Confirm purchase?",
            info : req.body
        })
    }
})

// Server Setup
app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})