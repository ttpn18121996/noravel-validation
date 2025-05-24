const { ValidationFactory } = require('../dist');

test('it can validate a string', () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string() }), { name: [] });
  validator.validated();

  const expected = validator.errors();

  expect(expected).toEqual({
    name: ['The name field must be a string.'],
  });
});

test('it can validate a required string', () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string().required() }), { name: null });
  validator.validated();

  const expected = validator.errors();

  expect(expected).toEqual({
    name: ['The name field must be a string.', 'The name field is required.'],
  });
});
