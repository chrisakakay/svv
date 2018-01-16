/* eslint-env jest */

const Validator = require('./index.es6.js');

describe('Simple Value Validator', () => {
  it('should have Runner and Item', () => {
    expect(Validator.Runner).toBeDefined();
    expect(Validator.Item).toBeDefined();
  });

  describe('Item', () => {
    xit('constructor', () => {

    });

    it('required', () => {
      expect(new Validator.Item('', undefined).required().valid).toBe(false);
      expect(new Validator.Item('', null).required().valid).toBe(false);
      expect(new Validator.Item('', '').required().valid).toBe(false);
      expect(new Validator.Item('', 'a').required().valid).toBe(true);
    });

    it('requiredIf', () => {
      expect(new Validator.Item('', undefined).requiredIf(true).valid).toBe(false);
      expect(new Validator.Item('', null).requiredIf(true).valid).toBe(false);
      expect(new Validator.Item('', '').requiredIf(true).valid).toBe(false);
      expect(new Validator.Item('', 'a').requiredIf(true).valid).toBe(true);

      expect(new Validator.Item('', undefined).requiredIf(false).valid).toBe(true);
      expect(new Validator.Item('', null).requiredIf(false).valid).toBe(true);
      expect(new Validator.Item('', '').requiredIf(false).valid).toBe(true);
      expect(new Validator.Item('', 'a').requiredIf(false).valid).toBe(true);
    });

    it('comeAfter', () => {
      expect(new Validator.Item('', 1).comeAfter('', 1).valid).toBe(false);
      expect(new Validator.Item('', 2).comeAfter('', 1).valid).toBe(true);
    });

    it('notEqual', () => {
      expect(new Validator.Item('', 'a').notEqual('', 'a').valid).toBe(false);
      expect(new Validator.Item('', 'a').notEqual('', 'b').valid).toBe(true);
      expect(new Validator.Item('', 1).notEqual('', 1).valid).toBe(false);
      expect(new Validator.Item('', 1).notEqual('', 2).valid).toBe(true);
    });

    it('minLength', () => {
      expect(new Validator.Item('', 'a').minLength(1).valid).toBe(true);
      expect(new Validator.Item('', '').minLength(1).valid).toBe(false);
      expect(new Validator.Item('', 'a').minLength(2).valid).toBe(false);
    });
  });

  describe('Runner', () => {
    xit('constructor', () => {

    });

    xit('all', () => {

    });
  });
})
