/**
 @typedef Result
 @type {Object}
 @property {Object} errors
 @property {boolean} valid
 */

/**
 @typedef Options
 @type {Object}
 @property {boolean} stressed
 */

/**
 * Item class.
 * @constructor
 * @param {string} name - The name.
 * @param {string} value - The value.
 */
class Item {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.shouldBeValidated = true;

    this.valid = true;
    this.errors = [];
  }

  /**
   * Should be filled out.
   * @return {Item} The validation Item itself
   */
  required() {
    this.shouldBeValidated = true;

    if (!(this.value && this.value !== null && this.value !== '')) {
      this.errors.push(`The ${this.name} field is required`);
      this.valid = false;
    }

    return this;
  }

  /**
   * Should be filled out if the condition is true.
   * @param {boolean} condition - The condition.
   * @returns {Item} The validation Item itself
   */
  requiredIf(condition) {
    if (condition) {
      this.required();
    }

    this.shouldBeValidated = false;

    return this;
  }

  /**
   * Should be bigger than the given value .
   * @param {string} name - The name.
   * @param {string} value - The value.
   * @return {Item} The validation Item itself
   */
  comeAfter(name, value) {
    if (this.shouldBeValidated && !(this.value && this.value > value)) {
      this.errors.push(`The ${this.name} should come after ${name}`);
      this.valid = false;
    }

    return this;
  }

  /**
   * Should be valid if not equal with other value.
   * @param {string} name - The name.
   * @param {string} value - The value.
   * @return {Item} The validation Item itself
   */
  notEqual(name, value) {
    if (this.shouldBeValidated && !(this.value && this.value !== value)) {
      this.errors.push(`The ${this.name} should not be the same as the ${name}`);
      this.valid = false;
    }

    return this;
  }

  /**
   * Should be valid if the length is bigger than the value.
   * @param {string} value - The value.
   * @return {Item} The validation Item itself
   */
  minLength(value) {
    if (this.shouldBeValidated && !(this.value && this.value.length >= value)) {
      this.errors.push(`The ${this.name} should be longer than ${value} characters`);
      this.valid = false;
    }

    return this;
  }
}

/**
 * Runner class.
 * @constructor
 */
class Runner {
  constructor() {
    this.stressed = false;
    this.valid = true;
    this.errors = {
      has: () => {},
      first: () => {}
    };
  }

  /**
   * Running the given validations.
   * @param {(Item|Array)} items - An array of {Item} rules.
   * @param {Options} opts - Options object.
   * @returns {Result} result
   */
  all(items, opts) {
    if (opts && opts.stressed) this.stressed = true;

    return new Promise((resolve) => {
      const result = {
        errors: {},
        valid: true
      };

      items.forEach((item) => {
        if (!item.valid) {
          result.errors[item.name] = item.errors;
          result.valid = false;
        }
      });

      result.errors.has = errorName => result.errors[errorName];
      result.errors.first = errorName => (result.errors[errorName] ? result.errors[errorName][0] : '');

      if (this.stressed) {
        this.errors = result.errors;
        this.valid = result.valid;
      }

      resolve(result);
    });
  }
}

module.exports = {
  Runner,
  Item
};
