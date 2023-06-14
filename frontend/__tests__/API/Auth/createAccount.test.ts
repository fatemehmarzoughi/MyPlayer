import {
  CreateAccountRequestBody,
  CreateAccountResponseBody,
  createAccount,
} from '../../../src/API';

jest.mock('../../../src/API/API.ts', () => ({
  POST: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        data: {
          jwt: 'json web token',
          user: {
            username: '',
            email: '',
            id: 0,
          },
        } as CreateAccountResponseBody,
        status: 200,
      }),
    )
    .mockReturnValueOnce(
      Promise.resolve({
        data: {},
        status: 400,
      }),
    )
    .mockReturnValueOnce(Promise.reject('error')),
}));

describe('Testing the create account post request', () => {
  const reqBody: CreateAccountRequestBody = {
    email: 'email',
    password: 'password',
    username: 'username',
  };

  it('should run onSuccess callback when the Promise resolved and the status is 200 or ok', async () => {
    await createAccount({
      reqBody,
      onSuccess: data => {
        expect(data).toEqual({
          jwt: 'json web token',
          user: {
            username: '',
            email: '',
            id: 0,
          },
        });
      },
    });
  });

  it('should throw Error when the status is not ok or 200', async () => {
    try {
      await createAccount({
        reqBody,
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });

  it('should throw Error when unexpected Error happened', async () => {
    try {
      await createAccount({
        reqBody,
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });
});
