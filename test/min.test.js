const { ValidationFactory } = require('../dist');

test('it can validate the min value of the number', () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric().min(18) }), { age: 17 });
  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The age field must be at least 18.');
});

test('it can validate the minimum number of characters of the string', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().string().min(3) }), { name: 'na' });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must be at least 3 characters.');
});

test('it can validate the minimum number of items of the array', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().array().min(3) }), { name: [] });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must be at least 3 items.');
});
