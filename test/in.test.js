const { ValidationFactory } = require('../dist');

describe('it can make sure the selected value is in the list', () => {
  test('with an array', async () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(['male', 'female']) }), { gender: 'John' });
    await expect(validator.validate()).rejects.toThrow('The gender field must be a valid value.');
  });

  test('with a string', async () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in('male') }), { gender: 'John' });
    await expect(validator.validate()).rejects.toThrow('The gender field must be a valid value.');
  });

  test('with a numeric', async () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(1) }), { gender: 'male' });

    await expect(validator.validate()).rejects.toThrow('The gender field must be a valid value.');
  });

  test('with a json', async () => {
    const validator = ValidationFactory.make(rule => ({ gender: rule().in('["male","female"]') }), { gender: 'John' });

    await expect(validator.validate()).rejects.toThrow('The gender field must be a valid value.');
  });

  test('with a arrayable', async () => {
    const genders = { toArray: () => ['male', 'female'] };
    const validator = ValidationFactory.make(rule => ({ gender: rule().in(genders) }), { gender: 'John' });

    await expect(validator.validate()).rejects.toThrow('The gender field must be a valid value.');
  });
});
