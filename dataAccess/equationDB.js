const mysql = require('mysql');

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'database_name',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Save equation to database
function saveEquation(equation, result, callback) {
  const query = 'INSERT INTO equations (equation, result) VALUES (?, ?)';
  connection.query(query, [equation, result], (err) => {
    if (err) {
      console.error('Error saving equation to the database');
      callback(err);
    } else {
      callback(null);
    }
  });
}

// Remove equation from database
function removeEquation(equationId, callback) {
  const query = 'DELETE FROM equations WHERE id = ?';
  connection.query(query, [equationId], (err) => {
    if (err) {
      console.error('Error removing equation from the database:', err);
      callback(err);
    } else {
      callback(null);
    }
  });
}

// Get all equations from database
function getAllEquations(callback) {
  const query = 'SELECT * FROM equations';
  connection.query(query, (err, equations) => {
    if (err) {
      console.error('Error retrieving equations from the database:', err);
      callback(err, null);
    } else {
      callback(null, equations);
      console.log("equations"+equations);
    }
  });
}

module.exports = {
  saveEquation,
  removeEquation,
  getAllEquations,
};