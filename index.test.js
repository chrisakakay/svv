/* eslint-env jest */

const Validator = require('./index');

describe('Simple Value Validator', () => {
  it('should have Runner and Item', () => {
    expect(Validator.Runner).toBeDefined();
    expect(Validator.Item).toBeDefined();
  });
})
