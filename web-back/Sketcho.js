const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
import { db } from "./db";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



db.connect(err => {
  if (err) {
    console.error("Failed to connect to the database", err.stack);
  } else {
    console.log("Database connected successfully");
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Sketch API');
});

app.get('/api/sketch', (req, res) => { // Corrected path
  const query = 'SELECT * FROM sketch';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/sketch', (req, res) => {
  const { name, number } = req.body;
  const query = 'INSERT INTO sketch (name, number) VALUES (?, ?)';
  db.query(query, [name, number], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, number });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
