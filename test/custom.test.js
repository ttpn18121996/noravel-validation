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
