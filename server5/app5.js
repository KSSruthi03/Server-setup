const express = require ('express');
const app     = express();
const port = 3000;

app.use(express.json());

const Employee = [
    {
        id   : 1,
        name : "Alex",
        area : "Texes"
    },
    {
        id   : 2,
        name : "Rose",
        area : "California"
    },{
        id   : 3,
        name : "Gomez",
        area : "New York"
    },{
        id   : 4,
        name : "Henry",
        area : "Ohio"
    },{
        id   : 5,
        name : "Mark",
        area : "Lousiana"
    },{
        id   : 6,
        name : "Frances",
        area : "Alabama"
    },{
        id   : 7,
        name : "Raffe",
        area : "Georgia"
    },
    {
        id   : 8,
        name : "Julee",
        area : "Florida"
    },{
        id   : 9,
        name : "Ardiith",
        area : "Navada"
    },
    {
        id   : 10,
        name : "Jude",
        area : "Lubbok"
    },
]

//// ********************GET METHOD******************************
app.get('/', (req,res) =>{
    console.log("Hello Sruthi 🙋‍♀️")
})

//get all method(1)
app.get('/get-all', (req,res) =>{
    res.status(200).json({
        status :  true,
        message:  "Fetching successful!",
        Data   :  Employee
    })
})

// app.get('/:id', (req,res) =>{
//        const {id} = req.params;
//        const employee = Employee.find((employee) => employee.id === parseInt(id));
//        if (employee) {
//         res.status(200).json({
//             status : true,
//             message : "Id found"
//     })
//        }else{
//         res.status(200).json({
//         status : true,
//             message : "Id not found "
//         })
//        }
// })

//get all method(2)
app.get('/:id', (req,res) =>{
   const {id} = req.params;
   const employee = Employee.find((employee) =>  employee.id === parseInt(id));
   if (employee){
    res.status(200).json({
        status : true,
        message : "Id Found😁",
        data : Employee 
    })
   }else{
    res.status(404).json({
        status : false,
        message : " Id Not Found😒"
    })
   }
})




// ********************POST METHOD******************************

// app.post ('/newid', (req,res) =>{
//     const newId = req.body;
//     Employee.push(newId);
//     res.status(200).json({
//         status : true,
//         message : "Sucessfully Updated New Id ",
//         data    : req.body
//     })

// })

app.post ('/new', (req,res) =>{
    const updated = req.body;
    Employee.push(updated)
    res.status(200).json({
        status : true,
        message : "Updation successful!",
        data : Employee
    })
})



// ********************PUT METHOD******************************
// app.put ('/:id', (req,res) =>{
//     const {id}     = req.params;
//     const updation = req.body;
//     const employee = Employee.find((employee) => employee.id === parseInt(id));
//     if (employee){
//         employee.name = updation.name;
//         employee.area = updation.area;
//         res.status(200).json({
//             status : true,
//             message : "Updation Sucessfull😁",
//             data : Employee
//         })
//     }else {
//         res.status(404).json({
//             status : false,
//             message : "Id Not Found😒"
//         })
//     }
// })


app.put('/:id', (req,res) =>{
    const {id}      = req.params;
    const updatedid = req.body;
    const employee = Employee.find((employee) => employee.id === parseInt(id));
    if (employee){
        res.status(200).json({
            status : true,
            message : "Successfully Updated!",
            data : Employee
        })
    }else {
        res.status(404).json({
            status: false,
            message : "failed updation"
        })
    }
})

   
app.listen(port, () =>{
    console.log(`Server is running on port http://localhost:${port}`)
})