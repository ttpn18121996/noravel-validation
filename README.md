# Noravel validation

This is a support library for Nam's projects.

# Content

- [Installation](#installation)
- [Usage](#usage)
- [Available validation rules](#available-validation-rules)

## Installation

```bash
npm install @noravel/validation
```

## Usage

```js
const { ValidationFactory } = require('@noravel/validation');

const validator = ValidationFactory.make(
  rule => ({
    name: rule().required().min(2).max(255),
    email: rule().required().email(),
  }),
  {
    name: 'Trinh Tran Phuong Nam',
    email: 'ttpn18121996@gmail.com',
  }
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

console.log(validator.validated());
```

## Available validation rules

- [email](#email)
- [in](#in)
- [max](#max)
- [min](#min)
- [required](#required)

### email

The field under validation must be formatted as an email address.
By default, the email rule uses regex `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i`.

```js
const validator = ValidationFactory.make(
  rule => ({
    email: rule().email(),
  }),
  { email: 'ttpn18121996@example.com' },
);
```

### in

The field under validation must be included in the given list of values.

```js
const validator = ValidationFactory.make(
  rule => ({
    gender: rule().required().in(['male', 'female']),
  }),
  {
    gender: 'male',
  }
);
```

### max

The field under validation must be less than or equal to a maximum value. Strings, numerics and arrays are evaluated in the same fashion as the size rule.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required().max(100),
    age: rule().required().numeric().max(80),
    posts: rule().required().array().max(10),
  }),
  {
    name: 'Trinh Tran Phuong Nam', // not greater than 100 characters
    age: 30, // not greater than 80
    posts: [1, 2, 3], // not greater than 10 items
  },
);
```

### min

### required
