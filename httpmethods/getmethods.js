const express = require ('express')
const app = express();
const port = 3000;

app.use(express.json())

const language = [
    {
        id : 1,
        name : "chines"
    },
    {
         id : 2,
        name : "urudhu"
    },
    {
        id : 3,
        name : "Bolivia"
    },
    {
        id : 4,
        name :  "Guaraní" 
    }
    ,
    {
        id : 5,
        name :  "Spanish" 
    }
    ,
    {
        id : 6,
        name :  "English" 
    }
]


//get all users fetching data
app.get('/getall', (req,res)=>{
    res.status(200).json({
        status : true,
        maessage : "Get all users",
        language

    })
})

//get language by id
app.get('/:id', (req,res) => {
const {id} = req.params
const lang = language.find((lang) => lang.id === parseInt(id));
if (lang) {
    res.status(200).json({
        status : "success",
        message : "Get Language By Id",
        data : lang
    });
    }else{
        res.status(404).json({
            status : "fail",
        message : " Language  Id Not Found"
        })
    }
})


//post method
app.post('/add', (req,res) => {
    console.log(req.body)
    res.status(201).json({
        status : true,
        data: req.body,
        message : "User Created"
    })

})

//put method by id
app.put('/:id', (req,res) => {
    const {id} = req.params
    const updataedlang = req.body
    const lang = language.find((lang) => lang.id === parseInt(id));
    if (lang) {
        lang.name = updataedlang.name;
        res.status(200).json({
            status : "success",
            message : "Language updated succesfully!"
        })
    } else{
        res.status(404).json({
            status : "fail",
            message : "Id not found "
        })
    }
})

//Delete method
app.delete('/:id', (req,res) => {
    const {id} = req.params;
    const lang = language.find((lang) => lang.id === parseInt(id));
    if (lang) {
        const index = language.indexOf(lang);
        language.splice(index,1);
        res.status(200).json({
            status : "success",
            message : "Id deleted sucessfully"
    })
    } else {
        res.status(404).json({
            status   : "fail",
            message : " Id not found"
        })
    }
})






app.listen(port, ()=>
{
    console.log(`server is running http://localhost:${port}`)
})