const express = require('express'), //module express
    dotenv = require('dotenv'), //moduledotenv
    cookieParser = require('cookie-parser') //module cookie-parser

const app = express() // initialize express
app.set('view engine', 'ejs') //set engine ejs templates.
app.use(express.urlencoded({ //set up for proccesing data seend  from forms.
    extended: true
}))
app.use(express.json())
app.use(express.static('public')) //set static folder.
dotenv.config({ path: "./env/.env" }); //enviroment vars

app.use('/', require("./routes/router")) //call route
app.listen(3000, () => console.log('server run')); //server