const { ValidationFactory } = require('../dist');

test('it can validate date rule', () => {
  const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date() }), {
    date_of_birth: '1996-12-18',
  });

  const expected = () => {
    validator.validate();
  };

  expect(expected).not.toThrow('The date of birth field must be a valid date.');
});

describe('it can validate date rule with custom format', () => {
  test('with DD-MM-YYYY format', () => {
    const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date('DD-MM-YYYY') }), {
      date_of_birth: '18-12-1996',
    });

    const expected = () => {
      validator.validate();
    };

    expect(expected).not.toThrow('The date of birth field must be a valid date.');
  });

  test('with MM-DD-YYYY format', () => {
    const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date('MM-DD-YYYY') }), {
      date_of_birth: '12-18-1996',
    });

    const expected = () => {
      validator.validate();
    };

    expect(expected).not.toThrow('The date of birth field must be a valid date.');
  });
});
