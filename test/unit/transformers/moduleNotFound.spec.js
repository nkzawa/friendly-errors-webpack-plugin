const moduleNotFound = require('../../../src/transformers/moduleNotFound');
const expect = require('expect');
const test = require('ava');

const error = {
  name: 'ModuleNotFoundError',
  message: 'Module not found : redux',
  webpackError: {
    dependencies: [{ request: 'redux' } ],
  },
};

test('Sets severity to 900', () => {
  expect(moduleNotFound(error).severity).toEqual(900);
});

test('Sets module name', () => {
  expect(moduleNotFound(error).module).toEqual('redux');
});

test('Sets the appropiate message', () => {
  const message = 'Module not found redux';
  expect(moduleNotFound(error).message).toEqual(message);
});

test('Sets the appropiate message', () => {
  const message = 'Module not found redux';
  expect(moduleNotFound({
    name: 'ModuleNotFoundError',
    message: 'Module not found',
    webpackError: error.webpackError,
  }).type).toEqual('module-not-found');
});

test('Ignores other errors', () => {
  const error = { name: 'OtherError' };
  expect(moduleNotFound(error)).toEqual(error);
});
