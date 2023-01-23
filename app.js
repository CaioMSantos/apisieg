const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'db4free.net',
  user: 'caioms321',
  password: 'caioms123',
  database: 'banco_pdsi'
});

connection.connect();

app.get("/", async (req, res) => {
  res.send("API - SIEG");
});

app.post('/save', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO students (name, dob, degree, course) VALUES ('${data.name}', '${data.dob}', '${data.degree}', '${data.course}')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data saved successfully' });
  });
});

app.put('/update', (req, res) => {
  const data = req.body;
  const sql = `UPDATE students SET name = '${data.name}', dob = '${data.dob}', degree = '${data.degree}', course = '${data.course}' WHERE id = ${data.id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data updated successfully' });
  });
});

app.delete('/delete/:id', (req, res) => {
  const sql = `DELETE FROM students WHERE id = ${req.params.id}`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data deleted successfully' });
  });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});