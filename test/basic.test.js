const { ValidationFactory } = require('../dist');

describe('it can validate required rule', () => {
  test('with an invalid value', () => {
    const validator = ValidationFactory.make(
      rule => ({
        first_name: rule().required(),
        last_name: rule().required(),
      }),
      {
        first_name: null,
      },
    );
    validator.validated();
    const expected = validator.getMessages();

    expect(expected).toEqual({
      first_name: ['The first name field is required.'],
      last_name: ['The last name field is required.'],
    });
  });

  test('with a valid value', () => {
    const validator = ValidationFactory.make(
      rule => ({
        first_name: rule().required(),
        last_name: rule().required(),
      }),
      {
        first_name: 'John',
        last_name: 'Doe',
      },
    );

    const expected = validator.validated();

    expect(expected).toEqual({
      first_name: 'John',
      last_name: 'Doe',
    });
  });
});
