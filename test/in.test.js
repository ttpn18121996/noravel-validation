const { ValidationFactory } = require('../dist');

describe('it can make sure the selected value is in the list', () => {
  test('with an array', () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(['male', 'female']) }), { gender: 'John' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The gender field must be a valid value.');
  });

  test('with a string', () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in('male') }), { gender: 'John' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The gender field must be a valid value.');
  });

  test('with a numeric', () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(1) }), { gender: 'male' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The gender field must be a valid value.');
  });

  test('with a json', () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in('["male","female"]') }), { gender: 'John' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The gender field must be a valid value.');
  });

  test('with a arrayable', () => {
    const genders = { toArray: () => ['male', 'female'] };
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(genders) }), { gender: 'John' });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The gender field must be a valid value.');
  });
});
