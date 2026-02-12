import express, { response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


const app = express();

app.use(express.json());

dotenv.config();

const port = process.env.PORT || 5000;

// const secretKey =process.env.SECRET_KEY
// console.log('Secretkey:',secretKey);

// //create token
// const token = jwt.sign(
//     {userId : 111, role : 'admin'}, //payload
//     secretKey,                      //key
//     {expiresIn : '1hr'}             //options
// );
// console.log('Generated token:', token);


// //verify token
// try{
//     const decode = jwt.verify(token, secretKey);
//     console.log('Decoded data:',decode);
// }catch(err){
//     console.log('Inavlid token', err.message);
// }



//Login 2 access, refresh
app.post('/login2',(req,res) => {
    try{
    const userData = req.body;
    const accessToken = jwt.sign(userData, "access123", { expiresIn: "15s"});
    console.log('accessToken:',accessToken);

    res.status(201).json({ 
        response: userData,
        token: accessToken
    });
} catch(error){
    res.status(500).json({
        status: false,
        message: "Internal Server Error",
        response: error.message
    })
}
});

app.post("/refresh", (req,res)=>{
    jwt.verify(req.body.token, "refresh123", (err, user)=>{
        if (err) return res.sendStatus(403);
        res.json({ accessToken: jwt.sign ({ name: user.name},  "access123", {expiresIn:"15s"}) })
    });
});


app.listen(port,()=>{
    console.log(`Server is runnimg on port: http://localhost:${port} `)
})