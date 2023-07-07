const express = require('express');
const router = express.Router();

function calculatorController(equationService) {

    router.get('/', (req, res) => {
      equationService.getAllEquations((err, equations) => {
        if (err) {
        } else {
          res.render('calculator', { equations });
        }
      });
    });

    
  router.post('/', (req, res) => {

    const requestBody = req.body;
    const equation = requestBody.equation;
    const parameterString = requestBody.parameters;

    console.log(requestBody);

    // Call processEquation function from the equationService
    const processEquationParams = equationService.processEquation(requestBody);

      try {
      const result = equationService.evaluateEquation(processEquationParams.processedEquation, processEquationParams.parameters);
 
      const saveEquation = equation+" where ("+parameterString+") = ("+processEquationParams.stringParameterValue+")";
      equationService.saveEquation(saveEquation, result, (err) => {
        if (err) {
          console.error('Could not save the equation');
          res.render('calculator', { error: 'An error occurred while saving the equation' });

        } else {
          res.redirect('/');
        }
      });
    } catch (error) {
      console.error('Could not evaluate the equation', error.message);
      const errorMessage = `Could not evaluate the equation: ${error.message}`;
      
    // Get all the equations 
    equationService.getAllEquations((err, equations) => {
      if (err) {
      } else {
        // Handle error when equation cannot be evaluated
        res.render('calculator', { error: errorMessage, equations });
      }

      return errorMessage;
    });
    }
  });
 
  router.post('/remove', (req, res) => {
    const equationId = req.body.equationId;

    equationService.removeEquation(equationId, (err) => {
      if (err) {
      } else {
        res.redirect('/');
      }
    });
  });

  return router;
}

module.exports = calculatorController;
