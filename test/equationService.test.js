const { expect } = require('chai');
const sinon = require('sinon');
const equationService = require('../services/equationService');
const equationModel = require('../dataAccess/equationDB');

describe('equationService', () => {

  // Test equation with parameter that have coefficient
  describe('evaluateEquationTwoParameters', () => {
    it('evaluateEquation method should return the correct result when 2 parameters are passed in the equation', () => {
 
    const requestBody = { equation: '2 + 3x + 1y', parameters: 'x,y', x: '2', y: '7' };
    const equation = requestBody.equation;
    const parameterString = requestBody.parameters;
    const parameters = parameterString.split(',').map((param) => param.trim());
  
    const parameterValues = {};
    for (const parameter of parameters){
      parameterValues[parameter] = parseFloat(requestBody[parameter]);
    }
      
    let processedEquation = equation;
    for (const parameter in parameterValues) {
      processedEquation = processedEquation.replace(new RegExp(parameter, 'g'), '*' + parameterValues[parameter]);
    }
      const result = equationService.evaluateEquation(processedEquation, parameters);

      //check result
      expect(result).to.equal(15);
    });
  });

  // Test equation with parameter that have no coefficient



  describe('evaluateEquationNoParameters', () => {
    it('evaluateEquation method should return the correct result when no parameters are passed in the equation', () => {
 
    const requestBody = { equation: '7 + 11', parameters: []};
    const equation = requestBody.equation;
    const parameters = requestBody.parameters;
    let processedEquation = equation;
      const result = equationService.evaluateEquation(processedEquation, parameters);

      //check result
      expect(result).to.equal(18);
    });
  });

  describe('evaluateEquationBracketsPrecedence', () => {
    it('evaluateEquation method should return the correct result by calculating the expression in brackets first', () => {
 
    const requestBody = { equation: '2 + 3 * (4 - 1)', parameters: []};
    const equation = requestBody.equation;
    const parameters = requestBody.parameters;
    let processedEquation = equation;
      const result = equationService.evaluateEquation(processedEquation, parameters);

      //check result
      expect(result).to.equal(11);
    });
  });

  // test for multiple parameters
  describe('evaluateEquationMultipleParameters', () => {
    it('evaluateEquation method should return the correct result when multiple parameters are passed in the equation', () => {
 
    const requestBody = { equation: '2a + 3b * (8c - 7d)', parameters: 'a,b,c,d', a: '3', b: '4',c: '7', d: '32' };
    const equation = requestBody.equation;
    const parameterString = requestBody.parameters;
    const parameters = parameterString.split(',').map((param) => param.trim());
  
    const parameterValues = {};
    for (const parameter of parameters){
      parameterValues[parameter] = parseFloat(requestBody[parameter]);
    }
      
    let processedEquation = equation;
    for (const parameter in parameterValues) {
      processedEquation = processedEquation.replace(new RegExp(parameter, 'g'), '*' + parameterValues[parameter]);
    }
      const result = equationService.evaluateEquation(processedEquation, parameters);

      //check result
      expect(result).to.equal(-2010);
    });
  });


  // Test invalid Equation
  describe('evaluateEquationInvalidEquation', () => {
    it('should throw the approropriate error message for an invalid equation', () => {
      const equation = 'Hellothere+2';
      const parameters = [];

      try {
        equationService.evaluateEquation(equation, parameters);
        // Test fails if no errors are thrown
        expect.fail('An error should have been thrown');
      } catch (error) {
        // Test fails if wrong error is thrown
        expect(error.message).to.equal('Invalid equation: Enter equation in the correct format, for example, 6 + (3x -2y)');
      }
    });
  });


   // Test equations with no opening or closing parathesis
  describe('evaluateEquationUnmatchedParentheses', () => {
    it('should throw the approropriate error message for an equation with missing opening or closing parentheses', () => {
      const equation = '2 + 3 * (4x - 1y';
      const parameters = [];

      try {
        equationService.evaluateEquation(equation, parameters);
        // Test fails if no error is thrown
        expect.fail('An error should have been thrown');
      } catch (error) {
        // Test fails if wrong error is thrown
        expect(error.message).to.equal('Invalid equation: Unmatched parentheses');
      }
    });
  });

  

});