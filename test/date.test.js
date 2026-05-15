const { ValidationFactory } = require('../dist');

test('it can validate date rule', async () => {
  const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date() }), {
    date_of_birth: '1996-12-18',
  });
  await expect(validator.validate()).resolves.toBeTruthy();
});

describe('it can validate date rule with custom format', () => {
  test('with DD-MM-YYYY format', async () => {
    const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date('DD-MM-YYYY') }), {
      date_of_birth: '18-12-1996',
    });
    await expect(validator.validate()).resolves.toBeTruthy();
  });

  test('with MM-DD-YYYY format', async () => {
    const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date('MM-DD-YYYY') }), {
      date_of_birth: '12-18-1996',
    });
    await expect(validator.validate()).resolves.toBeTruthy();
  });

  test('with invalid format', async () => {
    const validator = ValidationFactory.make(rule => ({ date_of_birth: rule().date() }), {
      date_of_birth: '1996/12/18',
    });
    await expect(validator.validate()).rejects.toThrow('The date_of_birth field must be a valid date.');
  });
});
