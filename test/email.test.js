const { ValidationFactory } = require('../dist');

test('it can validate email rule', () => {
  const validator = ValidationFactory.make(rule => ({ email: rule().email() }), {
    email: 'not an email',
  });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The email field must be a valid email address.');
});
