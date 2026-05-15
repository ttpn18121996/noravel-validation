const { ValidationFactory } = require('../dist');

test('it can validate a invalid number', () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: 'my age' });

  expect(validator.validate()).rejects.toThrow('The age field must be a number.');
});

test('it can pass a digits', async () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: '123' });

  await expect(validator.validate()).resolves.toBeTruthy();
});

test('it can validate a required number', async () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric().required() }), { age: null });

  await expect(validator.validate()).rejects.toThrow('The age field must be a number.');

  const errors = validator.errors();

  expect(errors).toEqual({
    age: ['The age field must be a number.', 'The age field is required.'],
  });
});
