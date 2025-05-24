const { ValidationFactory } = require('../dist');

test('it can convert form data to object', () => {
  const formData = new FormData();
  formData.append('name', 'John');
  formData.append('role', '1');
  formData.append('role', '2');
  formData.append('role', '3');

  const validator = ValidationFactory.make(rule => ({ name: rule().string(), role: rule().array() }), formData);
  const expected = validator.validated();

  expect(expected).toEqual({ name: 'John', role: ['1', '2', '3'] });
});

describe('it can validate required rule', () => {
  test('with an invalid value', () => {
    const validator = ValidationFactory.make(
      rule => ({
        first_name: rule().required(),
        last_name: rule().required(),
        nick_name: rule().required(),
        posts: rule().required(),
      }),
      {
        first_name: null,
        last_name: '',
        posts: [],
      },
    );
    validator.validated();
    const expected = validator.errors();

    expect(expected).toEqual({
      first_name: ['The first name field is required.'],
      last_name: ['The last name field is required.'],
      nick_name: ['The nick name field is required.'],
      posts: ['The posts field is required.'],
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

test('it can validate nullable rule', () => {
  const validator = ValidationFactory.make(
    rule => ({
      name: rule().required().nullable(),
      age: rule().nullable(),
      address: rule().nullable(),
      posts: rule().nullable(),
    }),
    {
      name: null,
      address: '',
      posts: [],
    },
  );

  expect(validator.passes()).toBeTruthy();
});



test('it can validate regex rule', () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().regex(/^[a-zA-Z ]+$/) }), { name: '12342132' });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The name field format is invalid.');
});

test('it can get the validated data', () => {
  const request = {
    name: 'Trinh Tran Phuong Nam',
    email: 'ttpn18121996@example.com',
    phone: '0123456789',
    gender: 'male',
    posts: [],
  };
  const data = ValidationFactory.make(
    rule => ({
      name: rule().required().min(2).max(255),
      email: rule().required().email(),
      phone: rule()
        .required()
        .regex(/^\d{10}$/),
      gender: rule().required().in(['male', 'female']),
      posts: rule().nullable(),
    }),
    request,
  ).validated();

  expect(data).toEqual({
    name: 'Trinh Tran Phuong Nam',
    email: 'ttpn18121996@example.com',
    phone: '0123456789',
    gender: 'male',
    posts: [],
  });
});
