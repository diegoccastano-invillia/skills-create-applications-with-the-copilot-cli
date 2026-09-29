const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const { describe, it } = require('node:test');
const { calculate } = require('../calculator');

const calculatorPath = path.join(__dirname, '..', 'calculator.js');

describe('calculate', () => {
  describe('addition', () => {
    it('adds the values from the example image', () => {
      assert.equal(calculate('addition', 2, 3), 5);
    });

    it('adds negative and decimal values', () => {
      assert.equal(calculate('addition', -2.5, 1), -1.5);
    });
  });

  describe('subtraction', () => {
    it('subtracts the values from the example image', () => {
      assert.equal(calculate('subtraction', 10, 4), 6);
    });

    it('supports negative results', () => {
      assert.equal(calculate('subtraction', 3, 10), -7);
    });
  });

  describe('multiplication', () => {
    it('multiplies the values from the example image', () => {
      assert.equal(calculate('multiplication', 45, 2), 90);
    });

    it('supports negative and decimal values', () => {
      assert.equal(calculate('multiplication', -2.5, 4), -10);
    });
  });

  describe('division', () => {
    it('divides the values from the example image', () => {
      assert.equal(calculate('division', 20, 5), 4);
    });

    it('supports negative and fractional results', () => {
      assert.equal(calculate('division', -7, 2), -3.5);
    });

    it('rejects division by zero', () => {
      assert.throws(
        () => calculate('division', 1, 0),
        { message: 'Division by zero is not allowed.' },
      );
    });

    it('rejects division by negative zero', () => {
      assert.throws(
        () => calculate('division', 1, -0),
        { message: 'Division by zero is not allowed.' },
      );
    });
  });

  it('rejects an unsupported operation', () => {
    assert.throws(
      () => calculate('modulo', 5, 2),
      { message: 'Invalid operation "modulo". Use: addition, subtraction, multiplication, division.' },
    );
  });

  it('rejects results outside the supported numeric range', () => {
    assert.throws(
      () => calculate('multiplication', Number.MAX_VALUE, 2),
      { message: 'The result is outside the supported numeric range.' },
    );
  });
});

describe('calculator CLI', () => {
  function runCalculator(args) {
    return spawnSync(process.execPath, [calculatorPath, ...args], {
      encoding: 'utf8',
    });
  }

  it('prints a result for valid numeric arguments', () => {
    const result = runCalculator(['addition', '2', '3']);

    assert.equal(result.status, 0);
    assert.equal(result.stdout, '5\n');
    assert.equal(result.stderr, '');
  });

  it('reports usage when the argument count is incorrect', () => {
    const result = runCalculator(['addition', '2']);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /^Error: Usage:/);
  });

  it('reports an invalid operation', () => {
    const result = runCalculator(['modulo', '5', '2']);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /Invalid operation "modulo"/);
  });

  it('reports non-numeric operands', () => {
    const result = runCalculator(['addition', 'abc', '2']);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /First operand must be a valid finite number/);
  });

  it('rejects empty and non-finite operands', () => {
    for (const value of ['', 'Infinity', 'NaN']) {
      const result = runCalculator(['addition', value, '2']);

      assert.equal(result.status, 1, `expected ${JSON.stringify(value)} to be rejected`);
      assert.match(result.stderr, /must be a valid/);
    }
  });

  it('reports division by zero to the CLI user', () => {
    const result = runCalculator(['division', '20', '0']);

    assert.equal(result.status, 1);
    assert.match(result.stderr, /Division by zero is not allowed/);
  });
});
