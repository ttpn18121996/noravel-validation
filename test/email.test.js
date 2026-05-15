const { ValidationFactory } = require('../dist');

test('it can validate email rule', async () => {
  const validator = ValidationFactory.make(rule => ({ email: rule().email() }), {
    email: 'not an email',
  });

  await expect(validator.validate()).rejects.toThrow('The email field must be a valid email address.');
});
