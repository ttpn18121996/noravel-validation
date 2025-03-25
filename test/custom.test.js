const { ValidationFactory } = require('../dist');

test('it can make a custom rule', () => {
  const CustomRule = ValidationFactory.makeRule((attribute, value, fail) => {
    if (value === 'failed') {
      fail(`The ${attribute} field must not be failed.`);
    }
  });

  const validator = ValidationFactory.make(_ => ({
    status: CustomRule,
  }));

  validator.validate({
    status: 'failed',
  });

  expect(validator.getMessages()).toEqual({
    status: ['The status field must not be failed.'],
  });
  expect(validator.getMessage()).toEqual('The status field must not be failed.');

  validator.validate({
    status: 'passed',
  });

  expect(validator.passes()).toBeTruthy();
});
