const { describe } = require('node:test');
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
    const expected = validator.errors();

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

describe('it can validate max rule', () => {
  test('with numeric value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric().max(18) }), { age: 19 });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The age field must not have more than 18.');
  });

  test('with string value', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().string().max(3) }), { name: 'John' });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must not have more than 3 characters.');
  });

  test('with array value', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().array().max(3) }), {
      name: ['John', 'Doe', 'Jane', 'Jame'],
    });

    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must not have more than 3 items.');
  });
});

describe('it can validate min rule', () => {
  test('with numeric value', () => {
    const validator = ValidationFactory.make(rule => ({ age: rule().numeric().min(18) }), { age: 17 });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The age field must be at least 18.');
  });

  test('with string value', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().string().min(3) }), { name: 'na' });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must be at least 3 characters.');
  });

  test('with array value', () => {
    const validator = ValidationFactory.make(rule => ({ name: rule().array().min(3) }), { name: [] });
    const expected = () => {
      validator.validate();
    };

    expect(expected).toThrow('The name field must be at least 3 items.');
  });
});

test('it can make sure the selected value is in the list', () => {
  const validator = ValidationFactory.make(rule => ({ gender: rule().in(['male', 'female']) }), { gender: 'John' });

  const expected = () => {
    validator.validate();
  };

  expect(expected).toThrow('The gender field must be a valid value.');
});

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
