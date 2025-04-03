# Noravel validation

This is a support library for Nam's projects.

# Content

- [Installation](#installation)
- [Usage](#usage)
- [Available validation rules](#available-validation-rules)
- [Custom validation messages](#custom-validation-messages)
- [Custom validation rules](#custom-validation-rules)

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

- [array](#array)
- [email](#email)
- [in](#in)
- [max](#max)
- [min](#min)
- [required](#required)

### array

The field under validation must be an array.

```js
const validator = ValidationFactory.make(
  rule => ({
    posts: rule().required().array().max(3),
  }),
  { posts: 123 },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  posts: ['The posts field must be an array.']
}
*/
```

### email

The field under validation must be formatted as an email address.
By default, the email rule uses regex `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i`.

```js
const validator = ValidationFactory.make(
  rule => ({
    email: rule().email(),
  }),
  { email: 'ttpn18121996' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  email: ['The email field must be a valid email address.']
}
*/
```

### in

The field under validation must be included in the given list of values.

```js
const validator = ValidationFactory.make(
  rule => ({
    gender: rule().required().in(['male', 'female']),
  }),
  {
    gender: 'gentleman',
  }
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  gender: ['The gender field must be a valid value.'],
}
*/
```

### max

The field under validation must be less than or equal to a maximum value.
Strings, numerics and arrays are evaluated in the same fashion as the size rule.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required().max(5),
    age: rule().required().numeric().max(80),
    posts: rule().required().array().max(3),
  }),
  {
    name: 'Trinh Tran Phuong Nam',
    age: 90,
    posts: [1, 2, 3, 4],
  },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  name: ['The name field must not have more than 5 characters.'],
  age: ['The age field must not have more than 80.'],
  posts: ['The posts field must not have more than 3 items.'],
}
*/
```

### min

The field under validation must be greater than or equal to a minimum value.
Strings, numerics and arrays are evaluated in the same fashion as the size rule.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required().min(5),
    age: rule().required().numeric().min(18),
    posts: rule().required().array().min(3),
  }),
  {
    name: 'Nam',
    age: 3,
    posts: [1],
  },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  name: ['The name field must be at least 5 characters.'],
  age: ['The age field must be at least 18.'],
  posts: ['The posts field must be at least 3 items.'],
}
*/
```

### numeric

The field under validation must be numeric.

```js
const validator = ValidationFactory.make(
  rule => ({
    age: rule().required().numeric(),
  }),
  { age: 'my age' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  age: ['The age field must be a number.']
}
*/
```

### required

The field under validation must be present in the input data and not be empty.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required(),
    email: rule().required(),
    password: rule().required(),
    other: rule().required(),
  }),
  { name: null, email: '', password: '    ' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  name: ['The name field is required.'],
  email: ['The email field is required.'],
  password: ['The password field is required.'],
  other: ['The other field is required.'],
}
*/
```

### string

The field under validation must be a string.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required().string(),
  }),
  { name: 123 },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  name: ['The name field must be a string.'],
}
*/
```

## Custom validation messages

You can set custom validation messages by passing a parameter for each rule definition function.

```js
const validator = ValidationFactory.make(
  rule => ({
    name: rule().required('You cannot leave the name field empty.'),
    email: rule().email('Please enter a valid email address.'),
  }),
  { name: null, email: 'ttpn18121996' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  name: ['You cannot leave the name field empty.'],
  email: ['Please enter a valid email address.'],
}
*/
```

## Custom validation rules

You can use a class to define a custom rule.
An rule object contains a `validate` method.
This method receives the attribute name, its value,
and a callback that should be invoked on failure with the validation error message.

```js
class PhoneRule {
  validate(attribute, value, fail) {
    if (!/^(\+\d{1,3}[- ]?)?(\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}$/.test(value)) {
      fail(`The ${attribute} must be a valid phone number.`);
    }
  }
}

const validator = ValidationFactory.make(
  _ => ({
    phone: new PhoneRule(),
  }),
  { phone: 'my phone number' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  phone: ['The phone must be a valid phone number.'],
}
*/
```

You can also use the `makeRule` method of the `ValidationFactory` to create a custom rule.
It receives a callback function that should be invoked with the attribute name, its value,
and a callback that should be invoked on failure with the validation error message.

```js
const UppercaseRule = ValidationFactory.makeRule((attribute, value, fail) => {
  if (value !== value.toUpperCase()) {
    fail(`The ${attribute} field must be uppercase.`);
  }
});

ValidationFactory.make(
  _ => ({
    code: UppercaseRule,
  }),
  { code: 'failed' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  code: ['The code field must be uppercase.'],
}
*/
```

Under the hood, the `makeRule` method creates a new instance of the `CustomRule` class.
You can also use the `CustomRule` class directly.

```js
import { CustomRule } from '@noravel/validation';

const UppercaseRule = new CustomRule((attribute, value, fail) => {
  if (value !== value.toUpperCase()) {
    fail(`The ${attribute} field must be uppercase.`);
  }
});

ValidationFactory.make(
  _ => ({
    code: UppercaseRule,
  }),
  { code: 'failed' },
);

if (validator.fails()) {
  console.log(validator.getMessage());
}

/*
{
  code: ['The code field must be uppercase.'],
}
*/
```

