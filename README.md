# Noravel validation

This is a support library for Nam's projects.

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

## Available rules

- [email](#email)
- [in](#in)
- [max](#max)
- [min](#min)
- [required](#required)

### email

### in

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

### min

### required
