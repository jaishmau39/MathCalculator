const { expect } = require('chai');
const sinon = require('sinon');
const equationService = require('../services/equationService');
const equationModel = require('../dataAccess/equationDB');

describe('equationService', () => {
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

  // test to check if right exception is being thrown when invalid equation is given

  // no closing parathesis


});