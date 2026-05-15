const { ValidationFactory } = require('../dist');

test('it can validate a string', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string() }), { name: [] });
  await validator.validated();

  const actual = validator.errors();

  expect(actual).toEqual({
    name: ['The name field must be a string.'],
  });
});

test('it can validate a required string', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string().required() }), { name: null });
  await validator.validated();

  const actual = validator.errors();

  expect(actual).toEqual({
    name: ['The name field must be a string.', 'The name field is required.'],
  });
});
