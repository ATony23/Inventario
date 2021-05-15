const express = require('express');
const app = express.Router();
const mysqlConnection = require('../db/database');
const path = require('path');



//If it works
app.get('/', async(req, res) => {
    res.status(200).json({"success": true, "message": "todo ok"});
});



//Get all objects from object table
app.post('/getObject', async(req, res) => { 

    const query = `SELECT * FROM object`;

    mysqlConnection.query(query, (err, rows, fields) => {
    if(!err) {
        res.status(200).send(rows);
    }  else {
        res.status(500).send('Something gone wrong');
    }
  });
});





// Get an object from object table by id
app.get('/getObject/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM object WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(500).send('Something gone wrong');
    }
  });
});





//Add object to the database
app.post('/addObject', async(req, res) => {
    var data = {
        name: req.body.name,
        product_feature: req.body.product_feature,
        stock: req.body.stock,
        idBrand: req.body.idBrand,
        idCategory: req.body.idCategory,
        idZone: req.body.idZone
    }   

    var sql = 'INSERT INTO object SET ?'

        mysqlConnection.query(sql, data, (err, rows) => {

        if(!err) {

        res.status(200).send(rows);
        }  else {

        res.status(500).send('Something gone wrong');
        }
    });
});





//Add or quit one more object to object table by location
app.post('/addObject/:idZone/:id/:a', async(req, res) => {
    const { idZone, id, a } = req.params; 


    if (req.params.a === ('+' || '-')) {

            if (req.params.a == '+') {

                var sql = `UPDATE object
                       SET stock = (stock + 1)
                       WHERE idZone = ? && id = ?;`

                mysqlConnection.query(sql, [idZone, id, a], (err, rows) => {

               if(!err) {

               res.status(200).send(rows);
                }  else {

               res.status(500).send('Something gone wrong');
                }
            });

         } else {
                var sql = `UPDATE object
                       SET stock = (stock - 1)
                       WHERE idZone = ? && id = ?;`

                mysqlConnection.query(sql, [iZona, id, a], (err, rows) => {

               if(!err) {

               res.status(200).send(rows);
                }  else {

               res.status(500).send('Something gone wrong');
                }
            });
        }
    } else {
        res.status(500).send('You must insert only + or - characters');
    }

});




//edit an object by id
app.post('/editObject/:id', async(req, res) => {
    var data = {
        name: req.body.name,
        product_feature: req.body.product_feature,
        stock: req.body.stock,
        idBrand: req.body.idBrand,
        idCategory: req.body.idCategory,
        idZone: req.body.idZone
    }

    var { id } = req.params;   

    var sql = `UPDATE object
               SET ?
               WHERE id = ?`

        mysqlConnection.query(sql, [data, id], (err, rows) => {

        if(!err) {

        res.status(200).send("All good");
        }  else {

        res.status(500).send('Something gone wrong');
        }
    });
});





//delete an object by id
app.delete('/deleteObject/:id', async(req, res) => {
    var { id } = req.params;   

    var sql = `DELETE FROM object
               WHERE id = ?`

        mysqlConnection.query(sql, id, (err, rows) => {

        if(!err) {

        res.status(200).send("Object deleted successfully");
        }  else {

        res.status(500).send('Something gone wrong');
        }
    });
});




module.exports = app;