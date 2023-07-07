const { expect } = require('chai');
const equationService = require('../services/equationService');

describe('equationService', () => {

  // Test equation with no parameter(s) 
  describe('evaluateEquationNoParameters', () => {
    it('evaluateEquation method should return the correct result when no parameters are passed in the equation', () => {
 
    const requestBody = { equation: '7 + 11', parameters: ''};
    const processedEquationParams = equationService.processEquation(requestBody);
      const result = equationService.evaluateEquation(processedEquationParams.processedEquation, processedEquationParams.parameters);

      //check result
      expect(result).to.equal(18);
    });
  });

  // Test equation with parameter(s) that have coefficient(s)
  describe('evaluateEquationTwoParameters', () => {
    it('evaluateEquation method should return the correct result when 2 parameters with coefficients are passed in the equation', () => {
 
      const requestBody = { equation: '2 + 3x + 1y', parameters: 'x,y', x: '2', y: '7' };
      const processedEquationParams = equationService.processEquation(requestBody);
      const result = equationService.evaluateEquation(processedEquationParams.processedEquation, processedEquationParams.parameters);

      //check result
      expect(result).to.equal(15);
    });
  });

  // Test equation with parameter that have no coefficient
  describe('evaluateEquationNoParameterCoefficient', () => {
    it('evaluateEquation method should return the correct result when parameter(s) with no coefficient are passed in the equation', () => {
 
    const requestBody = { equation: '2 + x + y', parameters: 'x,y', x: '3', y: '7' };
    const processedEquationParams = equationService.processEquation(requestBody);
    const result = equationService.evaluateEquation(processedEquationParams.processedEquation, processedEquationParams.parameters);

      //check result
      expect(result).to.equal(12);
    });
  });


  describe('evaluateEquationBracketsPrecedence', () => {
    it('evaluateEquation method should return the correct result by calculating the expression in brackets first', () => {
 
      const requestBody = { equation: '2 + 3 * (4 - 1)', parameters: ''};
      const processedEquationParams = equationService.processEquation(requestBody);
      const result = equationService.evaluateEquation(processedEquationParams.processedEquation, processedEquationParams.parameters);

      //check result
      expect(result).to.equal(11);
    });
  });

  // test for multiple parameters
  describe('evaluateEquationMultipleParameters', () => {
    it('evaluateEquation method should return the correct result when multiple parameters are passed in the equation', () => {
 
    const requestBody = { equation: '2a + 3b * (8c - 7d)', parameters: 'a,b,c,d', a: '3', b: '4',c: '7', d: '32' }
    const processedEquationParams = equationService.processEquation(requestBody);
    const result = equationService.evaluateEquation(processedEquationParams.processedEquation, processedEquationParams.parameters);

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