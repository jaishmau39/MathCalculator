# Math Calculator

The Math Calculator is a Node.js based web application that allows users to evaluate mathematical equations through a web interface. Users can enter an equation and specify parameter values to calculate the results.

## Features

- Input and evaluate mathematical equations
- Specify parameters for equation evaluation
- Display a history of saved equations and their results
- Remove previously evaluated equations

## Prerequisites

Before running the application, make sure the following is installed:

- Node.js
- MySQL

## Dependencies

The following dependencies are required to run the Math Calculator:

- [ejs](https://www.npmjs.com/package/ejs): Templating engine for rendering dynamic HTML templates.
- [mysql](https://www.npmjs.com/package/mysql): MySQL database driver for Node.js.
- [express](https://www.npmjs.com/package/express): Web framework for building the server-side application.

## Setup

Follow these steps to set up and run the application locally:

1. Clone the repository:

> git clone https://github.com/jaishmau39/MathCalculator.git

2. Navigate to the project directory:

> cd MathCalculator

3. Install the dependencies:
> npm install

4. Create MySQL database:

- Execute the database script provided in `calculator_db.sql` to create the required tables and schema.

- Open the `dataAccess/equationDB.js` file and update the user and password fields with your database credentials:

  ```javascript
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your-username',
    password: 'your-password',
    database: 'calculator_db',
  });
  ```

5. Start the application:

> npm start

6. Open your web browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Unit Tests

To execute the unit tests, follow these steps:

1. Install the testing dependencies:

> npm install --save-dev mocha chai

2. Install the Mocha test runner globally by running the command:

> npm install -g mocha

3. Run the unit tests:

> mocha test

## Contributing

If you encounter any problems or have ideas for new features, submit an issue or create a pull request on the corresponding GitHub repository.

