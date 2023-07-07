const express = require('express');
const app = express();
const calculatorController = require('./controllers/calculatorController');
const equationService = require('./services/equationService');

// Set up middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Set up routes
app.use('/', calculatorController(equationService));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});