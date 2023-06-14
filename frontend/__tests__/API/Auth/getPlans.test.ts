import {GetPlansResponseBody, getPlans} from '../../../src/API';

jest.mock('../../../src/API/API.ts', () => ({
  GET: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        data: {
          data: [
            {
              id: 0,
              attributes: {
                id: 0,
                price: 0,
                title: '',
                subTitle: '',
                type: 'annual',
              },
            },
          ],
        } as GetPlansResponseBody,
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

describe('Testing the getPlans GET request', () => {
  it('should call the onSuccess callback when the status is ok or 200', async () => {
    await getPlans({
      onSuccess: data => {
        expect(data).toEqual({
          data: [
            {
              id: 0,
              attributes: {
                id: 0,
                price: 0,
                title: '',
                subTitle: '',
                type: 'annual',
              },
            },
          ],
        });
      },
    });
  });

  it('should call the onError callback when the status is not 200 or ok', async () => {
    try {
      await getPlans({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });

  it('should call the onError callback when the Promise rejected', async () => {
    try {
      await getPlans({
        onError: err => {
          expect(!!err).toBe(true);
        },
      });
    } catch (err) {
      expect(!!err).toBe(true);
    }
  });
});
