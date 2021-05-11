const mysql = require('mysql');
const boxen = require('boxen');

  const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Genetica12018',
    database: 'inventario',
    multipleStatements: true
  });


mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;

  } else {
    console.log(boxen('DB is Connected', {
      padding: 1,
      borderColor: 'blue',
      margin: 1
    }))
  }
});


module.exports = mysqlConnection;