'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Item = function () {
  function Item(name, value) {
    _classCallCheck(this, Item);

    this.name = name;
    this.value = value;
    this.shouldBeValidated = true;

    this.valid = true;
    this.errors = [];
  }

  _createClass(Item, [{
    key: 'required',
    value: function required() {
      this.shouldBeValidated = true;

      if (!(this.value && this.value !== null && this.value !== '')) {
        this.errors.push('The ' + this.name + ' field is required');
        this.valid = false;
      }

      return this;
    }
  }, {
    key: 'requiredIf',
    value: function requiredIf(condition) {
      if (condition) {
        return this.required();
      }

      this.shouldBeValidated = false;

      return this;
    }
  }, {
    key: 'comeAfter',
    value: function comeAfter(name, value) {
      if (this.shouldBeValidated && !(this.value && this.value > value)) {
        this.errors.push('The ' + this.name + ' should come after ' + name);
        this.valid = false;
      }

      return this;
    }
  }, {
    key: 'notEqual',
    value: function notEqual(name, value) {
      if (this.shouldBeValidated && !(this.value && this.value !== value)) {
        this.errors.push('The ' + this.name + ' should not be the same as the ' + name);
        this.valid = false;
      }

      return this;
    }
  }, {
    key: 'minLength',
    value: function minLength(value) {
      if (this.shouldBeValidated && !(this.value && this.value.length >= value)) {
        this.errors.push('The ' + this.name + ' should be longer than ' + value + ' characters');
        this.valid = false;
      }

      return this;
    }
  }]);

  return Item;
}();

var Runner = function () {
  function Runner() {
    _classCallCheck(this, Runner);

    this.stressed = false;
    this.valid = true;
    this.errors = {
      has: function has() {},
      first: function first() {}
    };
  }

  _createClass(Runner, [{
    key: 'all',
    value: function all(items, opts) {
      var _this = this;

      if (opts && opts.stressed) this.stressed = true;

      return new Promise(function (resolve) {
        var result = {
          errors: {},
          valid: true
        };

        items.forEach(function (item) {
          if (!item.valid) {
            result.errors[item.name] = item.errors;
            result.valid = false;
          }
        });

        result.errors.has = function (errorName) {
          return result.errors[errorName];
        };
        result.errors.first = function (errorName) {
          return result.errors[errorName] ? result.errors[errorName][0] : '';
        };

        if (_this.stressed) {
          _this.errors = result.errors;
          _this.valid = result.valid;
        }

        resolve(result);
      });
    }
  }]);

  return Runner;
}();

module.exports = {
  Runner: Runner,
  Item: Item
};
