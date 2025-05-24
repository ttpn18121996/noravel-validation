const { ValidationFactory } = require('../dist');

test('it can validate that the data is an invalid array', () => {
  const validator = ValidationFactory.make(rule => ({ posts: rule().array() }), { posts: 123 });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The posts field must be an array.');
});

test('it can validate the required array', () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().array().required() }), {});
  validator.validated();

  const expected = validator.errors();

  expect(expected).toEqual({
    name: ['The name field must be an array.', 'The name field is required.'],
  });
});
