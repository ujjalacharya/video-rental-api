const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const genres = [
    { id: 1, name: 'Action' },  
    { id: 2, name: 'Horror' },  
    { id: 3, name: 'Romance' },  
  ];

 //RESTFUL routes
 
//GET all routes
app.get('/', (req, res)=>{
    res.json(genres)
})

app.listen(PORT, ()=>{
    console.log(`App started at ${PORT}`)
})