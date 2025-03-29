const { ValidationFactory } = require('../dist');

describe('it can validate string', () => {
  test('with required rule', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().string().required() }), { name: null });
    validator.validated();

    const expected = validator.errors();

    expect(expected).toEqual({
      name: ['The name field must be a string.', 'The name field is required.'],
    });
  });
});

describe('it can validate numeric', () => {
  test('with number value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: 123 });
    validator.validated();

    expect(validator.getMessage()).toEqual('');
  });

  test('with digits value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: '123' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).not.toThrow();
  });

  test('with invalid value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric() }), { age: 'my age' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The age field must be a number.');
  });

  test('with required a numeric value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric().required() }), { age: null });
    validator.validated();

    const expected = validator.errors();

    expect(expected).toEqual({
      age: ['The age field must be a number.', 'The age field is required.'],
    });
  });
});

describe('it can validate array', () => {
  test('with number value', () => {
    const validator = ValidationFactory.make(rule => ({ posts: rule().array() }), { posts: 123 });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The posts field must be an array.');
  });

  test('with required rule', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().array().required() }), {});
    validator.validated();

    const expected = validator.errors();

    expect(expected).toEqual({
      name: ['The name field must be an array.', 'The name field is required.'],
    });
  });
});
