const { ValidationFactory } = require('../dist');

test('it can convert form data to object', async () => {
  const formData = new FormData();
  formData.append('name', 'John');
  formData.append('role', '1');
  formData.append('role', '2');
  formData.append('role', '3');

  const validator = ValidationFactory.make(rule => ({ name: rule().string(), role: rule().array() }), formData);
  const expected = await validator.validated();

  expect(expected).toEqual({ name: 'John', role: ['1', '2', '3'] });
});

describe('it can validate required rule', () => {
  test('with an invalid value', async () => {
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
    await validator.validated();
    const expected = validator.errors();

    expect(expected).toEqual({
      first_name: ['The first name field is required.'],
      last_name: ['The last name field is required.'],
      nick_name: ['The nick name field is required.'],
      posts: ['The posts field is required.'],
    });
  });

  test('with a valid value', async () => {
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

    const expected = await validator.validated();

    expect(expected).toEqual({
      first_name: 'John',
      last_name: 'Doe',
    });
  });
});

test('it can validate nullable rule', async () => {
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

  expect(await validator.passes()).toBeTruthy();
  expect(validator.getMessage()).toEqual('');
});

test('it can validate regex rule', async () => {
  const validator = ValidationFactory.make(rule => ({ name: rule().regex(/^[a-zA-Z ]+$/) }), { name: '12342132' });
  await expect(validator.validate()).rejects.toThrow('The name field format is invalid.');
});

test('it can get the validated data', async () => {
  const request = {
    name: 'Trinh Tran Phuong Nam',
    email: 'ttpn18121996@example.com',
    phone: '0123456789',
    gender: 'male',
    posts: [],
  };
  const data = await ValidationFactory.make(
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
