const express = require('express');
const mysqlConnection = require('../db/database');
const app = express.Router();
const Routesconsultas = require('../routes/consultas.js');


app.use('/consultas', Routesconsultas);


module.exports = app;