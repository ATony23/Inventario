const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const boxen = require('boxen');
const path = require('path');
//const clam = require('./src/middleware/clamscan.js')

//settings
const PORT = process.env.PORT || 3000;
var corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie'],
    allowedHeaders: '*'
};


//headers
app.use(cors());


//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//Routes
app.use(require('./src/api/app.js'));


// Starting the server
console.clear();
app.listen(PORT,
    //console.log(`Server running in ${process.env.NODE_ENV} mode on localhost port ${PORT}`)
    console.log(boxen(`Server running on localhost port ${PORT}`, {
        padding: 1,
        borderColor: 'green',
        margin: 1
    }))
);