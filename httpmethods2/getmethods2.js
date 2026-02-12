const express = require('express');
const app = express();
const port = 4000;

app.use(express.json())

const Books = [
    {
        id : 1,
        name : "AnimalFarm"
    },
    {
       id : 2,
        name : "Orbital"
    },
    {
        id : 3,
        name : "TheBellJar"
    },
    {
       id : 4,
        name : "HeartBerries"
    }
]

//get all method
app.get ('/get-all', (req,res) =>{
    res.status(200).json({
        ststus : "success",
        message : "Get all Books",
        Books

    })
})



//get by id
app.get ('/:id', (req,res) =>{
    const {id} = req.params
    const B = Books.find((B) => B.id === parseInt(id));
    if (B) {
        res.status(200).json({
        status  : "success",
        message :" Id found",
        data : B
        })
} else {
    res.status(404).json({
        status : "fail",
        message : "Id not found"
    })
}
})


//Post method
app.post ('/post', (req,res) =>{
    console.log(req.body)
    res.status(200).json({
        status : "true",
        data : req.body,
        message : "Successfully Posted",
        Books
    })
        
    }
)


//Put by id
app.put('/:id', (req,res) => {
    const {id} = req.params
    const updatingB = req.body
    const books = Books.find((books) => books.id === parseInt(id));

    if (books){
        books.name = updatingB.name;
        res.status(200).json({
            status : "success",
            message : "Successfully updated by Id",
            //  data: req.body,
             Books
        })
    } else{
        res.status(404).json({
            status:"fail",
            message : "Id not found"
        })
    }
})

//delete by id
app.delete('/:id', (req,res) => {
    const {id} = req.params;
    const books = Books.find((books) => books.id === parseInt(id));
    if(books ){
        const index = Books.indexOf(books);
        Books.splice(index, 1);
        res.status(200).json({
            status : "success",
            message : "Successfully deleted by Id",
            Books
        })
    } else{
        res.status(404).json({
            status : "fail",
            message : "Id not found"
        })
    }
})




app.listen(port,() =>{
    console.log(`Server httpmethods2 is running on port http://localhost:${port}`)
})