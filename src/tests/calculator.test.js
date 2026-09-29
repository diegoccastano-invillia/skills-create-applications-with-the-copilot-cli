const assert = require('node:assert/strict');
const test = require('node:test');

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
} = require('../calculator');

test('addition returns the sum of two numbers', () => {
  assert.equal(addition(2, 3), 5);
});

test('subtraction returns the difference of two numbers', () => {
  assert.equal(subtraction(8, 3), 5);
});

test('multiplication returns the product of two numbers', () => {
  assert.equal(multiplication(4, 3), 12);
});

test('division returns the quotient of two numbers', () => {
  assert.equal(division(10, 2), 5);
});

test('division rejects division by zero', () => {
  assert.throws(() => division(10, 0), /Cannot divide by zero/);
});

test('calculate dispatches to the requested operation', () => {
  assert.equal(calculate('addition', 2, 3), 5);
});

test('calculate rejects an unknown operation', () => {
  assert.throws(() => calculate('modulo', 5, 2), /Unknown operation/);
});
