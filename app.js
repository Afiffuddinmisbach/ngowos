
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: ''
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);
});

app.get('/show', (req, res) => {
  connection.query('SELECT Nama, Keterangan FROM testimoni', function (error, results, fields) {
    try {
      if (error) throw error;
      res.send({ status: 'true', data: results });
    } catch (error) {
      console.log(error);
      res.send({ status: 'false', message: 'Terjadi kesalahan' });
    }
  });
});

app.post('/insert', (req, res) => {
  let Nama = req.body.Nama
  let Keterangan = req.body.Keterangan

  connection.query('INSERT INTO testimoni (Nama, Keterangan) VALUES ("' + Nama+ '","' + Keterangan + '")', function (error, results, fields) {
    try {
      if (error) throw error;
      res.send({ status: 'true', message: 'Data berhasil ditambahkan' });
    } catch (error) {
      console.log(error);
      res.send({ status: 'false', message: 'Terjadi kesalahan' });
    }
  });
});

// The connection.end() should be called when the server is shutting down.
// For example, you can use the 'close' event to handle this.
app.on('close', () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ' + err.stack);
      return;
    }
    console.log('Database connection closed.');
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${ port }`);
});