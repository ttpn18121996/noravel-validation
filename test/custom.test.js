const { ValidationFactory } = require('../dist');

test('it can make a custom rule', () => {
  const CustomRule = ValidationFactory.makeRule((attribute, value, fail) => {
    if (value === 'failed') {
      fail(`The ${attribute} field must not be failed.`);
    }
  });

  const expected = () => {
    ValidationFactory.make(
      _ => ({
        status: CustomRule,
      }),
      {
        status: 'failed',
      },
    ).validate();
  };

  expect(expected).toThrow('The status field must not be failed.');
});

test('it can make a custom class', () => {
  class PhoneRule {
    validate(attribute, value, fail) {
      if (!/^\d{10}$/.test(value)) {
        fail(`The ${attribute} must be 10 digits`);
      }
    }
  }

  const expected = () => {
    ValidationFactory.make(
      _ => ({
        phone: new PhoneRule(),
      }),
      {
        phone: 'wrong phone number',
      },
    ).validate();
  };

  expect(expected).toThrow('The phone must be 10 digits');
});

test('it can get valid keys from the data', () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John' },
  );
  const expected = validator.valid();

  expect(expected).toEqual(['name']);
});

test('it can get invalid keys from the data', () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John' },
  );
  const expected = validator.invalid();

  expect(expected).toEqual(['email']);
});

test('it can get data from the validator', () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John', email: 'ttpn18121996@example.com', other: 'something' },
  );
  const expected = validator.getData();

  expect(expected).toEqual({ name: 'John', email: 'ttpn18121996@example.com', other: 'something' });
});
