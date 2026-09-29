const operations = {
  // Supported operations: addition, subtraction, multiplication, and division.
  addition: (first, second) => first + second,
  subtraction: (first, second) => first - second,
  multiplication: (first, second) => first * second,
  division: (first, second) => {
    if (second === 0) {
      throw new Error('Division by zero is not allowed.');
    }

    return first / second;
  },
};

function calculate(operation, first, second) {
  const operationFunction = operations[operation];

  if (!operationFunction) {
    throw new Error(
      `Invalid operation "${operation}". Use: ${Object.keys(operations).join(', ')}.`,
    );
  }

  const result = operationFunction(first, second);

  if (!Number.isFinite(result)) {
    throw new Error('The result is outside the supported numeric range.');
  }

  return result;
}

function parseNumber(value, name) {
  if (value.trim() === '') {
    throw new Error(`${name} must be a valid number.`);
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    throw new Error(`${name} must be a valid finite number.`);
  }

  return number;
}

function main(args) {
  if (args.length !== 3) {
    throw new Error(
      'Usage: node src/calculator.js <addition|subtraction|multiplication|division> <number1> <number2>',
    );
  }

  const [operation, firstValue, secondValue] = args;
  const first = parseNumber(firstValue, 'First operand');
  const second = parseNumber(secondValue, 'Second operand');

  console.log(calculate(operation, first, second));
}

if (require.main === module) {
  try {
    main(process.argv.slice(2));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

module.exports = { calculate };
