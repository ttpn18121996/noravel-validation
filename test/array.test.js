const { ValidationFactory } = require('../dist');

test('it can validate that the data is an invalid array', async () => {
  const validator = ValidationFactory.make(rule => ({ posts: rule().array() }), { posts: 123 });
  await expect(validator.validate()).rejects.toThrow('The posts field must be an array.');
});

test('it can validate the required array', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().array().required() }), {});
  await validator.validated();

  const expected = validator.errors();

  expect(expected).toEqual({
    name: ['The name field must be an array.', 'The name field is required.'],
  });
});
