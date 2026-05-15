const { ValidationFactory } = require('../dist');

test('it can validate the min value of the number', async () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric().min(18) }), { age: 17 });
  await expect(validator.validate()).rejects.toThrow('The age field must be at least 18.');
});

test('it can validate the minimum number of characters of the string', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string().min(3) }), { name: 'na' });
  await expect(validator.validate()).rejects.toThrow('The name field must be at least 3 characters.');
});

test('it can validate the minimum number of items of the array', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().array().min(3) }), { name: [] });
  await expect(validator.validate()).rejects.toThrow('The name field must be at least 3 items.');
});
