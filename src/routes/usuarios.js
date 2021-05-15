const express = require('express');
const app = express.Router();
const mysqlConnection = require('../db/database');
const path = require('path');
const bcrypt = require('bcrypt');

var badPassword = ["123456", "123456789", "picture1", "password", "12345678",
"111111", "123123", "12345", "1234567890", "senha"];

const hashPassword = async(password) => {

    const saltRounds = 4;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) reject(err);

            resolve(hash);
        });
    })

    return hashedPassword;
}


//If it works
app.get('/', async(req, res) => {
    res.status(200).json({"success": true, "message": "todo ok"});
});



//Get all users from users table
app.post('/getUser', async(req, res) => { 

    const query = `SELECT * FROM user`;

    mysqlConnection.query(query, (err, rows, fields) => {
    if(!err) {
        res.status(200).send(rows);
    }  else {
        res.status(500).send('Something gone wrong');
    }
  });
});





// Get an user from users table by id
app.get('/getUser/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM user WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.status(200).send(rows);
    } else {
      res.status(500).send('Something gone wrong');
    }
  });
});





//Add user to the database
app.post('/register', async(req, res) => {
  let hashedPassword = await hashPassword(req.body.password);
    var data = {
        name: req.body.name,
        username: req.body.username,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
    }

    var sql = 'INSERT INTO user SET ?'

    mysqlConnection.query(sql, data, (err, rows) => {

      if(!err) {

          res.status(200).send('All good');
      }  else {

          res.status(500).send('Something gone wrong');
          console.log(err);
       }

    }); 
});



app.post('/login', async (req, res) => {
    var data = {
        username: req.body.username,
        password: req.body.password
    }

    var sql = `SELECT IF(username = ? AND password = ?,false,true) as value
               FROM user
               group by value;`;

    mysqlConnection.query(sql, data, async (err, rows) => {

            if (true) {

                  res.status(200).send('Session started');  
                

            } else {

                res.status(500).send('Invalid user or password');
            }
    });
});






//edit an user by id
app.post('/editUser/:id', async(req, res) => {
    var data = {
        name: req.body.name,
        username: req.body.username,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password
    }

    var { id } = req.params;   

    var sql = `UPDATE user
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





//delete an user by id
app.delete('/deleteUser/:id', async(req, res) => {
    var { id } = req.params;   

    var sql = `DELETE FROM user
               WHERE id = ?`

        mysqlConnection.query(sql, id, (err, rows) => {

        if(!err) {

        res.status(200).send("User deleted successfully");
        }  else {

        res.status(500).send('Something gone wrong');
        }
    });
});




module.exports = app;