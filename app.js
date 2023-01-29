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

//CRIAR EGRESSO PARA ACESSO AO SISTEMA SIEG

app.post('/createEgresso', (req, res) => {
  const data = req.body;
  const sql = `INSERT INTO Pessoa (nome, cpf, email) VALUES ('${data.nome}', '${data.cpf}', '${data.email}')`;
  connection.query(sql, (err, result) => {

    const sql2 = `INSERT INTO Egresso (id_pessoa, data_nascimento, entrada_ufu, saida_ufu, tempo_curso, tempo_formado, bolsas, estagios_area, trabalha_area_atualmente, quantos_empregos_area, experiencia_profissional, last_update) VALUES ('${result.insertId}', '${data.data_nascimento}', '${data.entrada_ufu}', '${data.saida_ufu}', '${data.tempo_curso}', '${data.tempo_formado}', '${data.bolsas}', '${data.estagios_area}', '${data.trabalha_area_atualmente}', '${data.quantos_empregos_area}', '${data.experiencia_profissional}', '${data.last_update}')`;
    connection.query(sql2, (err, result) => {
      if (err) throw err;
      res.json({ result: true });
    });
  });
});

//BUSCAR TODOS OS EGRESSOS CADASTRADOS NO SISTEMA

app.get('/getAllEgressos', (req, res) => {
  const data = req.body;
  const sql = `select * from Egresso eg inner join Pessoa p on p.id_pessoa = eg.id_pessoa LIMIT 10 OFFSET ${data.offset} `;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ result });
  });
});

//UPDATE EGRESSO

app.put('/update', (req, res) => {
  const data = req.body;
  const sql = `UPDATE Egresso eg INNER JOIN Pessoa pe ON pe.id_pessoa = eg.id_pessoa SET trabalha_area_atualmente = '${data.trabalha_area_atualmente}', quantos_empregos_area = '${data.quantos_empregos_area}', experiencia_profissional = '${data.experiencia_profissional}', last_update = '${data.last_update}', bolsas = '${data.bolsas}' WHERE pe.cpf = '${data.cpf}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.json({ message: 'Data updated successfully' });
  });
});

app.listen(8080, () => {
  console.log('Server started on port 8080');
});