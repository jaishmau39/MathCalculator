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

    const equation = req.body.equation;
    console.log(req.body);
    console.log(equation);
    const parameterString = req.body.parameters;

    // If equation contains parameters, split 
    const parameters = parameterString ? parameterString.split(',').map((param) => param.trim()):[];

    
    console.log(parameterString);
    console.log(parameters);
    console.log(req.body.z);
  
    // Assign parameter values to parameter character
    const parameterValues = {};
    for (const parameter of parameters) {
      parameterValues[parameter] = parseFloat(req.body[parameter]);
    }

    try {
    let processedEquation = equation;
    for (const parameter in parameterValues) {
      processedEquation = processedEquation.replace(new RegExp(parameter, 'g'), '*' + parameterValues[parameter]);
      console.log(processedEquation);
    }
      const result = equationService.evaluateEquation(processedEquation, parameters);

      equationService.saveEquation(equation, result, (err) => {
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
