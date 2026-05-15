const { ValidationFactory } = require('../dist');

test('it can validate max value of the number', async () => {
  const validator = ValidationFactory.make(rule => ({ age: rule().numeric().max(18) }), { age: 19 });
  await expect(validator.validate()).rejects.toThrow('The age field must not have more than 18.');
});

test('it can validate the maximum number of characters of the string', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().string().max(3) }), { name: 'John' });
  await expect(validator.validate()).rejects.toThrow('The name field must not have more than 3 characters.');
});

test('it can validate the maximum number of items of the array', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().array().max(3) }), {
    name: ['John', 'Doe', 'Jane', 'Jame'],
  });
  await expect(validator.validate()).rejects.toThrow('The name field must not have more than 3 items.');
});
