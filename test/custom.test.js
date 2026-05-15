const { ValidationFactory, ValidationRule } = require('../dist');

test('it can make a custom rule', async () => {
  const CustomRule = ValidationFactory.makeRule((attribute, value, fail) => {
    if (value === 'failed') {
      fail(`The ${attribute} field must not be failed.`);
    }
  });

  await expect(
    ValidationFactory.make(
      _ => ({
        status: CustomRule,
      }),
      {
        status: 'failed',
      },
    ).validate(),
  ).rejects.toThrow('The status field must not be failed.');
});

test('it can make a custom class', async () => {
  class PhoneRule extends ValidationRule {
    validate(attribute, value, fail) {
      if (!/^\d{10}$/.test(value)) {
        fail(`The ${attribute} must be 10 digits`);
      }
    }
  }

  await expect(
    ValidationFactory.make(
      _ => ({
        phone: new PhoneRule(),
      }),
      {
        phone: 'wrong phone number',
      },
    ).validate(),
  ).rejects.toThrow('The phone must be 10 digits');
});

test('it can get valid keys from the data', async () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John' },
  );

  await expect(validator.valid()).resolves.toEqual(['name']);
});

test('it can get invalid keys from the data', async () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John' },
  );

  await expect(validator.invalid()).resolves.toEqual(['email']);
});

test('it can get data from the validator', () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().string().required(),
      email: rule().email().required(),
    }),
    { name: 'John', email: 'ttpn18121996@example.com', other: 'something' },
  );

  expect(validator.getData()).toEqual({
    name: 'John',
    email: 'ttpn18121996@example.com',
    other: 'something',
  });
});

test('it can mix custom rule with other rules', async () => {
  class PhoneRule extends ValidationRule {
    validate(attribute, value, fail) {
      if (!/^\d{10}$/.test(value)) {
        fail(`The ${attribute} must be 10 digits`);
      }
    }
  }

  await expect(
    ValidationFactory.make(
      rule => ({
        phone: rule().addRule('phone', new PhoneRule()).nullable(),
      }),
      {
        phone: null,
      },
    ).validate(),
  ).resolves.not.toThrow('The phone must be 10 digits');
});
