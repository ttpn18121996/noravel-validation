const { ValidationFactory } = require('../dist');

test('it can validate that the data is an invalid confirmation', () => {
  const validator = ValidationFactory.make(rule => ({ password: rule().confirmed() }), {
    password: '123456789',
    password_confirmation: '987654321',
  });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The password field confirmation does not match.');
});

test('it can custom confirmation field', () => {
  const validator = ValidationFactory.make(rule => ({ password: rule().confirmed('repeat_password') }), {
    password: '123456789',
    repeat_password: '987654321',
  });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The password field confirmation does not match.');
});
