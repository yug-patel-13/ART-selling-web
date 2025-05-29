const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'artweb'
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
  <style>.data-container {
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
    <h1>LOGIN Data</h1>
    <table class="data-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody id="data-body">
        <!-- Data will be inserted here by JavaScript -->
      </tbody>
    </table>
  </div>

  <script>
    document.addEventListener('DOMContentLoaded', async () => {
      const response = await fetch('/api/artdata');
      const data = await response.json();
    
      const dataBody = document.getElementById('data-body');
      data.forEach(item => {
        const row = document.createElement('tr');
    
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);
    
        const emailCell = document.createElement('td');
        emailCell.textContent = item.email;
        row.appendChild(emailCell);
    
        const passwordCell = document.createElement('td');
        passwordCell.textContent = item.password;
        row.appendChild(passwordCell);
    
        dataBody.appendChild(row);
      });
    });
  </script>
</body>
</html>
`);
});

app.get('/api/artdata', (req, res) => {
  const query = 'SELECT * FROM artdata';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.post('/api/artdata', (req, res) => {
  const { name, email, password } = req.body;
  const query = 'INSERT INTO artdata (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: result.insertId, name, email, password });
  });
});
app.post('/api/artdata2', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM artdata WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Error querying data:', err);
      return res.status(500).json({ error: 'Error checking credentials' });
    }

    if (results.length > 0) {
      // User exists
      res.json({ success: true, message: 'Signed in successfully' });
    } else {
      // User does not exist
      res.json({ success: false, message: 'Invalid email or password' });
    }
  });
});
app.put('/api/artdata/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  const query = 'UPDATE artdata SET name = ?, email = ?, password = ? WHERE id = ?';
  db.query(query, [name, email, password, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(result);
  });
});

app.delete('/api/artdata/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM artdata WHERE id = ?';
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
