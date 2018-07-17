const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

//require the routes
const genres = require('./controller/routes/genres')

app.use(express.json());

//use genre route
app.use('/api/genres', genres);

app.listen(PORT, () => {
    console.log(`App started at ${PORT}`)
})

