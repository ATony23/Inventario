const express = require('express');
const app = express.Router();
const mysqlConnection = require('../db/database');
const path = require('path');



//If it works
app.get('/', async(req, res) => {
    console.log('Hola');
    res.status(200).json({"success": true, "message": "todo ok"});
});

//Ruta prueba
app.get('/prueba', async(req, res) => {

    res.status(200).json({"success": true, "message": "todo ok"});
});




//This show * object table
app.post('/showObject', async(req, res) => { 

    const query = `SELECT * FROM object`;

    mysqlConnection.query(query, (err, rows, fields) => {
    if(!err) {
        res.status(200).send(rows);
    }  else {
        res.status(500).send('Something gone wrong');
    }
  });
});



//Creación de usuario con contraseña encriptada
app.post('/userRegister', async(req, res) => {
    
    let hashedPassword = await hashPassword(req.body.password);
    var data = {
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        phone: req.body.phone,
        email: req.body.email,
        id_gender: req.body.id_gender,
        id_user_type: req.body.id_user_type,
        id_superior: req.body.id_superior,
        creation_date: dateFunction()
    }   

    for (var i = 0; i < badPassword.length; i++) {

        if (req.body.password != badPassword[i]) {

            var sql = 'INSERT INTO users SET ?'

             mysqlConnection.query(sql, data, (err, rows) => {
                if (!err) {
                    const data = {
                    status: 'success',
                    message: 'usuario registrado'
                    }
                    res.status(200).json({"success": true, "message": "todo ok", "data": data});
                } else {
                    console.log(err);
                }
            });
        } else {
            res.status(500).send('Error, contraseña demasiado débil');
        }

    } 
});


module.exports = app;