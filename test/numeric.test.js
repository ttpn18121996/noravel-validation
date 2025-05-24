const { ValidationFactory } = require('../dist');

test('it can validate a invalid number', () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: 'my age' });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The age field must be a number.');
});

test('it can pass a digits', () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: '123' });

  const expected = () => {
    validator.validate();
  };

  expect(expected).not.toThrow();
});

test('it can validate a required number', () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric().required() }), { age: null });
  validator.validated();

  const expected = validator.errors();

  expect(expected).toEqual({
    age: ['The age field must be a number.', 'The age field is required.'],
  });
});
