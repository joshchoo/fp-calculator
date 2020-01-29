'use strict';

function calculate(
  newAction = 'ac',
  prevAction = 'ac',
  currDisplay = '0',
  currExpression = ''
) {
  let display = currDisplay;
  let expression = currExpression;

  if (isNumber(newAction)) {
    const number = newAction;
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        display = number;
        expression = '';
        break;
      case prevAction === '0' && display === '0':
      case isOperator(prevAction):
        display = number;
        break;
      case isNumber(prevAction):
      case prevAction === '.':
        display = currDisplay.concat(number);
        break;
    }
  } else if (isOperator(newAction)) {
    const operator = newAction;
    switch (true) {
      case prevAction === 'ac':
      case prevAction === '=':
        expression = currDisplay.concat(operator);
        break;
      case isNumber(prevAction):
      case prevAction === '.':
        display = evaluate(currExpression.concat(currDisplay));
        expression = currExpression
          .concat(removeTrailingDecimals(currDisplay))
          .concat(operator);
        break;
      case isOperator(prevAction):
        expression = currExpression
          .slice(0, currExpression.length - 1)
          .concat(operator);
        break;
    }
  }

  return {
    display: display,
    expression: expression,
  };
}

function evaluate(expression) {
  const answer = Math.round(1000000000000 * eval(expression)) / 1000000000000;
  return answer.toString();
}

function removeTrailingDecimals(display) {
  const trailingDecimalRegex = /\.+$/;
  return display.replace(trailingDecimalRegex, '');
}

function isNumber(c) {
  return '0123456789'.includes(c);
}

function isOperator(c) {
  return '+-/*'.includes(c);
}

module.exports = calculate;
