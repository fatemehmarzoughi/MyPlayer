import {DeleteAccountResponseBody, deleteAccount} from '../../../src/API';

jest.mock('../../../src/API/API.ts', () => ({
  DELETE: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        data: {
          id: 0,
          email: 'email',
          username: 'username',
        } as DeleteAccountResponseBody,
        status: 200,
      }),
    )
    .mockReturnValueOnce(Promise.reject('error delete'))
    .mockReturnValueOnce(Promise.resolve({data: {}, status: 400})),
}));

jest.mock('../../../src/LocalStorage/AsyncStorageData.ts', () => ({
  getData: jest
    .fn()
    .mockReturnValueOnce(Promise.resolve(34957))
    .mockReturnValueOnce(Promise.resolve(undefined))
    .mockReturnValueOnce(Promise.reject('error'))
    .mockReturnValueOnce(Promise.resolve(342))
    .mockReturnValueOnce(Promise.resolve(342)),
}));

describe('Testing the Delete account DELETE request', () => {
  it('should run the onSuccess callback when the status is ok or 200', async () => {
    await deleteAccount({
      onSuccess: data => {
        expect(data).toEqual({
          id: 0,
          email: 'email',
          username: 'username',
        } as DeleteAccountResponseBody);
      },
    });
  });

  it('should run the onError callback when there is no userId provided', async () => {
    try {
      await deleteAccount({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });

  it('should run the onError callback when get error while reading data from localStorage', async () => {
    try {
      await deleteAccount({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });

  it('should run the onError callback when Promise rejected', async () => {
    try {
      await deleteAccount({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });

  it('should run the onError callback when the status is not ok or 200', async () => {
    try {
      await deleteAccount({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });
});
