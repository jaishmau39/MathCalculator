const equationModel = require('../dataAccess/equationDB');


function processEquation(requestBody) {
  const equation = requestBody.equation;
  const parameterString = requestBody.parameters;
  const parameters = parameterString ? parameterString.split(',').map((param) => param.trim()) : [];

  const parameterValues = {};
  for (const parameter of parameters) {
    parameterValues[parameter] = parseFloat(requestBody[parameter]);
  }

  let processedEquation = equation;
  let stringParameterValue = '';
  let count = 0;

  for (const parameter in parameterValues) {
    count++;
    if (count > 1) {
      stringParameterValue += ',';
    }

    const coefficientRegex = new RegExp(`\\b(\\d+)\\s*${parameter}\\b`);
    const match = equation.match(coefficientRegex);

    // Check coefficients for parameter(s)
    if (match !== null) {
      // If coeffient exists for parameter(s), substitite parameter value and prefix with '*' to permorm multiply with coefficient value
      processedEquation = processedEquation.replace(new RegExp(parameter, 'g'), '*' + parameterValues[parameter]);
    } else {
      // Substitute parameter value
      processedEquation = processedEquation.replace(new RegExp(parameter, 'g'), parameterValues[parameter]);
    }

    stringParameterValue += parameterValues[parameter];
  }

  return {
    processedEquation: processedEquation,
    parameters: parameters,
    stringParameterValue: stringParameterValue
  };
}


// Evaluate equation
function evaluateEquation(equation, parameterValueMap) {
    const tokens = tokenizeEquation(equation);
    const postfix = infixToPostfix(tokens);
    const result = evaluatePostfix(postfix, parameterValueMap);
  
    return result;
  }
  
  function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
  }
  
  function isParenthesis(char) {
    return ['(', ')'].includes(char);
  }
  
  function isWhitespace(char) {
    return char === ' ';
  }
  
  function infixToPostfix(tokens) {
    const postfix = [];
    const stack = [];
  
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2,
    };
  
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
  
      if (isOperator(token)) {
        while (
          stack.length > 0 &&
          isOperator(stack[stack.length - 1]) &&
          precedence[stack[stack.length - 1]] >= precedence[token]
        ) {
          postfix.push(stack.pop());
        }
        stack.push(token);
      } else if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
          postfix.push(stack.pop());
        }
        if (stack.length === 0) {
          throw new Error('Invalid equation: Unmatched parentheses');
        }
        stack.pop(); 
      } else {
        postfix.push(token);
      }
    }
  
    while (stack.length > 0) {
      if (stack[stack.length - 1] === '(') {
        throw new Error('Invalid equation: Unmatched parentheses');
      }
      postfix.push(stack.pop());
    }
  
    //console.log("stack:"+stack.value);
    return postfix;
  }
  

  function evaluatePostfix(postfix, parameters) {
    const stack = [];
  
    for (let i = 0; i < postfix.length; i++) {
      const token = postfix[i];
  
      if (isOperator(token)) {
        const rightOperand = parseFloat(stack.pop());
        const leftOperand = parseFloat(stack.pop());
  
        let result;
  
        switch (token) {
          case '+':
            result = leftOperand + rightOperand;
            break;
          case '-':
            result = leftOperand - rightOperand;
            break;
          case '*':
            result = leftOperand * rightOperand;
            break;
          case '/':
            result = leftOperand / rightOperand;
            break;
        }
  
        stack.push(result);
      } else if (isLetter(token)) {

        const coefficient = parseFloat(stack.pop());
        const valueOfParam = parseFloat(parameters.shift());
        const termResult = coefficient * valueOfParam;
        stack.push(termResult);
      } else {
        const value = parseFloat(token);
        stack.push(value);
      }
    }
  
    if (stack.length !== 1 || isNaN(stack[0])) {
      throw new Error('Invalid equation: Enter equation in the correct format, for example, 6 + (3x -2y)');
    }
  
    return stack[0];
  }
  
  function isLetter(char) {
    return /[a-zA-Z]/.test(char);
  }
  
  function tokenizeEquation(equation) {
    const tokens = [];
    let currentToken = '';
  
    for (let i = 0; i < equation.length; i++) {
      const char = equation[i];
  
      if (isOperator(char) || isParenthesis(char)) {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
        tokens.push(char);
      } else if (isWhitespace(char)) {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
      } else if (isLetter(char)) {
        if (currentToken !== '') {
          tokens.push(currentToken);
          currentToken = '';
        }
        currentToken += char;
        if (i + 1 === equation.length) {
          tokens.push(currentToken);
          currentToken = '';
        } else {
          const nextChar = equation[i + 1];
          if (nextChar !== undefined && !isOperator(nextChar) && !isWhitespace(nextChar)) {
            tokens.push(currentToken);
            currentToken = '';
          }
        }
      } else {
        currentToken += char;
      }
    }
  
    if (currentToken !== '') {
      tokens.push(currentToken);
    }
  
    return tokens;
  }
  
  
  function saveEquation(equation, result, callback) {
    equationModel.saveEquation(equation, result, (err) => {
      if (err) {
        console.error('Error occured while saving equation to the database:', err);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
  
  function removeEquation(equationId, callback) {
    equationModel.removeEquation(equationId, (err) => {
      if (err) {
        console.error('Error occured while removing equation from the database:', err);
        callback(err);
      } else {
        callback(null);
      }
    });
  }
  
  function getAllEquations(callback) {
    equationModel.getAllEquations((err, equations) => {
      if (err) {
        console.error('Error occured while getting all equations from the database:', err);
        callback(err, null);
      } else {
        callback(null, equations);
      }
    });
  }


module.exports = {
  processEquation,
  evaluateEquation,
  saveEquation: equationModel.saveEquation,
  removeEquation: equationModel.removeEquation,
  getAllEquations: equationModel.getAllEquations,
};