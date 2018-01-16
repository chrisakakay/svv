# Simple Value Validator

A small module the validate values easily (opinionated).

Install:

```bash
yarn add svv
// or
npm install svv
```

Usage example:

```javascript
import { Runner, Item } from 'svv';

const validator = new Runner();

validator.all([
    new Item('content', property1).required(),
    new Item('category', property2).requiredIf(property1 === 'something')
], { /* options */ })
.then((result) => {
    if (result.valid) {
       // valid
    } else {
       // invalid
       //
       // checking if the error is specific to a field:
       // result.errors.has('content') => boolean // content has errors
       //
       // checking the first error message for a field
       // result.errors.first('content') => 'The content field is required'
    }
});
```

[API DOCS v0.1.0](https://chrisakakay.github.io/svv/svv/0.2.0)
