const { ValidationFactory } = require('../dist');

describe('it can validate email', () => {
  test('with an invalid email', () => {
    const expected = () => {
      ValidationFactory.make(
        rule => ({
          email: rule().email(),
        }),
        {
          email: 'not an email',
        },
      ).validate();
    };

    expect(expected).toThrow('The email field must be a valid email address.');
  });

  test('with a valid email', () => {
    const expected = ValidationFactory.make(
      rule => ({
        email: rule().email(),
      }),
      {
        email: 'test@example.com',
      },
    ).validate();

    expect(expected).toEqual({
      email: 'test@example.com',
    });
  });
});
