const { ValidationFactory } = require('../dist');

test('it can validate a file', () => {
  const validator = ValidationFactory.make(
    rule => ({
      file: rule().file(),
    }),
    {
      file: 'test.txt',
    },
  );
  validator.validated();
  const expected = validator.errors();

  expect(expected).toEqual({
    file: ['The file field must be a file.'],
  });
});

describe('it can validate a file with mimes', () => {
  test('with mimes', () => {
    const file = new File(['test.txt'], 'test.txt', { type: 'text/plain' });
    const validator = ValidationFactory.make(
      rule => ({
        file: rule().mimes('.jpg,.png'),
      }),
      {
        file: file,
      },
    );
    validator.validated();
    const expected = validator.errors();

    expect(expected).toEqual({
      file: ['The file field must be a file of type: .jpg, .png.'],
    });
  });

  test('with mimetypes', () => {
    const file = new File(['test.txt'], 'test.txt', { type: 'text/plain' });
    const validator = ValidationFactory.make(
      rule => ({
        file: rule().mimetypes('image/jpeg,image/png'),
      }),
      {
        file: file,
      },
    );
    validator.validated();
    const expected = validator.errors();

    expect(expected).toEqual({
      file: ['The file field must be a file of type: image/jpeg, image/png.'],
    });
  });
});
