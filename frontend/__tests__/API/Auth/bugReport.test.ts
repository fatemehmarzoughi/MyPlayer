import {ReportBugRequestBody} from '../../../src/API/types';
import {reportBug} from '../../../src/API/Auth';

jest.mock('../../../src/API/API.ts', () => ({
  POST: jest
    .fn()
    .mockReturnValueOnce(
      Promise.resolve({
        data: {
          data: {
            id: 34,
            attributes: {description: 'description'},
          },
          meta: {},
        },
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

describe('testing the report bug send request', () => {
  const reqBody: ReportBugRequestBody = {
    data: {
      description: 'description',
      user: {
        connect: [{id: 495739}],
      },
    },
  };

  it('should run onSuccess callback when the status is ok or 200', async () => {
    const res = await reportBug({
      reqBody,
      onSuccess(data) {
        expect(data.data.attributes.description).toBe('description');
      },
    });

    expect(res.status).toBe(200);
    expect(res.data).toEqual({
      data: {
        id: 34,
        attributes: {description: 'description'},
      },
      meta: {},
    });
  });

  it('should run onError callback when the status is not ok', async () => {
    try {
      await reportBug({
        reqBody,
        onError(error) {
          expect(!!error).toBe(true);
        },
      });
    } catch (error) {
      expect(!!error).toBe(true);
    }
  });

  it('should run onError callback when thrown unknown error', async () => {
    try {
      await reportBug({
        reqBody,
        onError(error) {
          expect(!!error).toBe(true);
        },
      });
    } catch (error) {
      expect(!!error).toBe(true);
    }
  });
});
