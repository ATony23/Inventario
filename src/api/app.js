const express = require('express');
const mysqlConnection = require('../db/database');
const app = express.Router();
const Routesconsultas = require('../routes/consultas.js');
const Routesusuarios = require('../routes/usuarios.js');

app.use('/consultas', Routesconsultas);
app.use('/usuarios', Routesusuarios);


module.exports = app;