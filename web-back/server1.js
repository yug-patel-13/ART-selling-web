const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buying'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Saved Data</title>
  <style>
    .data-container {
      width: 80%;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
    .data-table th, .data-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .data-table th {
      background-color: #f2f2f2;
      color: black;
    }
    .data-table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .data-table tr:hover {
      background-color: #ddd;
    }
  </style>
</head>
<body>
  <div class="data-container">
    <h1>Orderdata</h1>
    <table class="data-table">
      <thead>
        <tr>
          <th>ARTworks</th>
          <th>Address</th>
          <th>Name</th>
          <th>Number</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody id="data-body">
        <!-- Data will be inserted here by JavaScript -->
      </tbody>
    </table>
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const response = await fetch('/api/buying');
      const data = await response.json();
      const dataBody = document.getElementById('data-body');
      data.forEach(item => {
        const row = document.createElement('tr');
       const artworkCell = document.createElement('td');
          artworkCell.textContent = item.artwork;
          row.appendChild(artworkCell);
          dataBody.appendChild(row);
        const addressCell = document.createElement('td');
        addressCell.textContent = item.address;
        row.appendChild(addressCell);
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
        const numberCell = document.createElement('td');
        numberCell.textContent = item.number;
        row.appendChild(numberCell);
        const paymentCell = document.createElement('td');
        paymentCell.textContent = item.paymentmethod;
        row.appendChild(paymentCell);
        dataBody.appendChild(row);
      });
    });
  </script>
</body>
</html>
`);
});

app.get('/api/buying', (req, res) => {
  const query = 'SELECT * FROM buying';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/buying', (req, res) => {
    const { address, name, number, paymentmethod, artwork } = req.body;
    const query = 'INSERT INTO buying (address, name, number, paymentmethod, artwork) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [address, name, number, paymentmethod, artwork], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({ id: result.insertId, address, name, number, paymentmethod, artwork });
    });
  });

app.put('/api/buying/:id', (req, res) => {
  const { id } = req.params;
  const { address, name, number, paymentmethod } = req.body;
  const query = 'UPDATE buying SET address = ?, name = ?, number = ?, paymentmethod = ? WHERE id = ?';
  db.query(query, [address, name, number, paymentmethod, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

app.delete('/api/buying/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM buying WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
