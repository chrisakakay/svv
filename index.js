class Item {
  constructor(name, value) {
    this.name = name;
    this.value = value;

    this.valid = true;
    this.errors = [];
  }

  required() {
    if (!(this.value && this.value !== null && this.value !== '')) {
      this.errors.push(`The ${this.name} field is required`);
      this.valid = false;
    }

    return this;
  }

  requiredIf(condition) {
    if (condition) {
      this.required();
    }

    return this;
  }

  comeAfter(name, value) {
    if (!(this.value && this.value > value)) {
      this.errors.push(`The ${this.name} should come after ${name}`);
      this.valid = false;
    }

    return this;
  }

  notEqual(name, value) {
    if (!(this.value && this.value !== value)) {
      this.errors.push(`The ${this.name} should not be the same as the ${name}`);
      this.valid = false;
    }

    return this;
  }
}

class Runner {
  constructor() {
    this.stressed = false;
    this.valid = true;
    this.errors = {
      has: () => {},
      first: () => {}
    };
  }

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
