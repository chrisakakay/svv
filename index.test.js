/* eslint-env jest */

const Validator = require('./index.es6.js');

describe('Simple Value Validator', () => {
  it('should have Runner and Item', () => {
    expect(Validator.Runner).toBeDefined();
    expect(Validator.Item).toBeDefined();
  });
})
