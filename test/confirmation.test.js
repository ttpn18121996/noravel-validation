const { ValidationFactory } = require('../dist');

test('it can validate that the data is an invalid confirmation', async () => {
  const validator = ValidationFactory.make(rule => ({ password: rule().confirmed() }), {
    password: '123456789',
    password_confirmation: '987654321',
  });

  await expect(() => validator.validate()).rejects.toThrow('The password field confirmation does not match.');
});

test('it can custom confirmation field', async () => {
  const validator = ValidationFactory.make(rule => ({ password: rule().confirmed('repeat_password') }), {
    password: '123456789',
    repeat_password: '987654321',
  });

  await expect(() => validator.validate()).rejects.toThrow('The password field confirmation does not match.');
});
