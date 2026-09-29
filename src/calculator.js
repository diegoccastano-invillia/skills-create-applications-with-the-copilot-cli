function validateNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError('Both operands must be finite numbers');
  }
}

function addition(a, b) {
  validateNumbers(a, b);
  return a + b;
}

function subtraction(a, b) {
  validateNumbers(a, b);
  return a - b;
}

function multiplication(a, b) {
  validateNumbers(a, b);
  return a * b;
}

function division(a, b) {
  validateNumbers(a, b);
  if (b === 0) {
    throw new RangeError('Cannot divide by zero');
  }
  return a / b;
}

const operations = { addition, subtraction, multiplication, division };

function calculate(operation, a, b) {
  const calculateOperation = operations[operation];
  if (!calculateOperation) {
    throw new Error(`Unknown operation: ${operation}`);
  }
  return calculateOperation(a, b);
}

if (require.main === module) {
  const [, , operation, firstOperand, secondOperand] = process.argv;
  const a = Number(firstOperand);
  const b = Number(secondOperand);

  try {
    if (firstOperand === undefined || secondOperand === undefined) {
      throw new Error('Usage: node src/calculator.js <operation> <number> <number>');
    }
    console.log(calculate(operation, a, b));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
};
